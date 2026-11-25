import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type PaystackWebhookEvent = {
  event?: string;
  data?: {
    reference?: string;
    status?: string;
    amount?: number;
    currency?: string;
  };
};

function isValidPaystackSignature(
  rawBody: string,
  signature: string,
  secret: string
) {
  const expected = createHmac("sha512", secret).update(rawBody).digest();
  let received: Buffer;

  try {
    received = Buffer.from(signature, "hex");
  } catch {
    return false;
  }

  return (
    received.length === expected.length &&
    timingSafeEqual(received, expected)
  );
}

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!secret) {
    return NextResponse.json(
      { error: "Payment webhook is not configured." },
      { status: 503 }
    );
  }

  const signature = request.headers.get("x-paystack-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 401 });
  }

  const rawBody = await request.text();

  if (!isValidPaystackSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let event: PaystackWebhookEvent;
  try {
    event = JSON.parse(rawBody) as PaystackWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  // Acknowledge events this application does not need to process.
  if (event.event !== "charge.success") {
    return NextResponse.json({ received: true });
  }

  const reference = event.data?.reference;
  if (!reference || event.data?.status !== "success") {
    return NextResponse.json({ error: "Invalid successful-charge event." }, { status: 400 });
  }

  /*
   * Do not mark an order as PAID from the webhook payload alone.
   * Before enabling this handler, load the pending order by reference and
   * verify the transaction with Paystack's API. Compare the verified amount
   * and currency against the server-stored order total, then update the
   * order and payment reference in a database transaction (idempotently).
   *
   * The project currently has a Prisma schema but no confirmed database
   * client/connection configured, so return 503 rather than falsely
   * acknowledging a payment that has not been recorded.
   */
  return NextResponse.json(
    {
      error:
        "Payment received but order recording is not configured yet. Configure database persistence and Paystack transaction verification before enabling live payments.",
    },
    { status: 503 }
  );
}

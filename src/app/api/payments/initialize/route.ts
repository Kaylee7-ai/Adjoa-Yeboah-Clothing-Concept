import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  orderId: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
});

/**
 * Payment initialization is intentionally unavailable until checkout creates
 * a pending order and the server can retrieve its authoritative total.
 *
 * Never accept the amount from the browser: a customer could alter it.
 */
export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "A valid order reference and email address are required." },
      { status: 400 }
    );
  }

  // TODO: Load the pending order by orderId from the database, verify its
  // status and customer email, then use its server-calculated totalAmount
  // (already stored in pesewas) with initializePaystackPayment().
  return NextResponse.json(
    {
      error:
        "Payment initialization is not enabled yet. A verified pending order and database-backed checkout must be configured first.",
    },
    { status: 503 }
  );
}

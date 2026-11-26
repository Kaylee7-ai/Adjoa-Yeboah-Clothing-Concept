import "server-only";

type InitializePaystackPaymentInput = {
  email: string;
  /** Amount in pesewas (GHS × 100). */
  amount: number;
  orderId: string;
  callbackUrl: string;
};

type PaystackInitializeResponse = {
  status: boolean;
  message?: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

export async function initializePaystackPayment({
  email,
  amount,
  orderId,
  callbackUrl,
}: InitializePaystackPaymentInput) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Paystack is not configured: PAYSTACK_SECRET_KEY is missing.");
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("A valid customer email address is required.");
  }

  if (!Number.isSafeInteger(amount) || amount <= 0) {
    throw new Error("Payment amount must be a positive integer in pesewas.");
  }

  if (!orderId.trim()) {
    throw new Error("An order reference is required.");
  }

  let callback: URL;
  try {
    callback = new URL(callbackUrl);
  } catch {
    throw new Error("A valid payment callback URL is required.");
  }

  if (callback.protocol !== "https:" && callback.hostname !== "localhost") {
    throw new Error("The payment callback URL must use HTTPS.");
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount,
      currency: "GHS",
      reference: orderId,
      callback_url: callback.toString(),
      channels: ["card", "mobile_money"],
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as PaystackInitializeResponse;

  if (!response.ok || !data.status || !data.data?.authorization_url) {
    throw new Error(data.message || "Failed to initialize Paystack payment.");
  }

  return data.data;
}

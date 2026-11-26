import { NextResponse } from "next/server";
import { z } from "zod";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const schema = z.object({
  productName: z.string().min(1).max(160),
  notes: z.string().max(1000).optional()
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid enquiry" }, { status: 400 });
  const url = buildWhatsAppUrl(`Hello AYC, I would like to enquire about ${parsed.data.productName}. ${parsed.data.notes ?? ""} Please confirm current price, availability and next steps.`);
  if (!url) return NextResponse.json({ error: "Official WhatsApp number is not configured" }, { status: 503 });
  return NextResponse.json({ url });
}
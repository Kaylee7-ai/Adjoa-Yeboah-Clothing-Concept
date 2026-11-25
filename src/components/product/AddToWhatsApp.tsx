"use client";
import {buildWhatsAppUrl} from "@/lib/whatsapp";
export function AddToWhatsApp({productName}:{productName:string}){const url=buildWhatsAppUrl(`Hello AYC, I would like to enquire about: ${productName}. Please confirm availability, current price, sizes and fulfilment options.`);return url?<a className="btn" href={url} target="_blank" rel="noreferrer">Enquire on WhatsApp ↗</a>:<p className="text-xs text-[#77736b]">WhatsApp enquiries will be enabled once the brand confirms its official business number.</p>}

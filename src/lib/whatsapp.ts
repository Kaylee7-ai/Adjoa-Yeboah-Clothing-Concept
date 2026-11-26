export function buildWhatsAppUrl(message:string){
 const number=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
 if(!number || number.includes("X")) return null;
 return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

"use client";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/context/CartContext";

export function ProductCard({product}:{product:Product}){
 const {addItem}=useCart();
 const [size,setSize]=useState("");
 const [color,setColor]=useState(product.colors?.[0]??"As pictured");
 const sizes=product.fulfillment==="ready-to-wear"?product.sizes??[]:[];
 const colors=product.colors??["As pictured"];
 const image=product.images[0]??"/images/product-placeholder.jpg";
 return <article className="product-card">
  <Link href={`/shop/${product.slug}`} className="group block">
   <div className="image-frame"><img className="product-image" src={image} alt={`Editorial concept image for ${product.name}`} loading="lazy"/><span className="absolute bottom-3 left-3 bg-[#fffaf3]/95 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-[#59483b]">{product.fulfillment==="bespoke"?"Bespoke":"Ready to wear"}</span></div>
   <div className="flex items-start justify-between gap-3"><h3 className="transition-colors group-hover:text-[#9a675b]">{product.name}</h3>{product.isNew?<span className="mt-4 shrink-0 text-[9px] font-bold uppercase tracking-widest text-[#98675d]">New</span>:null}</div>
   <p className="product-meta">{product.category}</p><div className="price">{formatPrice(product.price)}</div>
  </Link>
  <div className="mt-3 grid grid-cols-2 gap-2">
   {sizes.length>0?<select aria-label={`Choose size for ${product.name}`} className="field min-w-0 py-2 text-xs" value={size} onChange={e=>setSize(e.target.value)}><option value="">Choose size</option>{sizes.map(s=><option key={s} value={s}>{s}</option>)}</select>:<select aria-label={`Choose finish for ${product.name}`} className="field min-w-0 py-2 text-xs" value={color} onChange={e=>setColor(e.target.value)}>{colors.map(c=><option key={c} value={c}>{c}</option>)}</select>}
   <button type="button" disabled={sizes.length>0&&!size} onClick={()=>addItem(product,1,size||undefined,undefined,color)} className="btn min-w-0 px-2 text-[9px] disabled:cursor-not-allowed disabled:opacity-50">Add to bag</button>
  </div>
  {sizes.length>0&&<select aria-label={`Choose colour for ${product.name}`} className="field mt-2 py-2 text-xs" value={color} onChange={e=>setColor(e.target.value)}>{colors.map(c=><option key={c} value={c}>{c}</option>)}</select>}
  <Link href={`/shop/${product.slug}`} className="card-link">Discover piece ↗</Link>
 </article>
}

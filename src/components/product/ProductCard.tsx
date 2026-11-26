"use client";
import Link from "next/link";
import {useState} from "react";
import type {Product} from "@/types/product";
import {formatPrice} from "@/lib/formatPrice";
import {useCart} from "@/context/CartContext";
import {useWishlist} from "@/context/WishlistContext";
import {products} from "@/data/products";
import ProductQuickView from "@/components/product/ProductQuickView";
const lookPairs:Record<string,string[]>={"ayc-001":["ayc-006","ayc-004"],"ayc-002":["ayc-005","ayc-003"],"ayc-003":["ayc-002","ayc-006"],"ayc-004":["ayc-001"],"ayc-005":["ayc-002"],"ayc-006":["ayc-003","ayc-001"]};
export function ProductCard({product}:{product:Product}){
 const {addItem}=useCart();const {toggle,isSaved}=useWishlist();const [size,setSize]=useState("");const [color,setColor]=useState(product.colors?.[0]??"As pictured");const [quickOpen,setQuickOpen]=useState(false);const [pairingToInspect,setPairingToInspect]=useState<Product|null>(null);
 const sizes=product.fulfillment==="ready-to-wear"?product.sizes??[]:[];const colors=product.colors??["As pictured"];const image=product.images[0]??"/images/product-placeholder.jpg";
 const pairings=(lookPairs[product.id]??[]).map(id=>products.find(p=>p.id===id)).filter((p):p is Product=>!!p);
 return <article className="product-card">
  <div className="image-frame">
   <Link href={`/shop/${product.slug}`} className="group block"><img className="product-image" src={image} alt={`Editorial concept image for ${product.name}`} loading="lazy"/><span className="absolute bottom-3 left-3 bg-[#fffaf3]/95 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-[#59483b]">{product.fulfillment==="bespoke"?"Bespoke":"Ready to wear"}</span>{product.isNew&&<span className="absolute left-3 top-3 bg-[#30251f] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-white">New arrival</span>}</Link>
   <button type="button" className={`save-button product-save ${isSaved(product.id)?"saved":""}`} onClick={()=>toggle(product)} aria-label={isSaved(product.id)?"Remove from saved pieces":`Save ${product.name}`} aria-pressed={isSaved(product.id)}>{isSaved(product.id)?"♥":"♡"}</button>
  </div>
  <Link href={`/shop/${product.slug}`} className="group block"><div className="flex items-start justify-between gap-3"><h3 className="transition-colors group-hover:text-[#9a675b]">{product.name}</h3>{product.isFeatured&&<span className="mt-4 shrink-0 text-[9px] font-bold uppercase tracking-widest text-[#98675d]">Selected</span>}</div><p className="product-meta">{product.category}</p><div className="price">{formatPrice(product.price)}</div></Link>
  <div className="product-options">
   {sizes.length > 0 && <label className="product-option-label">Size
    <select aria-label={`Choose size for ${product.name}`} className="field min-w-0 py-2 text-xs" value={size} onChange={e=>setSize(e.target.value)}>
     <option value="">Choose size</option>{sizes.map(s=><option key={s} value={s}>{s}</option>)}
    </select>
   </label>}
   <fieldset className="product-colour-options">
    <legend className="product-option-label">Colour / finish</legend>
    <div className="product-swatch-list">{colors.map((c,i)=><button key={c} type="button" aria-label={c} aria-pressed={color===c} title={c} onClick={()=>setColor(c)} className={`product-swatch ${color===c?"is-selected":""}`}><span className={`product-swatch-dot swatch-tone-${i%6}`}/><span>{c}</span></button>)}</div>
   </fieldset>
   <button type="button" disabled={sizes.length>0&&!size} onClick={()=>addItem(product,1,size||undefined,undefined,color)} className="btn product-add-button disabled:cursor-not-allowed disabled:opacity-50">Add to bag</button>
  </div>
  <button type="button" className="inspect-link" onClick={()=>setQuickOpen(true)}>View fabric, fit & care</button>
  {pairings.length>0&&<div className="look-pairing"><p className="eyebrow">THE EDITOR'S PAIRING</p><p className="serif mt-1 text-lg">Shop the complete look</p>{pairings.map(piece=><div key={piece.id} className="pairing-line"><span>{piece.name}<small>{formatPrice(piece.price)}</small></span><button type="button" onClick={()=>setPairingToInspect(piece)}>View & add</button></div>)}</div>}
  <Link href={`/shop/${product.slug}`} className="card-link">Discover piece ↗</Link>
  {quickOpen&&<ProductQuickView product={product} onClose={()=>setQuickOpen(false)}/>} {pairingToInspect&&<ProductQuickView product={pairingToInspect} onClose={()=>setPairingToInspect(null)}/>}
 </article>
}

"use client";
import {useEffect,useMemo,useState} from "react";
import type {Product} from "@/types/product";
import {formatPrice} from "@/lib/formatPrice";
import {useCart} from "@/context/CartContext";
import {useWishlist} from "@/context/WishlistContext";
export default function ProductQuickView({product,onClose}:{product:Product;onClose:()=>void}){
 const {addItem}=useCart();const {toggle,isSaved}=useWishlist();const [size,setSize]=useState("");const [color,setColor]=useState(product.colors?.[0]??"As pictured");const [view,setView]=useState(0);const [showFit,setShowFit]=useState(false);
 const sizes=product.fulfillment==="ready-to-wear"?product.sizes??[]:[];const images=useMemo(()=>product.images.length?product.images:[ "/images/product-placeholder.jpg"],[product.images]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==="Escape")onClose()};window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key)},[onClose]);
 return <div className="quickview-backdrop" role="dialog" aria-modal="true" aria-labelledby="quickview-title" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
  <section className="quickview-panel"><button className="quickview-close" onClick={onClose} aria-label="Close product details">×</button>
   <div className="quickview-image-wrap"><img key={images[view]} src={images[view]} alt={`${product.name} — view ${view+1}`}/><div className="quickview-views" aria-label="Product image views">{images.map((_,i)=><button key={i} onClick={()=>setView(i)} aria-pressed={view===i}>View {i+1}</button>)}</div></div>
   <div className="quickview-content"><p className="eyebrow">{product.category} · {product.fulfillment==="bespoke"?"BESPOKE":"READY TO WEAR"}</p><h2 id="quickview-title" className="serif mt-3 text-3xl">{product.name}</h2><p className="mt-3 font-semibold">{formatPrice(product.price)}</p><p className="mt-4 text-sm leading-7 text-[#746960]">{product.description}</p>
    <div className="story-block"><p className="field-label">Fabric story</p><p className="text-sm leading-6">Crafted around {product.fabrics.join(", ")}. Texture, weight and drape can vary by selected cloth; request a fabric confirmation before placing an order.</p><p className="field-label">Fit notes</p><p className="text-sm leading-6">{product.fulfillment==="bespoke"?"Made-to-measure concept. A fitting consultation is recommended.":"Ready-to-wear sizing is indicative; check the garment measurements before choosing."}</p><button className="text-[10px] font-bold uppercase tracking-widest underline" onClick={()=>setShowFit(v=>!v)} aria-expanded={showFit}>{showFit?"Hide":"Open"} size & fit helper</button>
     {showFit&&<div className="fit-helper"><p className="text-xs leading-5">For the best fit, compare your measurements with the brand's confirmed garment chart. This concept catalogue does not yet contain verified measurements.</p><label className="field-label" htmlFor="fit-size">Your usual size</label><select id="fit-size" className="field" value={size} onChange={e=>setSize(e.target.value)}><option value="">Select a size</option>{(sizes.length?sizes:["XS","S","M","L","XL","XXL"]).map(s=><option key={s}>{s}</option>)}</select><p className="mt-2 text-[10px] text-[#746960]">This is a preference aid, not a guaranteed size recommendation.</p></div>}
     <p className="field-label">Care story</p><p className="text-sm leading-6">Follow the final garment care label. For embellished, lace, Kente or structured pieces, ask the atelier for fabric-specific cleaning guidance before washing or pressing.</p>
    </div>
    <div className="mt-5"><p className="field-label">Colour / finish</p><div className="flex flex-wrap gap-2">{(product.colors??["As pictured"]).map(c=><button key={c} onClick={()=>setColor(c)} aria-pressed={color===c} className={`swatch-choice ${color===c?"selected":""}`}>{c}</button>)}</div><p className="mt-2 text-[10px] text-[#746960]">Colour options are illustrative until brand-approved product photography is supplied.</p></div>
    {sizes.length>0&&<div className="mt-4"><label className="field-label" htmlFor="quick-size">Select size</label><select id="quick-size" className="field" value={size} onChange={e=>setSize(e.target.value)}><option value="">Choose size</option>{sizes.map(s=><option key={s}>{s}</option>)}</select></div>}
    <div className="mt-6 flex gap-2"><button className="btn flex-1" disabled={sizes.length>0&&!size} onClick={()=>{addItem(product,1,size||undefined,undefined,color);onClose()}}>Add piece to bag</button><button className={`save-button ${isSaved(product.id)?"saved":""}`} onClick={()=>toggle(product)} aria-label={isSaved(product.id)?"Remove from saved pieces":"Save piece"} aria-pressed={isSaved(product.id)}>{isSaved(product.id)?"♥":"♡"}</button></div>
    <p className="mt-4 text-[10px] leading-5 text-[#746960]">Illustrative product story only. Confirm fabric composition, fit, care, price and availability with the brand.</p>
   </div>
  </section>
 </div>;
}

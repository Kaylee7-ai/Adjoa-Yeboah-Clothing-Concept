"use client";
import {useEffect,useMemo,useState} from "react";
import {createPortal} from "react-dom";
import type {Product} from "@/types/product";
import {formatPrice} from "@/lib/formatPrice";
import {useCart} from "@/context/CartContext";
import {useWishlist} from "@/context/WishlistContext";

export default function ProductQuickView({product,onClose}:{product:Product;onClose:()=>void}){
 const {addItem}=useCart();
 const {toggle,isSaved}=useWishlist();
 const [size,setSize]=useState("");
 const [color,setColor]=useState(product.colors?.[0]?.name??"As pictured");
 const [view,setView]=useState(0);
 const [showFit,setShowFit]=useState(false);
 const [mounted,setMounted]=useState(false);
 const sizes=product.fulfillment==="ready-to-wear"?product.sizes??[]:[];
 const images=useMemo(()=>product.images.length?product.images:["/images/product-placeholder.jpg"],[product.images]);

 useEffect(()=>{setMounted(true)},[]);
 useEffect(()=>{
  if(!mounted)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow="hidden";
  const key=(e:KeyboardEvent)=>{if(e.key==="Escape")onClose()};
  window.addEventListener("keydown",key);
  return()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",key)};
 },[mounted,onClose]);

 if(!mounted)return null;
 return createPortal(
  <div className="quickview-backdrop" role="dialog" aria-modal="true" aria-labelledby="quickview-title"
   onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
   <section className="quickview-panel" onClick={e=>e.stopPropagation()}>
    <button type="button" className="quickview-close" onClick={e=>{e.preventDefault();e.stopPropagation();onClose()}} aria-label="Close product details">×</button>
    <div className="quickview-image-wrap">
     <img key={images[view]} src={images[view]} alt={`${product.name} — view ${view+1}`}/>
     {images.length>1?<div className="quickview-views" aria-label="Product image views">{images.map((_,i)=><button type="button" key={i} onClick={()=>setView(i)} aria-pressed={view===i}>View {i+1}</button>)}</div>:<span className="quickview-view-note">One editorial reference image · additional garment angles require original photography</span>}
    </div>
    <div className="quickview-content">
     <p className="eyebrow">{product.category} · {product.fulfillment==="bespoke"?"BESPOKE":"READY TO WEAR"}</p>
     <h2 id="quickview-title" className="serif mt-3 text-3xl">{product.name}</h2>
     <p className="mt-3 font-semibold">{formatPrice(product.price)}</p>
     <p className="mt-4 text-sm leading-7">{product.description}</p>
     <div className="story-block">
      <p className="field-label">Fabric</p>
      <p className="text-sm leading-6">Listed fabric: {product.fabrics.join(", ")}. Exact composition and fabric availability must be confirmed by the atelier.</p>
      <p className="field-label">Fit</p>
      <p className="text-sm leading-6">{product.fulfillment==="bespoke"?"Made-to-measure concept. Arrange a fitting consultation for confirmed measurements.":"Ready-to-wear sizing is indicative. Check the confirmed garment measurements before choosing."}</p>
      <button type="button" className="text-[10px] font-bold uppercase tracking-widest underline" onClick={()=>setShowFit(v=>!v)} aria-expanded={showFit}>{showFit?"Hide":"Show"} size guidance</button>
      {showFit&&<div className="fit-helper"><p className="text-xs leading-5">Use the atelier's garment measurement chart when it is available. This concept catalogue does not contain verified measurements.</p><label className="field-label" htmlFor="fit-size">Usual size (optional)</label><select id="fit-size" className="field" value={size} onChange={e=>setSize(e.target.value)}><option value="">Select a size</option>{(sizes.length?sizes:["XS","S","M","L","XL","XXL"]).map(s=><option key={s} value={s}>{s}</option>)}</select></div>}
      <p className="field-label">Care</p>
      <p className="text-sm leading-6">Follow the garment care label. Ask for fabric-specific cleaning guidance for embellished, lace, Kente or structured pieces.</p>
     </div>
     <div className="mt-5"><p className="field-label">Colour / finish</p><div className="flex flex-wrap gap-2">{(product.colors?.map(c=>typeof c==="string"?c:c.name)??["As pictured"]).map(c=><button type="button" key={c} onClick={()=>setColor(c)} aria-pressed={color===c} className={`swatch-choice ${color===c?"selected":""}`}>{c}</button>)}</div><p className="mt-2 text-[10px]">Colour options are illustrative until brand-approved product photography is supplied.</p></div>
     {sizes.length>0&&<div className="mt-4"><label className="field-label" htmlFor="quick-size">Select size</label><select id="quick-size" className="field" value={size} onChange={e=>setSize(e.target.value)}><option value="">Choose size</option>{sizes.map(s=><option key={s} value={s}>{s}</option>)}</select></div>}
     <div className="mt-6 flex gap-2"><button type="button" className="btn flex-1" disabled={sizes.length>0&&!size} onClick={()=>{addItem(product,1,size||undefined,undefined,color);onClose()}}>Add piece to bag</button><button type="button" className={`save-button ${isSaved(product.id)?"saved":""}`} onClick={()=>toggle(product)} aria-label={isSaved(product.id)?"Remove from saved pieces":"Save piece"} aria-pressed={isSaved(product.id)}>{isSaved(product.id)?"♥":"♡"}</button></div>
     <p className="mt-4 text-[10px] leading-5">Concept preview only. Confirm fabric, measurements, care, price and availability with the atelier.</p>
    </div>
   </section>
  </div>,
  document.body
 );
}

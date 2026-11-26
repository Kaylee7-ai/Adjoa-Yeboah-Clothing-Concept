"use client";
import Link from "next/link";
import {useEffect} from "react";
import {useWishlist} from "@/context/WishlistContext";
import {formatPrice} from "@/lib/formatPrice";
export default function SavedDrawer(){
 const {saved,isOpen,closeSaved,remove}=useWishlist();
 useEffect(()=>{if(!isOpen)return;const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")closeSaved()};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[isOpen,closeSaved]);
 if(!isOpen)return null;
 return <div className="saved-backdrop" role="dialog" aria-modal="true" aria-labelledby="saved-title" onMouseDown={e=>{if(e.target===e.currentTarget)closeSaved()}}>
  <aside className="saved-drawer"><header className="saved-header"><div><p className="eyebrow">YOUR PERSONAL EDIT</p><h2 id="saved-title" className="serif text-2xl">Saved pieces <span className="text-base">({saved.length})</span></h2></div><button className="bag-close" onClick={closeSaved} aria-label="Close saved pieces">×</button></header>
  <div className="saved-body">{saved.length===0?<div className="py-16 text-center"><p className="serif text-2xl">Keep a piece in mind.</p><p className="mt-3 text-sm text-[#746960]">Tap the heart on a piece to save it here.</p><Link href="/shop" onClick={closeSaved} className="btn mt-7">Explore the collection</Link></div>:saved.map(product=><article key={product.id} className="saved-item"><Link href={`/shop/${product.slug}`} onClick={closeSaved}><img src={product.images[0]??"/images/product-placeholder.jpg"} alt={product.name}/></Link><div className="min-w-0 flex-1"><Link href={`/shop/${product.slug}`} onClick={closeSaved} className="serif text-lg leading-snug">{product.name}</Link><p className="mt-2 text-xs text-[#746960]">{formatPrice(product.price)}</p><div className="mt-4 flex flex-wrap gap-3"><Link href={`/shop/${product.slug}`} onClick={closeSaved} className="text-[10px] font-bold uppercase tracking-widest underline">Choose options</Link><button className="text-[10px] uppercase tracking-widest text-[#8b5e55] underline" onClick={()=>remove(product.id)}>Remove</button></div></div></article>)}</div>
 </aside></div>;
}

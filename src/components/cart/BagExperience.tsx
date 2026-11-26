"use client";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";

const petals = Array.from({length:24},(_,i)=>({id:i,angle:i*137.5,delay:(i%8)*35,size:9+(i%4)*3,kind:i%3}));
export default function BagExperience(){
 const {cart,totalItems,subtotal,recentAddition,dismissCelebration,isBagOpen,openBag,closeBag,removeItem,updateQuantity}=useCart();
 const [petalsOn,setPetalsOn]=useState(true);
 const [step,setStep]=useState<"bag"|"checkout"|"done">("bag");
 const [payment,setPayment]=useState("momo");
 useEffect(()=>{if(!recentAddition)return;setPetalsOn(true);const t=window.setTimeout(()=>setPetalsOn(false),2500);return()=>window.clearTimeout(t)},[recentAddition]);
 useEffect(()=>{if(isBagOpen)setStep("bag")},[isBagOpen]);
 useEffect(()=>{if(!recentAddition&&!isBagOpen)return;const f=(e:KeyboardEvent)=>{if(e.key==="Escape"){dismissCelebration();closeBag()}};window.addEventListener("keydown",f);return()=>window.removeEventListener("keydown",f)},[recentAddition,isBagOpen,dismissCelebration,closeBag]);
 function complete(e:FormEvent<HTMLFormElement>){e.preventDefault();setStep("done")}
 return <>
 {recentAddition&&<div className="floral-celebration" role="dialog" aria-modal="true" aria-labelledby="floral-title" onMouseDown={e=>{if(e.target===e.currentTarget)dismissCelebration()}}>
  {petalsOn&&<div className="floral-particles" aria-hidden="true">{petals.map(p=><span key={p.id} className={`floral-petal petal-kind-${p.kind}`} style={{"--angle":`${p.angle}deg`,"--delay":`${p.delay}ms`,"--petal-size":`${p.size}px`,"--x":`${Math.cos(p.angle*Math.PI/180)*135}px`,"--y":`${Math.sin(p.angle*Math.PI/180)*135}px`} as React.CSSProperties}>{p.kind===0?"✿":p.kind===1?"❀":"✧"}</span>)}</div>}
  <section className="floral-card"><button className="floral-close" onClick={dismissCelebration} aria-label="Close">×</button><div className="floral-ornament" aria-hidden="true">✿ <i/> ❀</div><p className="eyebrow">A LOVELY CHOICE</p><h2 id="floral-title" className="serif floral-heading">Congratulations!</h2><p className="floral-copy">You've added <strong>{recentAddition.product.name}</strong> to your bag.</p>
   <div className="floral-added-product"><img src={recentAddition.product.images[0]} alt=""/><div><p className="font-semibold">{recentAddition.product.name}</p><p>{recentAddition.size?`Size ${recentAddition.size} · `:""}{recentAddition.color??"As pictured"}</p><strong>{formatPrice(recentAddition.product.price)}</strong></div></div>
   <button className="btn w-full" onClick={()=>{dismissCelebration();openBag()}}>Continue to checkout</button><button className="floral-keep-shopping" onClick={dismissCelebration}>Keep shopping</button><p className="floral-note">Saved in this browser. No order has been placed.</p>
  </section>
 </div>}
 {isBagOpen&&<div className="bag-backdrop" role="dialog" aria-modal="true" aria-labelledby="bag-title" onMouseDown={e=>{if(e.target===e.currentTarget)closeBag()}}>
  <aside className="bag-drawer"><header className="bag-drawer-header"><div><p className="eyebrow">ADJOA YEBOAH CLOTHING</p><h2 id="bag-title" className="serif text-2xl">{step==="done"?"A little note":step==="checkout"?"Checkout preview":"Your shopping bag"}</h2></div><button className="bag-close" onClick={closeBag} aria-label="Close bag">×</button></header>
  {step==="done"?<div className="bag-confirmation"><div className="bag-confirmation-flower">✿</div><p className="eyebrow">DEMO COMPLETE</p><h3 className="serif mt-3 text-3xl">Thank you for exploring.</h3><p className="mt-4 text-sm leading-7 text-[#746960]">This was a demonstration only. No order was submitted, no payment processed and no personal details transmitted or saved.</p><button className="btn mt-8 w-full" onClick={closeBag}>Return to the collection</button></div>
  :step==="checkout"?<form className="bag-drawer-body" onSubmit={complete}><button type="button" className="bag-back-link" onClick={()=>setStep("bag")}>← Back to bag</button><div className="demo-warning"><strong>Demo checkout only.</strong> Use fictional details for testing. Do not enter real contact, address or payment information. Nothing is transmitted or saved.</div>
   <label className="field-label" htmlFor="demo-name">Name</label><input id="demo-name" className="field" autoComplete="off" placeholder="Alex Example" required/>
   <label className="field-label" htmlFor="demo-email">Email</label><input id="demo-email" className="field" type="email" autoComplete="off" placeholder="alex@example.test" required/>
   <label className="field-label" htmlFor="demo-address">Delivery address</label><textarea id="demo-address" className="field min-h-20 resize-y" autoComplete="off" placeholder="Fictional demo address" required/>
   <fieldset className="mt-7"><legend className="field-label">Payment preference · preview only</legend>{[["momo","Mobile Money","No number requested"],["delivery","Pay on Delivery","Illustrative option only"],["card","Card","Card processing is not connected"]].map(([v,l,d])=><label className="payment-choice" key={v}><input type="radio" name="demo-payment" value={v} checked={payment===v} onChange={()=>setPayment(v)}/><span><strong>{l}</strong><small>{d}</small></span></label>)}</fieldset>
   <div className="bag-total-row mt-7"><span>Estimated subtotal</span><strong>{formatPrice(subtotal)}</strong></div><button type="submit" className="btn mt-6 w-full">Complete demo checkout</button><p className="mt-3 text-center text-[10px] text-[#746960]">Displays a preview confirmation only.</p>
  </form>
  :<><div className="bag-drawer-body">{cart.items.length===0?<div className="py-16 text-center"><p className="serif text-2xl">Your bag is waiting.</p><Link href="/shop" onClick={closeBag} className="btn mt-7">Explore the collection</Link></div>:<div className="space-y-6">{cart.items.map(item=><article key={`${item.product.id}-${item.size??"standard"}-${item.color??"default"}`} className="flex gap-4 border-b border-[#e4dbcf] pb-6"><img src={item.product.images[0]} alt="" className="h-32 w-24 shrink-0 bg-[#eee6dc] object-cover"/><div className="flex min-w-0 flex-1 flex-col"><div className="flex items-start justify-between gap-2"><h3 className="serif text-lg leading-snug">{item.product.name}</h3><button onClick={()=>removeItem(item.product.id,item.size,item.color)} className="text-[10px] uppercase tracking-widest text-[#8b5e55] underline">Remove</button></div><p className="mt-1 text-xs text-[#746960]">{item.size?`Size ${item.size} · `:""}{item.color??"As pictured"}</p><div className="mt-auto flex items-center justify-between gap-3 pt-4"><div className="quantity-control"><button aria-label="Decrease quantity" onClick={()=>updateQuantity(item.product.id,item.quantity-1,item.size,item.color)}>−</button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={()=>updateQuantity(item.product.id,item.quantity+1,item.size,item.color)}>+</button></div><strong className="text-sm">{formatPrice(item.product.price*item.quantity)}</strong></div></div></article>)}</div>}</div>
  {cart.items.length>0&&<footer className="bag-drawer-footer"><div className="bag-total-row"><span>Subtotal · {totalItems} {totalItems===1?"item":"items"}</span><strong>{formatPrice(subtotal)}</strong></div><p className="mt-2 text-xs leading-5 text-[#746960]">Delivery and availability are unconfirmed. No real payments are accepted.</p><button className="btn mt-5 w-full" onClick={()=>setStep("checkout")}>Continue to checkout</button><button className="floral-keep-shopping mt-3 w-full" onClick={closeBag}>Keep shopping</button></footer>}</>}
  </aside>
 </div>}
 </>;
}

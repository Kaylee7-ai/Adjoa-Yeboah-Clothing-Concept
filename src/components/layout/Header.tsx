"use client";
import Link from "next/link";
import {useState} from "react";
import {useCart} from "@/context/CartContext";
import {useWishlist} from "@/context/WishlistContext";
export default function Header(){
 const [mobileOpen,setMobileOpen]=useState(false);const {totalItems,openBag}=useCart();const {count,openSaved}=useWishlist();const closeMenu=()=>setMobileOpen(false);
 const links=[{href:"/shop",label:"Shop"},{href:"/bridal",label:"Bridal"},{href:"/lookbook",label:"Lookbook"},{href:"/book-appointment",label:"Book a fitting"}];
 return <header className="site-header sticky top-0 z-50"><div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-7 md:h-[78px]">
  <Link href="/" onClick={closeMenu} className="serif text-[23px] font-semibold tracking-[.035em] text-[#f7f1e7] sm:text-[28px]">Adjoa Yeboah<span className="mt-1 block font-sans text-[9px] font-bold tracking-[.38em] text-[#d4ad70]">CLOTHING</span></Link>
  <nav aria-label="Main navigation" className="hidden items-center gap-8 text-[10px] font-semibold uppercase tracking-[.17em] md:flex">{links.map(l=><Link key={l.href} href={l.href}>{l.label}</Link>)}</nav>
  <div className="flex items-center gap-3 sm:gap-5"><button type="button" onClick={openSaved} className="relative text-[10px] font-semibold uppercase tracking-widest" aria-label={`Open saved pieces, ${count} saved`}>Saved <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#e8ddd1] px-1 text-[9px]">{count}</span></button>
   <button type="button" onClick={openBag} className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest" aria-label={`Open shopping bag, ${totalItems} items`}><svg aria-hidden="true" width="17" height="18" viewBox="0 0 20 22" fill="none"><path d="M3 7.5h14l1 12H2l1-12Z" stroke="currentColor" strokeWidth="1.3"/><path d="M7 8V5a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.3"/></svg>Bag <span className="inline-flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#8e6654] px-1 text-[9px] text-white">{totalItems}</span></button>
   <button type="button" onClick={()=>setMobileOpen(o=>!o)} className="rounded-sm border border-[#d7cabe] px-3 py-2 text-[9px] font-bold uppercase tracking-widest md:hidden" aria-expanded={mobileOpen} aria-controls="mobile-navigation">{mobileOpen?"Close":"Menu"}</button></div></div>
  {mobileOpen&&<nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-[#e4dbcf] bg-[#f8f5ef] px-6 py-5 shadow-lg md:hidden">{links.map(l=><Link key={l.href} href={l.href} onClick={closeMenu} className="block border-b border-[#e9e1d7] py-4 text-xs font-semibold uppercase tracking-widest">{l.label}</Link>)}<button onClick={()=>{openSaved();closeMenu()}} className="block py-4 text-xs font-semibold uppercase tracking-widest">Saved pieces ({count})</button></nav>}
 </header>
}

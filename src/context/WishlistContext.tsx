"use client";
import { createContext,useCallback,useContext,useEffect,useMemo,useState,type ReactNode } from "react";
import type { Product } from "@/types/product";
type WishlistValue={saved:Product[];count:number;toggle:(product:Product)=>void;isSaved:(id:string)=>boolean;isOpen:boolean;openSaved:()=>void;closeSaved:()=>void;remove:(id:string)=>void};
const WishlistContext=createContext<WishlistValue|undefined>(undefined);
const KEY="ayc-saved-pieces-v1";
export function WishlistProvider({children}:{children:ReactNode}){
 const [saved,setSaved]=useState<Product[]>([]);const [loaded,setLoaded]=useState(false);const [isOpen,setIsOpen]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem(KEY);if(raw){const parsed:unknown=JSON.parse(raw);if(Array.isArray(parsed))setSaved(parsed.filter((p):p is Product=>!!p&&typeof p.id==="string"&&typeof p.name==="string"));}}catch{setSaved([])}finally{setLoaded(true)}},[]);
 useEffect(()=>{if(loaded){try{localStorage.setItem(KEY,JSON.stringify(saved))}catch{/* Storage may be unavailable; current session still works. */}}},[saved,loaded]);
 const toggle=useCallback((product:Product)=>setSaved(prev=>prev.some(p=>p.id===product.id)?prev.filter(p=>p.id!==product.id):[...prev,product]),[]);
 const isSaved=useCallback((id:string)=>saved.some(p=>p.id===id),[saved]);
 const remove=useCallback((id:string)=>setSaved(prev=>prev.filter(p=>p.id!==id)),[]);
 const openSaved=useCallback(()=>setIsOpen(true),[]),closeSaved=useCallback(()=>setIsOpen(false),[]);
 const value=useMemo(()=>({saved,count:saved.length,toggle,isSaved,isOpen,openSaved,closeSaved,remove}),[saved,toggle,isSaved,isOpen,openSaved,closeSaved,remove]);
 return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
export function useWishlist(){const value=useContext(WishlistContext);if(!value)throw new Error("useWishlist must be used within WishlistProvider.");return value;}

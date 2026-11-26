"use client";
import { useEffect,useState } from "react";
import SplashScreen from "./SplashScreen";
import BagExperience from "@/components/cart/BagExperience";
import { CartProvider } from "@/context/CartContext";
export default function AppShell({children}:{children:React.ReactNode}){
 const [showSplash,setShowSplash]=useState(true);
 useEffect(()=>{const seen=sessionStorage.getItem("ayc-splash");if(seen){setShowSplash(false);return}const timer=window.setTimeout(()=>{sessionStorage.setItem("ayc-splash","true");setShowSplash(false)},2800);return()=>window.clearTimeout(timer)},[]);
 return <CartProvider>{showSplash&&<SplashScreen/>}<div className={showSplash?"opacity-0":"opacity-100 transition-opacity duration-700"}>{children}</div><BagExperience/></CartProvider>
}

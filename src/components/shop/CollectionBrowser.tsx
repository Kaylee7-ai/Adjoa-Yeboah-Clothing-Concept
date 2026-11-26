"use client";
import {useMemo,useState} from "react";
import {products} from "@/data/products";
import {ProductCard} from "@/components/product/ProductCard";
export default function CollectionBrowser(){
 const [category,setCategory]=useState("All pieces");const [query,setQuery]=useState("");
 const categories=useMemo(()=>["All pieces",...Array.from(new Set(products.map(p=>p.category)))],[ ]);
 const filtered=useMemo(()=>products.filter(p=>(category==="All pieces"||p.category===category)&&(`${p.name} ${p.description} ${p.tags?.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()))),[category,query]);
 return <><div className="collection-tools"><label className="sr-only" htmlFor="collection-search">Search pieces</label><input id="collection-search" className="field collection-search" type="search" placeholder="Search the collection…" value={query} onChange={e=>setQuery(e.target.value)}/><div className="collection-filters" role="group" aria-label="Filter collection by category">{categories.map(c=><button key={c} type="button" onClick={()=>setCategory(c)} aria-pressed={category===c} className={`collection-filter ${category===c?"active":""}`}>{c}</button>)}</div></div><p className="mb-5 text-xs text-[#746960]" aria-live="polite">Showing {filtered.length} {filtered.length===1?"piece":"pieces"}</p>{filtered.length?<div className="product-grid">{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="py-16 text-center"><p className="serif text-2xl">No pieces found.</p><button className="mt-4 text-xs underline" onClick={()=>{setCategory("All pieces");setQuery("")}}>Clear filters</button></div>}</>;
}

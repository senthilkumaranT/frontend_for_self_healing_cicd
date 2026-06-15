import React from 'react';
import { ArrowRight, Star, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function Home({ setActivePage, featuredCookies, onAddToBag }) {
  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden py-16 px-8 md:px-16 text-left shadow-2xl flex flex-col md:flex-row items-center gap-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="flex-1 space-y-6">
          <span className="px-2.5 py-0.5 text-[9px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full tracking-wider uppercase font-mono">
            New Summer Drops
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Artisanal Cookies <br/>
            <span className="bg-gradient-to-r from-amber-100 to-amber-400 bg-clip-text text-transparent">
              Crafted for Connoisseurs
            </span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm leading-6 max-w-lg">
            Indulge in couture baking. Every recipe features premium raw materials, handmade doughs, and double-stuffed cores. Delivered warm to your doorstep.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActivePage('menu')}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-950/20 transition-all cursor-pointer flex items-center gap-2 hover:scale-103"
            >
              Explore Flavors
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('about')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-750 text-slate-300 font-bold text-xs rounded-xl border border-slate-750 transition-all cursor-pointer"
            >
              Our Story
            </button>
          </div>
        </div>

        {/* Visual Element (Warm Glowing Plate representation) */}
        <div className="w-full md:w-80 h-64 rounded-2xl border border-amber-500/10 bg-amber-950/5 flex flex-col items-center justify-center p-6 text-center shadow-inner relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent blur-sm"></div>
          <span className="text-5xl">🍪</span>
          <h3 className="text-base font-extrabold text-slate-200 mt-4">Belgian Chocolate Chunk</h3>
          <p className="text-[10px] text-slate-500 font-mono mt-1">Our #1 Best Seller • 1.2M Sold</p>
          <div className="mt-4 flex gap-1 justify-center text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="p-6 rounded-2xl border border-slate-850 bg-slate-900/40 flex items-start gap-4">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/25 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-200">Fresh Small Batches</h4>
            <p className="text-xs text-slate-400/90 leading-5 mt-1.5">We bake in micro-batches every single morning to guarantee crispy edges and a melt-in-your-mouth center.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-slate-850 bg-slate-900/40 flex items-start gap-4">
          <div className="p-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/25 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-200">100% Organic Ingredients</h4>
            <p className="text-xs text-slate-400/90 leading-5 mt-1.5">Grass-fed organic butter, Belgian single-origin chocolate chunks, and unrefined cane sugar. No preservatives.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-slate-850 bg-slate-900/40 flex items-start gap-4">
          <div className="p-2.5 bg-red-500/10 text-red-400 border border-red-500/25 rounded-xl">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-200">Crafted with Passion</h4>
            <p className="text-xs text-slate-400/90 leading-5 mt-1.5">Each cookie is hand-rolled, measured to exactly 6 ounces, and stuffed with love by our master bakers.</p>
          </div>
        </div>
      </section>

      {/* Featured Cookies / Chef's Selection */}
      <section className="space-y-6 text-left">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-black">Chef's Signature Selection</h2>
            <p className="text-slate-500 text-xs font-mono mt-1">Highly curated customer favorites, recommended for newcomers.</p>
          </div>
          <button 
            onClick={() => setActivePage('menu')}
            className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            See Full Menu <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCookies.map((cookie) => (
            <div 
              key={cookie.id} 
              className={`p-6 rounded-2xl border bg-slate-900/50 flex flex-col justify-between shadow-xl ${cookie.color}`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-amber-300 font-bold">★ {cookie.rating}</span>
                  <span className="text-slate-500">{cookie.category}</span>
                </div>
                <h3 className="text-base font-bold text-slate-200 mt-4">{cookie.name}</h3>
                <p className="text-slate-450 text-[11px] leading-5 mt-2">{cookie.description}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-800/40 pt-4">
                <span className="text-sm font-bold text-slate-350 font-mono">${cookie.price.toFixed(2)}</span>
                <button
                  onClick={() => onAddToBag(cookie)}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-[10px] rounded-lg cursor-pointer transition-all"
                >
                  Add to bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}

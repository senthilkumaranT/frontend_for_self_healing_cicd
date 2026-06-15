import React from 'react';
import { ShoppingBag, Sparkles, Menu } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, cartItemsCount }) {
  return (
    <nav className="h-16 border-b border-slate-800/80 bg-slate-950/80 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2.5 text-left cursor-pointer group"
        >
          <div className="p-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 group-hover:scale-105 transition-all">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-wide text-slate-100 uppercase block">
              Cookie Couture
            </span>
            <span className="text-[9px] text-slate-500 font-mono -mt-0.5 block">Paris • New York</span>
          </div>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <button 
            onClick={() => setActivePage('home')}
            className={`hover:text-amber-400 transition-colors cursor-pointer ${activePage === 'home' ? 'text-amber-400' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActivePage('menu')}
            className={`hover:text-amber-400 transition-colors cursor-pointer ${activePage === 'menu' ? 'text-amber-400' : ''}`}
          >
            Our Cookies
          </button>
          <button 
            onClick={() => setActivePage('about')}
            className={`hover:text-amber-400 transition-colors cursor-pointer ${activePage === 'about' ? 'text-amber-400' : ''}`}
          >
            Our Story
          </button>
        </div>

        {/* Action Button: Shopping Bag */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActivePage('cart')}
            className={`relative p-2.5 rounded-xl border border-slate-850 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900 text-slate-350 hover:text-slate-200 transition-all cursor-pointer ${
              activePage === 'cart' ? 'border-amber-500/40 bg-slate-900 text-amber-400' : ''
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[9px] font-extrabold w-4 h-4 flex items-center justify-center rounded-full border border-slate-950 font-mono">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}

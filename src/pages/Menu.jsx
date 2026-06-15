import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Classic', 'Stuffed', 'Nutty', 'Decadent', 'Artisanal'];

export default function Menu({ cookies, onAddToBag }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCookies = cookies.filter(cookie => {
    const matchesCategory = selectedCategory === 'All' || cookie.category === selectedCategory;
    const matchesSearch = cookie.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cookie.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12 text-left">
      
      {/* Intro Header */}
      <section className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-black">Our Artisan Collection</h2>
        <p className="text-slate-400 text-xs md:text-sm max-w-xl font-mono leading-5">
          Browse our collection of luxury cookies. Filter by category or search for ingredients.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-850 bg-slate-900/40">
        
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all border ${
                selectedCategory === category
                  ? 'bg-amber-600 border-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search cookies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500/50 outline-none rounded-xl pl-9 pr-3 py-2 text-xs text-slate-300 font-mono"
          />
        </div>

      </section>

      {/* Menu Grid */}
      {filteredCookies.length === 0 ? (
        <div className="py-20 text-center text-slate-500 border border-dashed border-slate-850 rounded-2xl bg-slate-900/10">
          <p className="text-sm font-mono">No cookies matching your filter criteria.</p>
          <p className="text-xs text-slate-650 mt-1">Try resetting the category filter or clearing the search box.</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCookies.map((cookie) => (
            <div 
              key={cookie.id} 
              className={`p-6 rounded-2xl border bg-slate-900/30 flex flex-col justify-between shadow-xl transition-all duration-300 hover:scale-101 hover:border-amber-500/20 ${cookie.color}`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="bg-slate-950 border border-slate-800 text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase">
                    {cookie.category}
                  </span>
                  <span className="text-amber-300 font-semibold">★ {cookie.rating}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-100 mt-4">{cookie.name}</h3>
                <p className="text-slate-400 text-xs mt-2 leading-5">{cookie.description}</p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-slate-800/40 pt-4">
                <div>
                  <span className="text-[9px] text-slate-550 block font-mono">Price</span>
                  <span className="text-base font-bold text-slate-200 font-mono">${cookie.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => onAddToBag(cookie)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer hover:scale-103"
                >
                  Add to bag
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

    </div>
  );
}

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-slate-900 border-t border-slate-800/80 text-xs text-slate-400 py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        
        {/* Brand Column */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-200 text-sm tracking-wide uppercase">Cookie Couture</h4>
          <p className="leading-5 text-slate-400/85">
            Baking sweet moments with the world's finest organic flour, Belgian chocolates, and Madagascar vanilla.
          </p>
          <div className="flex gap-3 pt-2 text-slate-500">
            <a href="#" className="hover:text-amber-400 transition-colors">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>


        {/* Links Column */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-200 text-sm tracking-wide uppercase">Navigation</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setActivePage('home')} className="hover:text-slate-200 transition-colors cursor-pointer">Home</button></li>
            <li><button onClick={() => setActivePage('menu')} className="hover:text-slate-200 transition-colors cursor-pointer">Our Cookies</button></li>
            <li><button onClick={() => setActivePage('about')} className="hover:text-slate-200 transition-colors cursor-pointer">Our Story</button></li>
            <li><button onClick={() => setActivePage('cart')} className="hover:text-slate-200 transition-colors cursor-pointer">Shopping Bag</button></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-200 text-sm tracking-wide uppercase">Bakehouse Info</h4>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500/80 shrink-0" />
              <span>452 Broadway, SoHo, NY 10013</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500/80 shrink-0" />
              <span>+1 (212) 555-8321</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500/80 shrink-0" />
              <span>chef@cookiecouture.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-200 text-sm tracking-wide uppercase">Newsletter</h4>
          <p className="leading-5 text-slate-400/85">Receive announcements of limited-run flavors and secret recipes.</p>
          <form className="flex gap-2 pt-1" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email address"
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500/50 outline-none rounded-lg px-3 py-1.5 font-mono text-[11px] text-slate-200"
            />
            <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg cursor-pointer transition-colors">
              Join
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-850 mt-10 pt-6 text-center text-[10px] text-slate-600 font-mono">
        © 2026 Cookie Couture. All rights reserved. Made for Cookie Lovers.
      </div>
    </footer>
  );
}

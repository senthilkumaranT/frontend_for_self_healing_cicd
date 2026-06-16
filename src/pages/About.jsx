import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Sparkles } from 'lucide-react';

export default function About() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => 
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-12 text-left">
      
      {/* Our Story section */}
      <section className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 items-center">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="flex-1 space-y-4">
          <span className="px-2.5 py-0.5 text-[9px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full tracking-wider uppercase font-mono">
            Since 2018
          </span>
          <h2 className="text-2xl md:text-3xl font-black">Our Baking Philosophy</h2>
          <p className="text-slate-350 text-xs md:text-sm leading-6">
            At Cookie Couture, we believe baking is an art form. We don't make standard cookies. We construct multi-layered flavor profiles.
          </p>
          <p className="text-slate-400 text-xs leading-6">
            We spend months sourcing the finest single-origin organic cacao beans from Belgian chocolate cooperatives. Our vanilla beans are hand-pollinated and imported from Madagascar. Our dough undergoes a 36-hour cold fermentation process, allowing the rich buttery notes to mature before baking.
          </p>
        </div>

        {/* Visual Callout */}
        <div className="w-full md:w-72 p-6 rounded-2xl border border-amber-500/10 bg-amber-950/10 text-xs space-y-3 font-mono">
          <h4 className="font-extrabold text-slate-200 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Couture Ingredients
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>• Belgian Dark Chocolate (70% Cacao)</li>
            <li>• Grade-A Madagascar Vanilla Beans</li>
            <li>• Sicilian Sea Salt Flakes (Maldon)</li>
            <li>• Grass-fed Normandy Cultured Butter</li>
          </ul>
        </div>
      </section>

      {/* Grid: Locations & Contact Form */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Bakehouse Locations */}
        <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-slate-200 text-xs font-semibold uppercase tracking-wider">Our Bakehouses</h3>
          <div className="space-y-4 text-xs font-mono text-slate-400">
            <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl">
              <h4 className="font-bold text-slate-200">SoHo Manhattan</h4>
              <p className="mt-1">452 Broadway, New York, NY 10013</p>
              <p className="text-[10px] text-slate-500 mt-1">Open Daily: 8:00 AM - 10:00 PM</p>
            </div>

            <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl">
              <h4 className="font-bold text-slate-200">Le Marais Paris</h4>
              <p className="mt-1">12 Rue des Francs Bourgeois, 75003 Paris</p>
              <p className="text-[10px] text-slate-500 mt-1">Open Tuesday - Sunday: 9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-slate-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            Write to Our Bakers
          </h3>

          {submitted ? (
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 text-xs text-center font-mono">
              Message submitted successfully. Our baking staff will reply soon!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/50 outline-none rounded-lg p-2.5 text-slate-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/50 outline-none rounded-lg p-2.5 text-slate-350 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500">Your Message</label>
                <textarea
                  required
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your catering needs or cookie feedback..."
                  className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/50 outline-none rounded-lg p-2.5 text-slate-350 text-xs"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Send Message
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </section>

    </div>
  );
}

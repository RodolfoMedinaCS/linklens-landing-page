import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Command, ArrowRight, Check, Zap } from 'lucide-react';
import { clsx } from 'clsx';

export const ExtensionDownload = () => {
  return (
    <section className="w-full py-20 px-6 relative overflow-hidden bg-white border-y border-slate-50">
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          
          {/* Left: High Energy CTA */}
          <div className="text-center md:text-left flex-1 relative">
            {/* Glow behind the button area */}
            <div className="absolute -left-10 top-10 w-40 h-40 bg-blue-400/20 rounded-full blur-[50px] animate-pulse"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
              Your new <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400">browsing superpower.</span>
            </h2>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-md">
              Capture, tag, and organize content without ever leaving your current tab.
            </p>
            
            <div className="flex flex-col items-center md:items-start gap-4">
               <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-300 via-sky-300 to-violet-300 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                  <button className="relative flex items-center gap-4 pl-6 pr-8 py-4 bg-gray-900 text-white rounded-2xl shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden ring-1 ring-white/10">
                      <img src="/chrome-color.svg" alt="" className="w-7 h-7 object-contain" />
                      <div className="text-left border-l border-white/20 pl-4">
                        <div className="text-[9px] font-black uppercase tracking-wider text-blue-400">Chrome Store</div>
                        <div className="text-base font-bold">Add to Chrome</div>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  {/* Floating "Saved" Badge Decoration */}
                  <motion.div 
                    animate={{ y: [0, -5, 0], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute -right-12 -top-6 bg-white text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg border border-emerald-100 flex items-center gap-1.5 rotate-[12deg]"
                  >
                     <Check className="w-3 h-3" /> Saved!
                  </motion.div>
               </div>
               
               <div className="flex items-center gap-4 mt-2 pl-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-amber-400" />
                      Free Forever
                  </span>
               </div>
            </div>
          </div>

          {/* Right: Roadmap (Subtle but Professional) */}
          <div className="flex flex-col items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100/50">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Coming Soon</p>
             <div className="flex gap-6">
                <div className="flex flex-col items-center gap-2 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0 cursor-not-allowed group">
                   <div className="w-14 h-14 rounded-2xl border border-slate-200 bg-white flex items-center justify-center shadow-sm group-hover:border-blue-200 group-hover:shadow-md transition-all">
                      <Command className="w-6 h-6 text-blue-500" />
                   </div>
                   <span className="text-[10px] font-bold text-gray-500 uppercase">Safari</span>
                </div>
                <div className="flex flex-col items-center gap-2 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0 cursor-not-allowed group">
                   <div className="w-14 h-14 rounded-2xl border border-slate-200 bg-white flex items-center justify-center shadow-sm group-hover:border-orange-200 group-hover:shadow-md transition-all">
                      <Globe className="w-6 h-6 text-orange-500" />
                   </div>
                   <span className="text-[10px] font-bold text-gray-500 uppercase">Firefox</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
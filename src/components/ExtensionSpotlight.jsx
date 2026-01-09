import React from 'react';
import { motion } from 'framer-motion';
import { Check, Image as ImageIcon, Bookmark, X, Plus } from 'lucide-react';
import { clsx } from 'clsx';

// SmartSearchIcon (from LinkLens App) - Keep for other uses if needed, but logo replaces header icon
const SmartSearchIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    className={className}
  >
    <path 
      fill="currentColor" 
      d="m9.96 9.137l.886-3.099c.332-1.16 1.976-1.16 2.308 0l.885 3.099a1.2 1.2 0 0 0 .824.824l3.099.885c1.16.332 1.16 1.976 0 2.308l-3.099.885a1.2 1.2 0 0 0-.824.824l-.885 3.099c-.332 1.16-1.976 1.16-2.308 0l-.885-3.099a1.2 1.2 0 0 0-.824-.824l-3.099-.885c-1.16-.332-1.16-1.976 0-2.308l3.099-.885a1.2 1.2 0 0 0 .824-.824m8.143 7.37c.289-.843 1.504-.844 1.792 0l.026.087l.296 1.188l1.188.297c.96.24.96 1.602 0 1.842l-1.188.297l-.296 1.188c-.24.959-1.603.959-1.843 0l-.297-1.188l-1.188-.297c-.96-.24-.96-1.603 0-1.842l1.188-.297l.297-1.188zm.896 2.29a1 1 0 0 1-.203.203a1 1 0 0 1 .203.203a1 1 0 0 1 .203-.203a1 1 0 0 1-.203-.204M4.104 2.506c.298-.871 1.585-.842 1.818.087l.296 1.188l1.188.297c.96.24.96 1.602 0 1.842l-1.188.297l-.296 1.188c-.24.959-1.603.959-1.843 0l-.297-1.188l-1.188-.297c-.96-.24-.96-1.603 0-1.842l1.188-.297l.297-1.188zM5 4.797a1 1 0 0 1-.203.202A1 1 0 0 1 5 5.203a1 1 0 0 1 .203-.204A1 1 0 0 1 5 4.796"
    />
  </svg>
);

// The "LinkLens Prism" gradient - 5 Color Mesh
const PRISM_GRADIENT = "linear-gradient(120deg, #A7F3D0 0%, #BAE6FD 30%, #DDD6FE 60%, #FDE68A 100%)";

const MockExtensionUI = () => {
  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: [-8, 8, -8] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="w-[360px] sm:w-[420px] bg-white rounded-2xl shadow-[0_30px_100px_-10px_rgba(0,0,0,0.1),0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-200 font-sans relative mx-auto transform transition-transform duration-500 will-change-transform"
    >
      <div className="rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center gap-0.5">
          <div className="w-8 h-8 flex items-center justify-center">
             <img src="/logo-prism.png" alt="LinkLens Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-base font-semibold tracking-tight text-gray-900 -ml-1">LinkLens</span>
        </div>
        <div className="flex gap-1.5">
           <div className="w-2 h-2 rounded-full bg-gray-200 hover:bg-red-400 transition-colors"></div>
           <div className="w-2 h-2 rounded-full bg-gray-200 hover:bg-amber-400 transition-colors"></div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* 1. Hero Card: Preview */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden group hover:border-indigo-100 transition-colors">
          <div className="p-4 flex gap-4">
             {/* Thumbnail */}
             <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                   <ImageIcon className="w-8 h-8" />
                </div>
                {/* Simulated Image */}
                <img 
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" 
                    alt="React Preview" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                />
             </div>

             <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                <h2 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                  10 Modern React Patterns You Should Know in 2026
                </h2>
                
                <div className="flex items-center justify-between mt-1">
                   <div className="flex items-center gap-1.5 text-xs text-gray-500">
                     <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                     </div>
                     <span className="truncate max-w-[140px]">medium.com</span>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="h-px bg-gray-100 mx-4" />
          
          <div className="bg-gray-50/50 p-3 px-4">
             <input 
                type="text" 
                placeholder="Add a note..." 
                className="w-full bg-transparent text-sm border-none focus:ring-0 p-0 text-gray-600 placeholder:text-gray-400 focus:outline-none"
             />
          </div>
        </div>

        {/* 2. Collections (The Magic) */}
        <div className="space-y-3">
           <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-0.5 flex justify-between items-center">
             <span>Suggested Collection</span>
             <motion.div 
               animate={{ rotate: [0, 15, -15, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             >
                <SmartSearchIcon className="w-3.5 h-3.5 text-amber-400" />
             </motion.div>
           </label>
           
           <div className="flex flex-wrap gap-2.5">
              {/* AI Suggestion 1 - Selected */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-slate-800 ring-2 ring-offset-1 ring-indigo-500 shadow-sm"
                style={{ background: PRISM_GRADIENT }}
              >
                 <SmartSearchIcon className="w-3.5 h-3.5 opacity-60" />
                 <span>Development / React</span>
              </motion.button>

               {/* AI Suggestion 2 */}
               <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                 <span>Frontend Trends</span>
              </motion.button>
           </div>
        </div>

        {/* 3. Tags (More Magic) */}
        <div className="space-y-3 pb-4">
           <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-0.5">
             AI Tags
           </label>
           
           <div className="flex flex-wrap gap-2">
              {[
                { label: "JavaScript", ai: true, delay: 0.5 },
                { label: "Web Dev", ai: true, delay: 0.6 },
                { label: "Tutorial", ai: true, delay: 0.7 },
                { label: "Best Practices", ai: false, delay: 0.8 }
              ].map((tag, i) => (
                <motion.div
                  key={tag.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: tag.delay }}
                  className={clsx(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
                    tag.ai 
                      ? "text-slate-800 shadow-sm hover:brightness-95" 
                      : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-150"
                  )}
                  style={tag.ai ? { background: PRISM_GRADIENT } : {}}
                >
                   {tag.ai && <SmartSearchIcon className="w-3 h-3 opacity-60" />}
                   {tag.label}
                   <X className="w-3 h-3 ml-1 opacity-40 hover:opacity-100" />
                </motion.div>
              ))}
              
              <button className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
                 <Plus className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="absolute bottom-5 right-5">
         <motion.button
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            animate={{ 
               boxShadow: ["0 10px 15px -3px rgba(79, 70, 229, 0.2)", "0 10px 25px -3px rgba(79, 70, 229, 0.5)", "0 10px 15px -3px rgba(79, 70, 229, 0.2)"] 
            }}
            transition={{ 
               scale: { type: "spring", stiffness: 260, damping: 20, delay: 0.8 },
               boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full font-bold text-xs shadow-lg hover:bg-gray-800 hover:scale-105 transition-all"
         >
            <Check className="w-4 h-4" />
            Saved
         </motion.button>
      </div>
      </div>
    </motion.div>
  );
};

export const ExtensionSpotlight = () => {
  return (
    <div className="relative py-10">
        {/* Glow behind the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald-200/30 via-indigo-200/30 to-amber-200/30 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="relative z-10">
            <MockExtensionUI />
            
            {/* Floating Context Label 1 (Left) */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="absolute -left-12 md:-left-28 bottom-32 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl border border-white/50 flex items-center gap-2 rotate-[-6deg]"
            >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold text-gray-800">AI Auto-Tagging</span>
            </motion.div>

            {/* Floating Context Label 2 (Right) */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
                className="absolute -right-8 md:-right-24 top-24 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl border border-white/50 flex items-center gap-2 rotate-[6deg]"
            >
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-xs font-bold text-gray-800">Smart Sorting</span>
            </motion.div>
        </div>
    </div>
  );
};

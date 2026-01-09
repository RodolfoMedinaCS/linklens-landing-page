import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Palette, Hash, Image as ImageIcon } from 'lucide-react';

export const CreatorVisual = () => {
  return (
    <div className="w-full h-full min-h-[350px] relative overflow-hidden flex flex-col items-center justify-center p-6 bg-amber-50/30">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>

      {/* Main Container - Moodboard UI */}
      <div className="w-full max-w-[480px] grid grid-cols-2 gap-4 relative z-10 scale-105">
         
         {/* Card 1: Video */}
         <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3 p-3 bg-white rounded-2xl shadow-xl border border-amber-100 group hover:border-amber-300 transition-all"
         >
            <div className="w-full aspect-video bg-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors"></div>
               <Youtube className="w-10 h-10 text-white drop-shadow-lg" />
               <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">12:04</div>
            </div>
            <div className="px-1">
               <div className="h-2.5 w-full bg-gray-200 rounded-full mb-3"></div>
               <div className="flex flex-wrap gap-1.5">
                  <div className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-[9px] font-bold uppercase tracking-tight">#Editing</div>
                  <div className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-[9px] font-bold uppercase tracking-tight">#Story</div>
               </div>
            </div>
         </motion.div>

         {/* Card 2: Color Palette */}
         <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-3 p-3 bg-white rounded-2xl shadow-xl border border-amber-100 row-span-2 group hover:border-rose-200 transition-all"
         >
            <div className="w-full h-full min-h-[180px] bg-gray-100 rounded-xl flex flex-col overflow-hidden shadow-inner">
               <div className="flex-1 bg-[#FF6B6B] hover:flex-[1.5] transition-all"></div>
               <div className="flex-1 bg-[#4ECDC4] hover:flex-[1.5] transition-all"></div>
               <div className="flex-1 bg-[#FFE66D] hover:flex-[1.5] transition-all"></div>
               <div className="flex-1 bg-[#1A535C] hover:flex-[1.5] transition-all"></div>
            </div>
            <div className="px-1">
               <div className="h-2.5 w-3/4 bg-gray-200 rounded-full mb-3"></div>
               <div className="flex flex-wrap gap-1.5">
                  <div className="px-2 py-1 bg-rose-100 text-rose-700 rounded-lg text-[9px] font-bold uppercase tracking-tight">#Inspo</div>
                  <div className="px-2 py-1 bg-rose-100 text-rose-700 rounded-lg text-[9px] font-bold uppercase tracking-tight">#Colors</div>
               </div>
            </div>
         </motion.div>

         {/* Card 3: Image/Asset */}
         <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-3 p-3 bg-white rounded-2xl shadow-xl border border-amber-100 group hover:border-indigo-200 transition-all"
         >
            <div className="w-full aspect-square bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-300 group-hover:text-indigo-500 transition-colors">
               <ImageIcon className="w-10 h-10" />
            </div>
            <div className="px-1">
               <div className="h-2.5 w-2/3 bg-gray-200 rounded-full mb-3"></div>
               <div className="flex flex-wrap gap-1.5">
                  <div className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-[9px] font-bold uppercase tracking-tight">#Assets</div>
               </div>
            </div>
         </motion.div>

      </div>

      {/* Floating Action / Context */}
      <motion.div 
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1.1, opacity: 1 }}
         transition={{ delay: 0.5, type: "spring" }}
         className="absolute bottom-8 right-8 bg-amber-500 text-white px-4 py-2 rounded-full shadow-2xl shadow-amber-500/40 flex items-center gap-2.5 z-20"
      >
         <Hash className="w-4 h-4" />
         <span className="text-sm font-black tracking-tight uppercase">Moodboard</span>
      </motion.div>
    </div>
  );
};
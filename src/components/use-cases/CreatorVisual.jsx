import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Palette, Hash, Image as ImageIcon } from 'lucide-react';

export const CreatorVisual = () => {
  return (
    <div className="w-full h-full min-h-[350px] relative overflow-hidden flex flex-col items-center justify-center p-6 bg-amber-50/30">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>

      {/* Main Container - Moodboard UI */}
      <div className="w-full max-w-[380px] grid grid-cols-2 gap-3 relative z-10">
         
         {/* Card 1: Video */}
         <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2 p-2 bg-white rounded-xl shadow-lg border border-amber-100"
         >
            <div className="w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
               <Youtube className="w-8 h-8 text-white drop-shadow-md" />
               <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[8px] px-1 rounded">12:04</div>
            </div>
            <div className="px-1">
               <div className="h-2 w-full bg-gray-200 rounded mb-1.5"></div>
               <div className="flex flex-wrap gap-1">
                  <div className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-[8px] font-bold">#Editing</div>
                  <div className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-[8px] font-bold">#Story</div>
               </div>
            </div>
         </motion.div>

         {/* Card 2: Color Palette */}
         <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-2 p-2 bg-white rounded-xl shadow-lg border border-amber-100 row-span-2"
         >
            <div className="w-full h-full min-h-[140px] bg-gray-100 rounded-lg flex flex-col overflow-hidden">
               <div className="flex-1 bg-[#FF6B6B]"></div>
               <div className="flex-1 bg-[#4ECDC4]"></div>
               <div className="flex-1 bg-[#FFE66D]"></div>
               <div className="flex-1 bg-[#1A535C]"></div>
            </div>
            <div className="px-1">
               <div className="h-2 w-3/4 bg-gray-200 rounded mb-1.5"></div>
               <div className="flex flex-wrap gap-1">
                  <div className="px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded text-[8px] font-bold">#Inspo</div>
                  <div className="px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded text-[8px] font-bold">#Colors</div>
               </div>
            </div>
         </motion.div>

         {/* Card 3: Image/Asset */}
         <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-2 p-2 bg-white rounded-xl shadow-lg border border-amber-100"
         >
            <div className="w-full aspect-square bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-300">
               <ImageIcon className="w-8 h-8" />
            </div>
            <div className="px-1">
               <div className="h-2 w-2/3 bg-gray-200 rounded mb-1.5"></div>
               <div className="flex flex-wrap gap-1">
                  <div className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[8px] font-bold">#Assets</div>
               </div>
            </div>
         </motion.div>

      </div>

      {/* Floating Action / Context */}
      <motion.div 
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ delay: 0.5, type: "spring" }}
         className="absolute bottom-6 right-6 bg-amber-500 text-white px-3 py-1.5 rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-2 z-20"
      >
         <Hash className="w-3 h-3" />
         <span className="text-xs font-bold">Moodboard View</span>
      </motion.div>
    </div>
  );
};

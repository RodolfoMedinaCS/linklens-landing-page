import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Sparkles } from 'lucide-react';

export const ResearcherVisual = () => {
  return (
    <div className="w-full h-full min-h-[350px] relative overflow-hidden flex items-center justify-center p-2 sm:p-4 bg-violet-50/30">
      
      {/* Mobile Simplified View */}
      <div className="sm:hidden flex flex-col items-center justify-center gap-4 text-center">
         <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-violet-200 flex items-center justify-center text-violet-600">
            <Search className="w-10 h-10" />
         </div>
         <p className="text-sm font-medium text-violet-700/60 max-w-[200px]">Find connections instantly</p>
      </div>

      {/* Desktop Complex View */}
      <div className="hidden sm:flex flex-col w-full h-full items-center justify-center relative z-10">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="relative w-full max-w-[500px] h-[320px] scale-[0.70] sm:scale-100">
         
         {/* Center Node (Source) */}
         <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
         >
            <div className="bg-white rounded-xl shadow-xl border-2 border-violet-200 p-4 w-48 text-center relative group">
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-3 py-0.5 rounded-full text-[10px] font-bold border border-violet-500 whitespace-nowrap shadow-sm">
                  Source Paper
               </div>
               <div className="w-10 h-10 mx-auto bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 mb-2 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
               </div>
               <h3 className="text-xs font-bold text-gray-900 leading-tight mb-1">The Alignment Problem</h3>
               <p className="text-[10px] text-gray-500">Brian Christian, 2020</p>
            </div>
         </motion.div>

         {/* Connection Lines (SVG) */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 500 320">
            {/* Top Right Line */}
            <motion.path 
               d="M 250 160 L 400 60" 
               fill="none" 
               stroke="#DDD6FE" 
               strokeWidth="2" 
               strokeDasharray="4 4"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 1, delay: 0.5 }}
            />
            {/* Bottom Left Line */}
            <motion.path 
               d="M 250 160 L 100 260" 
               fill="none" 
               stroke="#DDD6FE" 
               strokeWidth="2" 
               strokeDasharray="4 4"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 1, delay: 0.7 }}
            />
            {/* Bottom Right Line */}
            <motion.path 
               d="M 250 160 L 400 260" 
               fill="none" 
               stroke="#DDD6FE" 
               strokeWidth="2" 
               strokeDasharray="4 4"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 1, delay: 0.9 }}
            />
         </svg>

         {/* Similarity Node 1 */}
         <motion.div 
            className="absolute top-[10px] right-[10px] z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
         >
            <div className="bg-white rounded-lg shadow-lg border border-violet-100 p-3 w-40 flex items-start gap-2">
               <div className="bg-violet-50 p-1.5 rounded text-violet-600 shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
               </div>
               <div>
                  <div className="text-[9px] font-bold text-violet-600 mb-0.5 uppercase tracking-wide">98% Similar</div>
                  <div className="text-[10px] font-medium text-gray-800 leading-tight">Human Compatible</div>
               </div>
            </div>
         </motion.div>

         {/* Similarity Node 2 */}
         <motion.div 
            className="absolute bottom-[10px] left-[10px] z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
         >
            <div className="bg-white rounded-lg shadow-lg border border-violet-100 p-3 w-40 flex items-start gap-2">
               <div className="bg-violet-50 p-1.5 rounded text-violet-600 shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
               </div>
               <div>
                  <div className="text-[9px] font-bold text-violet-600 mb-0.5 uppercase tracking-wide">95% Similar</div>
                  <div className="text-[10px] font-medium text-gray-800 leading-tight">Superintelligence</div>
               </div>
            </div>
         </motion.div>

         {/* Similarity Node 3 */}
         <motion.div 
            className="absolute bottom-[10px] right-[10px] z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 }}
         >
            <div className="bg-white rounded-lg shadow-lg border border-violet-100 p-3 w-40 flex items-start gap-2">
               <div className="bg-violet-50 p-1.5 rounded text-violet-600 shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
               </div>
               <div>
                  <div className="text-[9px] font-bold text-violet-600 mb-0.5 uppercase tracking-wide">92% Similar</div>
                  <div className="text-[10px] font-medium text-gray-800 leading-tight">Life 3.0</div>
               </div>
            </div>
         </motion.div>

      </div>
      </div>
    </div>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

export const DiscoveryVisual = () => {
  return (
    <div className="w-full max-w-lg mx-auto bg-[#0F172A] rounded-2xl border border-emerald-500/20 shadow-2xl shadow-emerald-900/20 overflow-hidden font-sans relative p-6 flex flex-col items-center justify-center min-h-[340px]">
       {/* Decorative Glow */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-slate-900/0 to-slate-900/0"></div>

       {/* Central Node (Source) */}
       <motion.div 
         initial={{ scale: 0.8, opacity: 0 }}
         whileInView={{ scale: 1, opacity: 1 }}
         viewport={{ once: true }}
         className="relative z-10 bg-slate-800 border border-emerald-500/30 p-4 rounded-xl shadow-lg w-full max-w-[280px] text-center mb-12"
       >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
             <Wand2 className="w-3 h-3" /> Source
          </div>
          <h3 className="text-sm font-semibold text-slate-200 mb-1">The Psychology of Color</h3>
          <p className="text-xs text-slate-500 line-clamp-1">Understanding how color impacts user behavior.</p>
       </motion.div>

       {/* Connecting Lines (Spaghetti Wires) */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120px] pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full overflow-visible">
             {/* Left Connection */}
             {/* Base faint line */}
             <path 
               d="M 256 20 C 256 60, 100 20, 80 100" 
               fill="none" 
               stroke="#10B981" 
               strokeWidth="1.5" 
               strokeOpacity="0.1" 
               strokeDasharray="4 4" 
             />
             {/* Animated Pulse Packet */}
             <motion.path 
               d="M 256 20 C 256 60, 100 20, 80 100" 
               fill="none" 
               stroke="#34D399" 
               strokeWidth="2" 
               strokeDasharray="10 100" // Create a "packet"
               strokeLinecap="round"
               initial={{ strokeDashoffset: 110, opacity: 0 }}
               animate={{ strokeDashoffset: -110, opacity: [0, 1, 1, 0] }}
               transition={{ 
                 duration: 2, 
                 repeat: Infinity, 
                 ease: "easeInOut",
                 repeatDelay: 0.5 
               }}
             />
             <circle cx="80" cy="100" r="3" fill="#10B981" fillOpacity="0.5" />

             {/* Right Connection */}
             {/* Base faint line */}
             <path 
               d="M 256 20 C 256 60, 412 20, 432 100" 
               fill="none" 
               stroke="#10B981" 
               strokeWidth="1.5" 
               strokeOpacity="0.1" 
               strokeDasharray="4 4" 
             />
             {/* Animated Pulse Packet */}
             <motion.path 
               d="M 256 20 C 256 60, 412 20, 432 100" 
               fill="none" 
               stroke="#34D399" 
               strokeWidth="2" 
               strokeDasharray="10 100" // Create a "packet"
               strokeLinecap="round"
               initial={{ strokeDashoffset: 110, opacity: 0 }}
               animate={{ strokeDashoffset: -110, opacity: [0, 1, 1, 0] }}
               transition={{ 
                 duration: 2.2, 
                 repeat: Infinity, 
                 ease: "easeInOut", 
                 delay: 1, // Offset start time
                 repeatDelay: 0.5 
               }}
             />
             <circle cx="432" cy="100" r="3" fill="#10B981" fillOpacity="0.5" />
          </svg>
       </div>

       {/* Connected Nodes */}
       <div className="flex justify-between w-full relative z-10 gap-4">
          
          {/* Node 1 */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex-1 bg-slate-800/50 border border-slate-700 p-3 rounded-lg backdrop-blur-sm"
          >
             <div className="flex items-center gap-2 mb-1">
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                ></motion.div>
                <span className="text-[10px] text-emerald-400 font-mono">92% Match</span>
             </div>
             <p className="text-xs font-medium text-slate-300 leading-tight">UI Design Principles 2024</p>
          </motion.div>

          {/* Node 2 */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex-1 bg-slate-800/50 border border-slate-700 p-3 rounded-lg backdrop-blur-sm"
          >
             <div className="flex items-center gap-2 mb-1">
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                ></motion.div>
                <span className="text-[10px] text-emerald-400 font-mono">88% Match</span>
             </div>
             <p className="text-xs font-medium text-slate-300 leading-tight">Color Theory Basics</p>
          </motion.div>

       </div>
       
       <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-8 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
       >
          <Wand2 className="w-3 h-3" /> Explore Graph
       </motion.button>
    </div>
  );
};
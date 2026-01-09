import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Share2, FileText, Youtube, Check, Copy } from 'lucide-react';

export const EducatorVisual = () => {
  return (
    <div className="w-full h-full min-h-[350px] relative overflow-hidden flex flex-col items-center justify-center p-6 bg-sky-50/30">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Main Container - The Dashboard UI */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[450px] bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden relative z-10 scale-105"
      >
        {/* Collection Header */}
        <div className="p-6 border-b border-sky-50 bg-sky-50/20">
           <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest">Public Collection</span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-bold uppercase">Live</span>
              </div>
           </div>
           <h3 className="text-lg font-bold text-gray-900 leading-tight">Psychology 101: Human Behavior & Cognition</h3>
           <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Public Link</span>
           </div>
        </div>

        {/* Resources Grid */}
        <div className="p-6 grid grid-cols-2 gap-4 bg-white">
           <div className="p-3 rounded-2xl border border-gray-100 bg-gray-50 flex flex-col gap-3 group hover:border-sky-200 transition-colors">
              <div className="w-full aspect-video bg-gray-800 rounded-xl flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                 <Youtube className="w-8 h-8" />
              </div>
              <div className="space-y-2 px-1">
                 <div className="h-2.5 w-full bg-gray-300 rounded-full"></div>
                 <div className="h-2 w-1/2 bg-gray-200 rounded-full"></div>
              </div>
           </div>
           <div className="p-3 rounded-2xl border border-gray-100 bg-gray-50 flex flex-col gap-3 group hover:border-sky-200 transition-colors">
              <div className="w-full aspect-video bg-sky-100 rounded-xl flex items-center justify-center text-sky-400 group-hover:text-sky-600 transition-colors">
                 <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-2 px-1">
                 <div className="h-2.5 w-full bg-gray-300 rounded-full"></div>
                 <div className="h-2 w-2/3 bg-gray-200 rounded-full"></div>
              </div>
           </div>
        </div>

        {/* The Share Action Overlay */}
        <div className="p-6 pt-0">
           <div className="p-4 rounded-2xl bg-sky-600 text-white shadow-xl shadow-sky-200 flex items-center justify-between group cursor-pointer hover:bg-sky-700 transition-all">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-white/20 rounded-xl">
                    <Share2 className="w-5 h-5" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs opacity-80 font-medium">Share with Class</span>
                    <span className="text-sm font-bold tracking-tight">linklens.ai/s/psych101</span>
                 </div>
              </div>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                 <Copy className="w-5 h-5" />
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
};
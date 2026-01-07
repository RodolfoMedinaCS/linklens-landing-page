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
        className="w-full max-w-[360px] bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden relative z-10"
      >
        {/* Collection Header */}
        <div className="p-4 border-b border-sky-50 bg-sky-50/20">
           <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">Public Collection</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[9px] font-bold uppercase">Live</span>
              </div>
           </div>
           <h3 className="text-sm font-bold text-gray-900">Psychology 101: Human Behavior</h3>
           <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 142 Students</span>
              <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Public Link</span>
           </div>
        </div>

        {/* Resources Grid */}
        <div className="p-4 grid grid-cols-2 gap-3 bg-white">
           <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 flex flex-col gap-2">
              <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                 <Youtube className="w-6 h-6" />
              </div>
              <div className="h-2 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-1.5 w-1/2 bg-gray-200 rounded"></div>
           </div>
           <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 flex flex-col gap-2">
              <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                 <FileText className="w-6 h-6" />
              </div>
              <div className="h-2 w-2/3 bg-gray-300 rounded"></div>
              <div className="h-1.5 w-1/3 bg-gray-200 rounded"></div>
           </div>
        </div>

        {/* The Share Action Overlay */}
        <div className="p-4 pt-0">
           <div className="p-3 rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="p-1.5 bg-white/20 rounded-lg">
                    <Share2 className="w-4 h-4" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] opacity-80 font-medium">Share with Class</span>
                    <span className="text-[11px] font-bold">linklens.ai/s/psych101</span>
                 </div>
              </div>
              <button className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                 <Copy className="w-4 h-4" />
              </button>
           </div>
        </div>
      </motion.div>

      {/* Floating Status Card */}
      <motion.div 
         initial={{ x: 20, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ delay: 0.4 }}
         className="absolute top-12 right-4 bg-white p-3 rounded-xl shadow-xl border border-sky-100 z-20 flex items-center gap-3 w-40"
      >
         <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
            <Users className="w-4 h-4" />
         </div>
         <div className="flex-1">
            <div className="text-[10px] font-bold text-gray-900">New View</div>
            <div className="text-[9px] text-gray-500 italic">Student #142 joined</div>
         </div>
      </motion.div>
    </div>
  );
};

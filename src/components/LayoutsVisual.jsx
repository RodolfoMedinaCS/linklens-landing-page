import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List, Clock, Image as ImageIcon } from 'lucide-react';
import { clsx } from 'clsx';

// Shared Mini Card Component
const MiniCard = ({ type = 'standard', height = 'h-14', colorTheme = 'emerald' }) => {
  const themes = {
    emerald: { bg: 'bg-emerald-50', bar: 'bg-emerald-100', icon: 'text-emerald-300' },
    amber: { bg: 'bg-amber-50', bar: 'bg-amber-100', icon: 'text-amber-300' },
    violet: { bg: 'bg-violet-50', bar: 'bg-violet-100', icon: 'text-violet-300' },
    sky: { bg: 'bg-sky-50', bar: 'bg-sky-100', icon: 'text-sky-300' }
  };
  const t = themes[colorTheme] || themes.emerald;

  return (
    <div className={clsx("bg-white rounded-xl border border-slate-200 shadow-sm p-2.5 flex flex-col gap-2 overflow-hidden hover:border-slate-300 transition-colors", height)}>
      {type === 'image' ? (
         <div className={clsx("w-full h-full rounded-lg flex items-center justify-center", t.bg, t.icon)}>
            <ImageIcon className="w-5 h-5" />
         </div>
      ) : type === 'video' ? (
         <div className="w-full h-2/3 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
         </div>
      ) : (
         <>
            <div className="flex gap-2">
               <div className={clsx("w-6 h-6 rounded-lg shrink-0", t.bg)}></div>
               <div className={clsx("w-full h-2 rounded", t.bar)}></div>
            </div>
            <div className="w-3/4 h-2 bg-slate-100 rounded"></div>
         </>
      )}
    </div>
  );
};

// 1. Grid Layout Visual (Emerald)
const GridLayout = () => (
  <div className="w-full h-full bg-emerald-50/30 p-4 grid grid-cols-2 gap-3 content-start">
     <MiniCard colorTheme="emerald" />
     <MiniCard colorTheme="emerald" />
     <MiniCard colorTheme="emerald" type="image" />
     <MiniCard colorTheme="emerald" />
  </div>
);

// 2. Moodboard Layout Visual (Amber)
const MoodboardLayout = () => (
  <div className="w-full h-full bg-amber-50/30 p-4 flex gap-3 overflow-hidden">
     <div className="flex-1 flex flex-col gap-3">
        <MiniCard height="h-20" type="image" colorTheme="amber" />
        <MiniCard height="h-12" colorTheme="amber" />
     </div>
     <div className="flex-1 flex flex-col gap-3 pt-6">
        <MiniCard height="h-14" colorTheme="amber" />
        <MiniCard height="h-20" type="image" colorTheme="amber" />
     </div>
  </div>
);

// 3. Timeline Layout Visual (Violet)
const TimelineLayout = () => (
  <div className="w-full h-full bg-violet-50/30 p-4 relative overflow-hidden">
     {/* Vertical Line */}
     <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-violet-200 -translate-x-1/2"></div>
     
     {/* Item Left */}
     <div className="relative mb-8 pr-[55%]">
        <div className="absolute right-[-5px] top-4 w-3 h-3 bg-white border-2 border-violet-400 rounded-full z-10 shadow-sm"></div>
        <div className="text-[9px] text-violet-400 font-bold text-right mb-1 pr-3 uppercase tracking-wider">Today</div>
        <MiniCard height="h-12" colorTheme="violet" />
     </div>

     {/* Item Right */}
     <div className="relative pl-[55%]">
        <div className="absolute left-[-5px] top-4 w-3 h-3 bg-white border-2 border-violet-400 rounded-full z-10 shadow-sm"></div>
        <div className="text-[9px] text-violet-400 font-bold text-left mb-1 pl-3 uppercase tracking-wider">Yesterday</div>
        <MiniCard height="h-12" colorTheme="violet" />
     </div>
  </div>
);

// 4. List Layout Visual (Sky)
const ListLayout = () => (
  <div className="w-full h-full bg-sky-50/30 p-4 flex flex-col gap-2.5">
     {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-full h-10 bg-white rounded-lg border border-slate-200 shadow-sm flex items-center px-3 gap-3 hover:border-sky-200 hover:shadow-md transition-all">
           <div className="w-5 h-5 rounded bg-sky-50 shrink-0"></div>
           <div className="flex-1 h-2 bg-slate-100 rounded"></div>
           <div className="w-10 h-2 bg-slate-50 rounded shrink-0"></div>
        </div>
     ))}
  </div>
);

export const LayoutsVisual = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
       {[
          { title: "Grid", icon: LayoutGrid, visual: GridLayout, desc: "Standard card view", color: "text-emerald-600", bg: "bg-emerald-50", border: "group-hover:border-emerald-200" },
          { title: "Moodboard", icon: ImageIcon, visual: MoodboardLayout, desc: "Masonry for visuals", color: "text-amber-600", bg: "bg-amber-50", border: "group-hover:border-amber-200" },
          { title: "Timeline", icon: Clock, visual: TimelineLayout, desc: "Chronological history", color: "text-violet-600", bg: "bg-violet-50", border: "group-hover:border-violet-200" },
          { title: "List", icon: List, visual: ListLayout, desc: "Compact data density", color: "text-sky-600", bg: "bg-sky-50", border: "group-hover:border-sky-200" }
       ].map((layout) => (
          <motion.div 
             key={layout.title}
             whileHover={{ y: -6 }}
             className={clsx(
                "bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden group cursor-pointer transition-all md:hover:shadow-xl",
                `md:${layout.border}`
             )}
          >
             {/* Visual Container - Taller and more vibrant */}
             <div className="h-48 border-b border-slate-100 relative overflow-hidden">
                <layout.visual />
             </div>
             
             {/* Footer */}
             <div className="p-5">
                <div className="flex items-center gap-2.5 mb-1.5">
                   <div className={clsx("p-1.5 rounded-lg", layout.bg, layout.color)}>
                      <layout.icon className="w-4 h-4" />
                   </div>
                   <h3 className="font-bold text-gray-900 text-base">{layout.title}</h3>
                </div>
                <p className="text-xs font-medium text-gray-500 leading-relaxed pl-1">{layout.desc}</p>
             </div>
          </motion.div>
       ))}
    </div>
  );
};
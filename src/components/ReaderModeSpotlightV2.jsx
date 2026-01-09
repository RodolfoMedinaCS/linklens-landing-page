import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Quote, Highlighter, Check, Copy, X, MessageSquare, GripVertical, Trash2, MoveHorizontal } from 'lucide-react';
import { clsx } from 'clsx';

const FEATURES = [
  {
    id: 'distraction',
    icon: Zap,
    title: 'Distraction Free',
    description: 'We strip away ads, popups, and clutter. Just you and the text.',
    color: 'violet'
  },
  {
    id: 'citation',
    icon: Quote,
    title: 'Instant Citations',
    description: 'Generate APA, MLA, Chicago, or Harvard citations in one click.',
    color: 'emerald'
  },
  {
    id: 'highlights',
    icon: Highlighter,
    title: 'Highlights & Notes',
    description: 'Highlight key passages and add notes. They\'re saved forever.',
    color: 'amber'
  }
];

// --- 1. Distraction Free Visual (Before/After Slider) ---
const DistractionFreeVisual = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = React.useRef(null);

  const handleStart = (e) => {
    setIsDragging(true);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleMove = React.useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent text selection
      handleMove(e.clientX);
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div 
      className={clsx(
        "relative w-full h-full bg-white rounded-xl overflow-hidden border border-gray-200 select-none group touch-none",
        isDragging ? "cursor-grabbing" : "cursor-col-resize"
      )}
      ref={containerRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      {/* 1. Background Layer: Clean Reader (Visible on Right) */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/reader-clean.png" 
          alt="LinkLens Reader View" 
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* 2. Foreground Layer: Cluttered Ads (Visible on Left) */}
      <div 
        className="absolute inset-0 bg-white"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
         <img 
            src="/reader-cluttered.png" 
            alt="Original Webpage with Clutter" 
            className="w-full h-full object-cover object-top"
         />
      </div>

      {/* 3. The Physical Divider & Handle (Floating on Top) */}
      <div 
        className="absolute inset-y-0 z-30"
        style={{ left: `${sliderPosition}%` }}
      >
         {/* The Black Line */}
         <div className="absolute inset-y-0 -ml-[1px] w-[2px] bg-black"></div>

         {/* The Handle */}
         <div className={clsx(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-black rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center justify-center text-white transition-transform",
            isDragging ? "scale-110" : "group-hover:scale-105"
         )}>
            <div className="flex items-center gap-1">
               <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
               <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- 2. Citation Visual ---
const CitationVisual = () => {
  const [style, setStyle] = useState('APA');
  const styles = ['APA', 'MLA', 'Chicago', 'Harvard'];
  
  const getCitation = (s) => {
    switch(s) {
      case 'APA': return "Anderson, S. (2024). The Psychology of Color in UI Design. Design Weekly.";
      case 'MLA': return "Anderson, Sarah. \"The Psychology of Color in UI Design.\" Design Weekly, 2024.";
      case 'Chicago': return "Anderson, Sarah. 2024. \"The Psychology of Color in UI Design.\" Design Weekly.";
      case 'Harvard': return "Anderson, S. (2024) 'The Psychology of Color in UI Design', Design Weekly.";
      default: return "";
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-xl overflow-hidden border border-gray-200 relative flex items-center justify-center bg-dots-pattern">
       {/* Background Article (Blurred) */}
       <div className="absolute inset-0 p-8 opacity-20 bg-[#FBFBFB] blur-sm select-none pointer-events-none">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">The Psychology of Color</h1>
          <div className="space-y-4">
             <div className="h-4 bg-gray-300 rounded w-full"></div>
             <div className="h-4 bg-gray-300 rounded w-full"></div>
             <div className="h-4 bg-gray-300 rounded w-5/6"></div>
             <div className="h-4 bg-gray-300 rounded w-full mt-8"></div>
             <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          </div>
       </div>

       {/* Popover */}
       <motion.div 
         initial={{ scale: 0.9, opacity: 0, y: 20 }}
         animate={{ scale: 1, opacity: 1, y: 0 }}
         className="w-[380px] bg-white rounded-xl shadow-2xl border border-gray-200 z-10 overflow-hidden"
       >
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
             <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                <Quote className="w-4 h-4 fill-current" />
                Citation Generator
             </div>
             <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
          
          <div className="p-5">
             {/* Tabs */}
             <div className="flex gap-1 p-1 bg-gray-100 rounded-lg mb-6">
                {styles.map(s => (
                   <button
                     key={s}
                     onClick={() => setStyle(s)}
                     className={clsx(
                       "flex-1 py-1.5 text-xs font-medium rounded-md transition-all",
                       style === s ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                     )}
                   >
                     {s}
                   </button>
                ))}
             </div>

             {/* Result */}
             <div className="relative group">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm font-serif text-gray-800 leading-relaxed min-h-[80px] break-words">
                   {getCitation(style)}
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-1.5 bg-white rounded-md border border-gray-200 shadow-sm hover:bg-gray-50">
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                   </button>
                </div>
             </div>

             <button className="w-full mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-indigo-500/20">
                <Check className="w-4 h-4" />
                Copy to Clipboard
             </button>
          </div>
       </motion.div>
    </div>
  );
};

// --- 3. Highlights Visual (Production Accurate) ---
const HighlightsVisual = () => {
  const [showToolbar, setShowToolbar] = useState(false);
  const [highlightColor, setHighlightColor] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    const sequence = async () => {
      // 1. Initial State
      if(isCancelled) return;
      setHighlightColor(null);
      setShowToolbar(false);
      setShowSidebar(false);
      setHighlights([]);
      await new Promise(r => setTimeout(r, 1000));

      // 2. Select Text
      if(isCancelled) return;
      setShowToolbar(true); 
      await new Promise(r => setTimeout(r, 1500));

      // 3. Apply Highlight
      if(isCancelled) return;
      setHighlightColor('yellow');
      setShowToolbar(false);
      
      // 4. Show Sidebar & Add Highlight Card
      await new Promise(r => setTimeout(r, 600));
      if(isCancelled) return;
      setShowSidebar(true);
      
      await new Promise(r => setTimeout(r, 400));
      setHighlights([{
        id: 1,
        text: "A recent survey by Forbes indicated that many Americans still trust humans over AI by a large percentage.",
        color: 'yellow',
        note: "Useful stat for the introduction - human trust gap."
      }]);

      // 5. Hold
      await new Promise(r => setTimeout(r, 5000));
      
      // 6. Loop
      if(!isCancelled) sequence();
    };
    sequence();
    return () => { isCancelled = true; };
  }, []);

  const colorMap = {
    yellow: 'bg-yellow-400',
    pink: 'bg-rose-400',
    blue: 'bg-blue-400',
    green: 'bg-emerald-400',
    purple: 'bg-violet-400',
    all: 'bg-zinc-200'
  };

  return (
    <div className="w-full h-full bg-white rounded-xl overflow-hidden border border-gray-200 relative bg-[#FBFBFB] flex flex-col font-sans min-h-0">
       {/* Fake Browser/Reader Header to sell the 'Mode' */}
       <div className="h-12 border-b border-gray-200 bg-white flex items-center px-4 justify-between shrink-0">
          <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-gray-200"></div>
             <div className="w-3 h-3 rounded-full bg-gray-200"></div>
          </div>
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Reader View</div>
          <div className="w-4"></div> 
       </div>

       <div className="flex-1 overflow-y-auto bg-white p-8 md:p-10">
          <div className="max-w-2xl mx-auto prose prose-slate select-none">
            <span className="block text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wide">Technology</span>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 leading-tight">AI—The good, the bad, and the scary</h1>
            
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
                <span className="font-medium text-gray-900">Virginia Tech Engineering</span>
                <span>•</span>
                <span>4 min read</span>
            </div>

            <p className="mb-6 text-gray-700 leading-relaxed">
               There is no denying that Artificial Intelligence has changed our lives. However, some might argue if it’s for the better.
            </p>

            <p className="mb-6 text-gray-700 leading-relaxed">
               <span className="relative inline">
                  <span className={clsx(
                    "transition-colors duration-500 rounded px-0.5 box-decoration-clone leading-relaxed py-0.5",
                    highlightColor === 'yellow' ? "bg-[#fef08a]" : 
                    showToolbar ? "bg-blue-100" : "" 
                  )}>
                    A recent survey by Forbes indicated that many Americans still trust humans over AI by a large percentage.
                  </span>
                  
                  {/* Production-Accurate Floating Toolbar */}
                  <AnimatePresence>
                    {showToolbar && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: -16, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute left-1/2 -top-12 -translate-x-1/2 bg-zinc-900 text-white p-1.5 rounded-full shadow-2xl flex items-center gap-1.5 z-50 whitespace-nowrap border border-white/10"
                      >
                         {/* Colors */}
                         <div className="flex items-center gap-1 px-1">
                            {['yellow', 'pink', 'blue', 'green', 'purple'].map((c) => (
                               <div 
                                 key={c}
                                 className={clsx(
                                     "w-6 h-6 rounded-full transition-transform", 
                                     c === 'yellow' ? "bg-yellow-300 scale-110 ring-2 ring-yellow-400/50" : 
                                     c === 'pink' ? "bg-rose-300" :
                                     c === 'blue' ? "bg-blue-300" :
                                     c === 'green' ? "bg-emerald-300" :
                                     "bg-purple-300"
                                 )}
                               ></div>
                            ))}
                         </div>

                         <div className="w-px h-4 bg-white/20 mx-0.5" />

                         {/* Actions */}
                         <div className="flex items-center gap-0.5 pr-1">
                             <div className="p-1.5 rounded-full hover:bg-white/10 text-white/70">
                                 <MessageSquare className="w-4 h-4" />
                             </div>
                         </div>

                         {/* Tail Arrow */}
                         <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-zinc-900"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </span>
               {" "}Those surveyed shared that they think people would do a better job of administering medicine and choosing gifts.
            </p>

            <p className="mb-6 text-gray-700 leading-relaxed">
               The faculty in the College of Engineering have their own opinions based on their expertise and related research. We wanted to hear from some of the most well-versed in the space.
            </p>
          </div>
       </div>
       
       {/* Production-Accurate Sidebar */}
       <AnimatePresence>
          {showSidebar && (
             <motion.div 
               initial={{ x: "100%" }}
               animate={{ x: 0 }}
               exit={{ x: "100%" }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="absolute right-0 top-0 bottom-0 w-80 bg-white/95 backdrop-blur-md border-l border-gray-200 shadow-2xl z-40 flex flex-col"
             >
                {/* 1. Header */}
                <div className="flex items-center justify-between px-4 pt-3 pb-2 text-zinc-900 border-b border-transparent">
                    <h2 className="font-semibold text-sm tracking-tight">Reader Tools</h2>
                    <button className="p-1.5 rounded-lg hover:bg-black/5 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* 2. Tabs */}
                <div className="px-4 pb-3">
                    <div className="flex p-1 bg-zinc-100/80 rounded-lg">
                        <button className="flex-1 py-1.5 text-[13px] font-medium text-zinc-900 bg-white shadow-sm rounded-md transition-all cursor-pointer">Highlights</button>
                        <button className="flex-1 py-1.5 text-[13px] font-medium text-zinc-500 hover:text-zinc-700 cursor-pointer">Outline</button>
                    </div>
                </div>

                {/* 3. Search & Filter Bar */}
                <div className="px-4 pb-4 pt-2 border-b border-zinc-200 flex flex-col gap-3">
                    <div className="relative">
                        <div className="w-full bg-zinc-100/50 border border-zinc-200 rounded-xl h-9 px-3 flex items-center text-sm text-zinc-400">
                            Search highlights...
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-5 h-5 rounded-full bg-zinc-400 flex items-center justify-center"><Check className="w-2.5 h-2.5 text-white" /></div>
                        {['yellow', 'pink', 'blue', 'green', 'purple'].map(c => (
                            <div key={c} className={clsx("w-5 h-5 rounded-full border border-transparent opacity-60", colorMap[c].replace('400', '400/50'))}></div>
                        ))}
                    </div>
                </div>

                {/* 4. Highlights List */}
                <div className="p-4 flex-1 overflow-y-auto">
                    <AnimatePresence>
                        {highlights.map((hl) => (
                            <motion.div 
                                key={hl.id}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 shadow-sm transition-all"
                            >
                                <div className="flex gap-3">
                                    <div className="mt-2 w-2 h-2 rounded-full flex-shrink-0 bg-yellow-400"></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] leading-relaxed text-zinc-900 line-clamp-4">{hl.text}</p>
                                        <div className="mt-3 p-2.5 rounded-lg text-xs italic relative bg-black/5 text-zinc-600">
                                            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg bg-yellow-400"></div>
                                            <span className="opacity-50 not-italic mr-1.5 font-bold uppercase text-[9px]">Note:</span>
                                            {hl.note}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
             </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
};

export const ReaderModeSpotlightV2 = memo(() => {
  const [activeFeature, setActiveFeature] = useState('distraction');

  return (
    // Fixed Height Container (600px)
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 h-[600px]">
       
       {/* Left Column: Navigation (Flex 1 to stretch) */}
       <div className="lg:col-span-4 flex flex-col gap-3 h-full">
          {FEATURES.map((feature) => {
             const isActive = activeFeature === feature.id;
             const Icon = feature.icon;
             
             // Dynamic color classes
             const activeClasses = {
                distraction: 'border-violet-200 bg-violet-50/50',
                citation: 'border-emerald-200 bg-emerald-50/50',
                highlights: 'border-amber-200 bg-amber-50/50'
             };
             
             const iconColors = {
                distraction: isActive ? 'text-violet-600' : 'text-gray-400',
                citation: isActive ? 'text-emerald-600' : 'text-gray-400',
                highlights: isActive ? 'text-amber-600' : 'text-gray-400'
             };

             const bgIconColors = {
                distraction: isActive ? 'bg-white' : 'bg-gray-100',
                citation: isActive ? 'bg-white' : 'bg-gray-100',
                highlights: isActive ? 'bg-white' : 'bg-gray-100'
             };

             return (
                <button
                   key={feature.id}
                   onClick={() => setActiveFeature(feature.id)}
                   className={clsx(
                      "flex-1 p-5 rounded-2xl border text-left transition-all duration-300 group flex flex-col justify-center cursor-pointer", // Added flex-1 and justify-center
                      isActive ? `${activeClasses[feature.id]} shadow-sm` : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white"
                   )}>
                   <div className={clsx(
                      "w-10 h-10 rounded-lg border flex items-center justify-center mb-4 transition-colors",
                      isActive ? "border-transparent shadow-sm" : "border-gray-200",
                      bgIconColors[feature.id],
                      iconColors[feature.id]
                   )}>
                      <Icon className="w-5 h-5" />
                   </div>
                   <h3 className={clsx("text-lg font-bold mb-2 transition-colors", isActive ? "text-gray-900" : "text-gray-600")}>
                      {feature.title}
                   </h3>
                   <p className="text-sm text-gray-500 leading-relaxed">
                      {feature.description}
                   </p>
                </button>
             );
          })}
       </div>

       {/* Right Column: Visual Display */}
       <div className="lg:col-span-8 h-full">
          <div className="h-full">
             {activeFeature === 'distraction' && <DistractionFreeVisual />}
             {activeFeature === 'citation' && <CitationVisual />}
             {activeFeature === 'highlights' && <HighlightsVisual />}
          </div>
       </div>
    </div>
  );
});
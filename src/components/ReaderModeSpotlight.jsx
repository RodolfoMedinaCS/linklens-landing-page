import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Quote, Highlighter, Check, Copy, X, MessageSquare, GripVertical, Trash2 } from 'lucide-react';
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
  const containerRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <div 
      className="relative w-full h-[550px] bg-white rounded-xl overflow-hidden border border-gray-200 select-none cursor-ew-resize group"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* 1. Cluttered View (Background) */}
      <div className="absolute inset-0 bg-[#f0f0f0] p-6 overflow-hidden">
         {/* Fake Ads & Clutter */}
         <div className="absolute top-0 inset-x-0 h-16 bg-red-500 text-white flex items-center justify-center font-bold text-lg animate-pulse">
            SALE! 50% OFF EVERYTHING!
         </div>
         <div className="absolute top-20 right-4 w-40 h-60 bg-blue-400 flex flex-col items-center justify-center text-white text-center p-2 rounded shadow-lg z-10">
            <span className="text-2xl mb-2">🎁</span>
            <span className="font-bold">You won a prize!</span>
            <button className="mt-4 px-4 py-1 bg-white text-blue-500 rounded text-xs font-bold">Click Here</button>
         </div>
         <div className="absolute bottom-4 left-4 w-60 h-24 bg-yellow-300 rounded border border-yellow-400 p-2 z-10">
            <span className="text-xs font-bold text-yellow-800">Subscribe to our Newsletter!</span>
            <div className="mt-2 h-8 bg-white rounded border border-yellow-500"></div>
         </div>

         {/* Content covered by clutter */}
         <div className="mt-20 max-w-2xl mx-auto opacity-50 blur-[1px]">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">The Psychology of Color in UI Design</h1>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
            <div className="space-y-3">
               <div className="h-3 bg-gray-300 rounded w-full"></div>
               <div className="h-3 bg-gray-300 rounded w-full"></div>
               <div className="h-3 bg-gray-300 rounded w-5/6"></div>
               <div className="h-3 bg-gray-300 rounded w-full"></div>
            </div>
         </div>
      </div>

      {/* 2. Clean View (Foreground - Clipped) */}
      <div 
        className="absolute inset-0 bg-white"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
         <div className="h-full p-8 md:p-12 overflow-y-auto bg-[#FBFBFB]">
            <div className="max-w-xl mx-auto">
               <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider text-emerald-700 uppercase bg-emerald-50 rounded-full">
                  LinkLens Reader
               </span>
               <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                  The Psychology of Color in User Interface Design
               </h1>
               <div className="flex items-center gap-3 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
                  <span className="font-medium text-gray-900">By Sarah Anderson</span>
                  <span>•</span>
                  <span>8 min read</span>
               </div>
               <div className="prose prose-lg prose-gray">
                  <p className="mb-4 text-gray-700 leading-relaxed">
                     Color is not just a visual element; it is a language. In the world of digital product design, color communicates meaning, evokes emotion, and guides user behavior without a single word being spoken.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                     When we look at the most successful applications of the last decade, we see a distinct pattern in how they utilize their color palettes.
                  </p>
               </div>
            </div>
         </div>
         
         {/* Slider Handle */}
         <div className="absolute top-0 right-0 w-1 h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] z-20">
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-indigo-500 transform transition-transform group-hover:scale-110">
               <GripVertical className="w-4 h-4" />
            </div>
         </div>
      </div>
      
      {/* Label Overlay */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none z-30">
         <div className="bg-black/70 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg">
            Drag to compare
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
    <div className="w-full h-[550px] bg-white rounded-xl overflow-hidden border border-gray-200 relative flex items-center justify-center bg-dots-pattern">
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

// --- 3. Highlights Visual ---
const HighlightsVisual = () => {
  const [showToolbar, setShowToolbar] = useState(false);
  const [highlightColor, setHighlightColor] = useState(null);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const sequence = async () => {
      // 1. Initial State
      if(isCancelled) return;
      setHighlightColor(null);
      setShowToolbar(false);
      setShowNote(false);
      await new Promise(r => setTimeout(r, 1000));

      // 2. Select Text (Simulated by showing toolbar immediately for simplicity in loop)
      if(isCancelled) return;
      setShowToolbar(true); // "Text selected"
      await new Promise(r => setTimeout(r, 1500));

      // 3. Apply Highlight
      if(isCancelled) return;
      setHighlightColor('yellow');
      setShowToolbar(false);
      
      // 4. Show Note Sidebar
      await new Promise(r => setTimeout(r, 500));
      if(isCancelled) return;
      setShowNote(true);

      // 5. Hold
      await new Promise(r => setTimeout(r, 4000));
      
      // 6. Loop
      if(!isCancelled) sequence();
    };
    sequence();
    return () => { isCancelled = true; };
  }, []);

  return (
    <div className="w-full h-[550px] bg-white rounded-xl overflow-hidden border border-gray-200 relative bg-[#FBFBFB] flex flex-col">
       <div className="p-8 md:p-12 prose prose-lg prose-gray max-w-none select-none h-full overflow-hidden">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">The Impact of Yellow</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
             Yellow is the most luminous of all the colors of the spectrum. It captures our attention more than any other color.
          </p>
          <div className="relative inline">
             <span className={clsx(
               "transition-colors duration-500 rounded px-0.5 box-decoration-clone leading-relaxed py-0.5",
               highlightColor === 'yellow' ? "bg-[#fef08a]" : // Tailwind yellow-200
               showToolbar ? "bg-blue-100" : "" // Selection state
             )}>
               In the natural world, yellow is the color of sunflowers and daffodils, egg yolks and lemons, canaries and bees.
             </span>
             
             {/* Floating Toolbar */}
             <AnimatePresence>
               {showToolbar && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0.9 }}
                   animate={{ opacity: 1, y: -12, scale: 1 }}
                   exit={{ opacity: 0, y: 5, scale: 0.9 }}
                   className="absolute left-1/2 -top-12 -translate-x-1/2 bg-[#1e1e1e] text-white px-1.5 py-1.5 rounded-lg shadow-xl flex items-center gap-1 z-20 whitespace-nowrap border border-[#333]"
                 >
                    <div className="flex gap-1 pr-2 border-r border-gray-600">
                       <button className="w-7 h-7 rounded hover:bg-gray-700 flex items-center justify-center text-yellow-400 transition-colors">
                          <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                       </button>
                       <button className="w-7 h-7 rounded hover:bg-gray-700 flex items-center justify-center text-green-400 transition-colors">
                          <div className="w-4 h-4 rounded-full bg-green-400"></div>
                       </button>
                       <button className="w-7 h-7 rounded hover:bg-gray-700 flex items-center justify-center text-pink-400 transition-colors">
                          <div className="w-4 h-4 rounded-full bg-pink-400"></div>
                       </button>
                    </div>
                    <button className="px-2.5 py-1 hover:bg-gray-700 rounded text-xs font-medium flex items-center gap-1.5 transition-colors">
                       <MessageSquare className="w-3.5 h-3.5" />
                       Note
                    </button>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">
             In our contemporary human-made world, yellow is the color of SpongeBob, the Tour de France winner's jersey, happy faces, post-its, and signs that alert us to danger or caution.
          </p>
          <p className="mt-6 text-gray-700 leading-relaxed opacity-50">
             It is the color of happiness, and optimism, of enlightenment and creativity, sunshine and spring.
          </p>
       </div>
       
       {/* Sidebar mock (shows when highlighted) */}
       <AnimatePresence>
          {showNote && (
             <motion.div 
               initial={{ x: "100%", opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: "100%", opacity: 0 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="absolute right-0 top-0 bottom-0 w-80 bg-white border-l border-gray-200 shadow-xl z-30 flex flex-col"
             >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                   <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Highlights</span>
                   <X className="w-4 h-4 text-gray-400" />
                </div>
                <div className="p-4">
                   <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100 relative group">
                      <div className="flex gap-3 mb-2">
                         <Quote className="w-4 h-4 text-yellow-600/50 fill-current shrink-0 mt-0.5" />
                         <p className="text-sm text-gray-800 font-serif italic line-clamp-3">
                            "In the natural world, yellow is the color of sunflowers and daffodils..."
                         </p>
                      </div>
                      
                      <div className="pl-7 mt-3 pt-3 border-t border-yellow-200/50">
                         <div className="flex items-center gap-2 mb-1">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">R</div>
                            <span className="text-xs font-medium text-gray-900">You</span>
                            <span className="text-[10px] text-gray-400">Just now</span>
                         </div>
                         <p className="text-xs text-gray-600">
                            Great quote for the color theory section!
                         </p>
                      </div>

                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                         <button className="p-1 hover:bg-yellow-200/50 rounded text-yellow-700"><Trash2 className="w-3 h-3" /></button>
                      </div>
                   </div>
                </div>
             </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
};

export const ReaderModeSpotlight = () => {
  const [activeFeature, setActiveFeature] = useState('distraction');

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 min-h-[600px] border-4 border-blue-500 p-4">
       {/* Left Column: Navigation */}
       <div className="lg:col-span-4 flex flex-col gap-4">
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
                      "p-6 rounded-2xl border text-left transition-all duration-300 group",
                      isActive ? `${activeClasses[feature.id]} shadow-sm scale-[1.02]` : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white"
                   )}
                >
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
       <div className="lg:col-span-8">
          <div className="h-full min-h-[550px]">
             {activeFeature === 'distraction' && <DistractionFreeVisual />}
             {activeFeature === 'citation' && <CitationVisual />}
             {activeFeature === 'highlights' && <HighlightsVisual />}
          </div>
       </div>
    </div>
  );
};
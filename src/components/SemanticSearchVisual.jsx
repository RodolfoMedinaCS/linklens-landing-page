import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Command, ArrowRight, FileText, Code2, Coffee } from 'lucide-react';

// SmartSearchIcon (from LinkLens App)
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

const DEMO_SCENARIOS = [
  {
    query: "Find articles about sustainable energy",
    icon: FileText,
    results: [
      { title: "The Future of Solar Batteries", match: "98%", date: "2d ago" },
      { title: "Green Tech Trends 2025", match: "94%", date: "1w ago" },
      { title: "Sustainable Architecture Guide", match: "89%", date: "Oct 24" }
    ]
  },
  {
    query: "React performance optimization tips",
    icon: Code2,
    results: [
      { title: "Advanced React Patterns", match: "99%", date: "Yesterday" },
      { title: "useMemo vs useCallback", match: "95%", date: "3d ago" },
      { title: "React 19 Compiler Guide", match: "92%", date: "1w ago" }
    ]
  },
  {
    query: "Healthy meal prep ideas for week",
    icon: Coffee,
    results: [
      { title: "30-Minute High Protein Meals", match: "97%", date: "5d ago" },
      { title: "The Ultimate Guide to Meal Prep", match: "93%", date: "2w ago" },
      { title: "Vegetarian Lunch Recipes", match: "88%", date: "Oct 12" }
    ]
  }
];

export const SemanticSearchVisual = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle -> typing -> thinking -> results
  const [typedText, setTypedText] = useState("");

  const currentScenario = DEMO_SCENARIOS[scenarioIndex];

  useEffect(() => {
    let isCancelled = false;

    const runSequence = async () => {
      if (isCancelled) return;

      // 1. Idle / Reset
      setPhase('idle');
      setTypedText("");
      await new Promise(r => setTimeout(r, 1000));
      if (isCancelled) return;

      // 2. Typing Effect (Smoother)
      setPhase('typing');
      const text = currentScenario.query;
      
      // Type faster and more consistently
      for (let i = 0; i <= text.length; i++) {
        if (isCancelled) return;
        setTypedText(text.slice(0, i));
        // Consistent speed with tiny variance for realism, but faster
        await new Promise(r => setTimeout(r, 30 + Math.random() * 15)); 
      }
      
      if (isCancelled) return;
      await new Promise(r => setTimeout(r, 400)); // Short pause after typing

      // 3. Thinking
      setPhase('thinking');
      await new Promise(r => setTimeout(r, 1200));
      if (isCancelled) return;

      // 4. Results
      setPhase('results');
      await new Promise(r => setTimeout(r, 4000)); // Show results for 4s
      if (isCancelled) return;

      // 5. Next Scenario
      setScenarioIndex((prev) => (prev + 1) % DEMO_SCENARIOS.length);
    };

    runSequence();

    return () => { isCancelled = true; };
  }, [scenarioIndex]);

  return (
    <div className="w-full bg-[#0F172A] rounded-2xl border border-indigo-500/20 shadow-2xl shadow-indigo-900/20 overflow-hidden font-sans relative min-h-[320px] flex flex-col">
      {/* Glow Effect */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
      
      {/* Header / Input Area */}
      <div className="p-4 border-b border-indigo-500/10 flex items-center gap-3 shrink-0 bg-[#0F172A] z-20">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 transition-colors duration-300">
           {phase === 'thinking' ? <Sparkles className="w-4 h-4 animate-pulse" /> : <SmartSearchIcon className="w-4 h-4" />}
        </div>
        
        {/* Stable Text Container */}
        <div className="flex-1 font-medium text-lg relative h-[3.5rem]">
           {/* Placeholder - Absolute */}
           <span 
             className={`text-slate-500 absolute inset-0 flex items-center transition-opacity duration-300 ${typedText ? 'opacity-0' : 'opacity-50'}`}
           >
             Ask AI anything...
           </span>
           
           {/* Typing Text - Absolute to prevents layout push */}
           <span className="text-slate-200 absolute inset-0 z-10 flex items-center whitespace-pre-wrap break-words leading-tight overflow-hidden">
              {typedText}
              {/* Custom Cursor - Only show when not finished results */}
              {phase !== 'results' && (
                <span className="w-0.5 h-5 bg-indigo-400 ml-0.5 animate-pulse inline-block align-middle" />
              )}
           </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/50 border border-slate-700/50 text-[10px] text-slate-400 font-mono shrink-0 self-start mt-1">
           <Command className="w-3 h-3" />
           <span>K</span>
        </div>
      </div>

      {/* Content Area - Fixed Height to prevent jumping */}
      <div className="p-2 h-[240px] bg-slate-900/30 relative overflow-y-auto overflow-x-hidden no-scrollbar">
         <AnimatePresence mode="wait">
            
            {/* Thinking State */}
            {phase === 'thinking' && (
               <motion.div 
                 key="thinking"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10"
               >
                  <div className="flex gap-1.5">
                     <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-indigo-500"></motion.div>
                     <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-indigo-400"></motion.div>
                     <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-indigo-300"></motion.div>
                  </div>
                  <span className="text-xs text-indigo-300/70 font-medium">Scanning library...</span>
               </motion.div>
            )}

            {/* Results State */}
            {phase === 'results' && (
               <motion.div 
                 key="results"
                 className="space-y-2 pt-2 relative z-10"
                 initial="hidden"
                 animate="show"
                 exit="hidden"
                 variants={{
                   hidden: { opacity: 0 },
                   show: {
                     opacity: 1,
                     transition: {
                       staggerChildren: 0.1
                     }
                   }
                 }}
               >
                  {currentScenario.results.map((item, i) => (
                    <motion.div
                      key={item.title}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0 }
                      }}
                      className="group flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5 w-full max-w-full"
                    >
                       <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors shrink-0">
                          <currentScenario.icon className="w-4 h-4" />
                       </div>
                       <div className="flex-1 min-w-0 grid">
                          <div className="flex items-center justify-between mb-0.5 w-full">
                             <span className="text-sm font-medium text-slate-200 truncate pr-2 max-w-full">{item.title}</span>
                             <span className="text-[10px] text-slate-500 whitespace-nowrap hidden sm:block">{item.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden max-w-[60px] min-w-[40px]">
                                <div className="h-full bg-indigo-500" style={{ width: item.match }}></div>
                             </div>
                             <span className="text-[10px] text-indigo-400 font-medium whitespace-nowrap">{item.match} Match</span>
                          </div>
                       </div>
                       <ArrowRight className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0" />
                    </motion.div>
                  ))}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};
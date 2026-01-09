import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, BookOpen, FileText, Check, Copy, X } from 'lucide-react';
import { clsx } from 'clsx';

export const StudentVisual = () => {
  const [activeStyle, setActiveStyle] = useState('APA');
  const [isCopied, setIsCopied] = useState(false);
  
  const styles = ['APA', 'MLA', 'Chicago', 'Harvard'];

  const getCitation = (s) => {
    switch(s) {
      case 'APA': return <span>Christian, B. (2020). <i className="font-serif italic">The Alignment Problem: Machine Learning and Human Values</i>. W. W. Norton & Company.</span>;
      case 'MLA': return <span>Christian, Brian. <i className="font-serif italic">The Alignment Problem: Machine Learning and Human Values</i>. W. W. Norton & Company, 2020.</span>;
      case 'Chicago': return <span>Christian, Brian. 2020. <i className="font-serif italic">The Alignment Problem: Machine Learning and Human Values</i>. New York: W. W. Norton & Company.</span>;
      case 'Harvard': return <span>Christian, B. (2020) <i className="font-serif italic">The Alignment Problem: Machine Learning and Human Values</i>. New York: W. W. Norton & Company.</span>;
      default: return "";
    }
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Auto-cycle through styles for demo
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStyle(prev => {
        const idx = styles.indexOf(prev);
        return styles[(idx + 1) % styles.length];
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-[350px] relative overflow-hidden flex flex-col items-center justify-center p-6 bg-gray-50/50">
      
      {/* Background Context (Blurred List) */}
      <div className="absolute inset-0 p-6 space-y-4 opacity-30 blur-sm pointer-events-none">
         <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded bg-emerald-100 flex items-center justify-center text-emerald-600"><FileText className="w-5 h-5" /></div>
            <div className="flex-1 space-y-2">
               <div className="h-2 bg-gray-300 rounded w-3/4"></div>
               <div className="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
         </div>
         <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-600"><FileText className="w-5 h-5" /></div>
            <div className="flex-1 space-y-2">
               <div className="h-2 bg-gray-300 rounded w-2/3"></div>
               <div className="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
         </div>
      </div>

      {/* The Authentic Popover Mockup */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative z-10 scale-110"
      >
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Quote className="w-5 h-5 fill-current" />
                </div>
                <span className="font-bold text-base text-gray-900">Cite this article</span>
            </div>
            <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
                <X className="w-5 h-5" />
            </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
            {/* Tabs */}
            <div className="flex p-1.5 rounded-xl bg-gray-100/80">
                {styles.map(style => (
                    <button
                        key={style}
                        onClick={() => setActiveStyle(style)}
                        className={clsx(
                            "flex-1 py-2 text-sm font-semibold rounded-lg transition-all relative",
                            activeStyle === style 
                                ? "text-blue-600 shadow-sm bg-white" 
                                : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        {activeStyle === style && (
                            <motion.div 
                                layoutId="citation-tab-student"
                                className="absolute inset-0 bg-white rounded-lg shadow-sm z-[-1]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{style}</span>
                    </button>
                ))}
            </div>

            {/* Preview Box */}
            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 text-base leading-relaxed font-serif text-gray-800 min-h-[120px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStyle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {getCitation(activeStyle)}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className={clsx(
                    "w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-base font-bold transition-all shadow-sm",
                    isCopied 
                        ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                        : "bg-gray-900 text-white hover:bg-gray-800"
                )}
            >
                {isCopied ? (
                    <>
                        <Check className="w-5 h-5" />
                        Copied to Clipboard
                    </>
                ) : (
                    <>
                        <Copy className="w-5 h-5" />
                        Copy Citation
                    </>
                )}
            </button>
        </div>
      </motion.div>
    </div>
  );
};
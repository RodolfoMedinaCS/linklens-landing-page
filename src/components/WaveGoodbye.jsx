import React, { useState, useEffect, useRef } from 'react';
import { Bookmark, Sparkles, Clock, Zap } from 'lucide-react';
import { problems } from '../data';

export const WaveGoodbye = () => {
  const [problemIndex, setProblemIndex] = useState(6);
  const [isInstant, setIsInstant] = useState(true);
  const listRef = useRef(null);

  // Create 3 sets for smooth infinite looping
  const loopItems = [...problems, ...problems, ...problems];

  useEffect(() => {
    const interval = setInterval(() => {
      setProblemIndex(prev => {
        setIsInstant(false);
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (problemIndex === 12) {
      const timeout = setTimeout(() => {
        setIsInstant(true);
        setProblemIndex(6);
      }, 1000); // Wait for transition to finish (matches duration-1000)
      return () => clearTimeout(timeout);
    }
  }, [problemIndex]);

  useEffect(() => {
    if (listRef.current) {
      const children = Array.from(listRef.current.children);
      const activeItem = children[problemIndex];
      if (activeItem) {
        const itemCenter = activeItem.offsetTop + (activeItem.offsetHeight / 2);
        listRef.current.style.transform = `translateY(-${itemCenter}px)`;
        
        if (isInstant) {
            listRef.current.style.transition = 'none';
        } else {
            listRef.current.style.transition = 'transform 1000ms cubic-bezier(0.25, 1, 0.5, 1)';
        }
      }
    }
  }, [problemIndex, isInstant]);

  return (
    <section className="hidden lg:block w-full relative px-6 md:px-12 py-24 md:py-40" style={{ backgroundImage: 'radial-gradient(at 0% 0%, rgba(127, 232, 184, 0.1) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(196, 181, 253, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(125, 211, 252, 0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(252, 211, 77, 0.1) 0px, transparent 50%)', backgroundColor: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto">
        {/* Headline Container - Fixed Alignment */}
        <div className="mx-auto w-full max-w-[1600px] flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-10 mb-24 px-4 sm:px-6">
          {/* Left Side Title */}
          <div className="flex-1 flex justify-center xl:justify-end min-w-0">
            <h2 className="text-3xl sm:text-4xl md:text-6xl tracking-tight text-gray-900 leading-tight font-bold z-20 whitespace-nowrap text-center xl:text-right flex-shrink-0 relative py-2">
              <span className="relative inline-block">
                <span className="absolute -left-6 -top-10 text-[#A7F3D0] animate-pulse">
                  <iconify-icon icon="solar:stars-minimalistic-bold-duotone" width="32"></iconify-icon>
                </span>
                <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-[#BAE6FD] animate-blob" style={{ animationDuration: '4s' }}>
                  <iconify-icon icon="solar:star-fall-minimalistic-2-bold-duotone" width="24"></iconify-icon>
                </span>
                <span className="absolute -left-5 -bottom-2 text-[#DDD6FE] animate-float" style={{ animationDuration: '5s' }}>
                  <iconify-icon icon="solar:sparkle-bold-duotone" width="18"></iconify-icon>
                </span>
                Wave goodbye to
              </span>
            </h2>
          </div>

          {/* Right Side List */}
          <div className="flex-1 flex justify-center xl:justify-start w-full min-w-0">
            <div className="relative h-40 sm:h-48 md:h-64 w-full max-w-[900px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
              <div ref={listRef} className="absolute left-0 right-0 top-1/2 flex flex-col items-center xl:items-start pl-2">
                {loopItems.map((text, idx) => {
                  const isActive = idx === problemIndex;
                  // Apply styles
                  let className = "";
                  let style = {};

                  if (isActive) {
                    className = 'problem-item w-full text-center xl:text-left text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7FE8B8] via-[#7DD3FC] to-[#C4B5FD] opacity-100 scale-100 blur-0 origin-center xl:origin-left whitespace-nowrap leading-relaxed py-4 pr-12 select-none';
                    style = { textShadow: '0 0 40px rgba(127, 232, 184, 0.2)' };
                  } else {
                    className = 'problem-item w-full text-center xl:text-left text-3xl sm:text-4xl md:text-6xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-400 line-through decoration-2 decoration-gray-300/50 opacity-30 blur-sm scale-95 origin-center xl:origin-left whitespace-nowrap leading-relaxed py-4 pr-12 select-none';
                    style = { textShadow: 'none' };
                  }
                  
                  return (
                    <div key={idx} className={className} style={style}>
                      {text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-8 left-0 w-full h-px bg-gray-200/60 hidden md:block"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {/* Stat 1 */}
            <div className="relative flex flex-col items-center text-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-white border border-emerald-100 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: '0 0 30px -5px rgba(127, 232, 184, 0.4)' }}>
                <div className="absolute inset-0 bg-[#7FE8B8] rounded-full opacity-40 blur-[20px] group-hover:opacity-60 transition-opacity animate-pulse"></div>
                <Bookmark className="w-8 h-8 text-emerald-600 stroke-[2]" />
              </div>
              <div>
                <div className="text-4xl font-semibold text-gray-900 tracking-tight mb-1">
                  10K+
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Bookmarks Saved
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="relative flex flex-col items-center text-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-white border border-violet-100 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: '0 0 30px -5px rgba(196, 181, 253, 0.4)' }}>
                <div className="absolute inset-0 bg-[#C4B5FD] rounded-full opacity-40 blur-[20px] group-hover:opacity-60 transition-opacity animate-pulse"></div>
                <Sparkles className="w-8 h-8 text-violet-600 stroke-[2]" />
              </div>
              <div>
                <div className="text-4xl font-semibold text-gray-900 tracking-tight mb-1">
                  50K+
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Highlights Created
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="relative flex flex-col items-center text-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-white border border-sky-100 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: '0 0 30px -5px rgba(125, 211, 252, 0.4)' }}>
                <div className="absolute inset-0 bg-[#7DD3FC] rounded-full opacity-40 blur-[20px] group-hover:opacity-60 transition-opacity animate-pulse"></div>
                <Clock className="w-8 h-8 text-sky-600 stroke-[2]" />
              </div>
              <div>
                <div className="text-4xl font-semibold text-gray-900 tracking-tight mb-1">
                  24/7
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Cloud Sync
                </div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="relative flex flex-col items-center text-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-white border border-yellow-100 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: '0 0 30px -5px rgba(252, 211, 77, 0.4)' }}>
                <div className="absolute inset-0 bg-[#FCD34D] rounded-full opacity-40 blur-[20px] group-hover:opacity-60 transition-opacity animate-pulse"></div>
                <Zap className="w-8 h-8 text-amber-500 stroke-[2]" />
              </div>
              <div>
                <div className="text-4xl font-semibold text-gray-900 tracking-tight mb-1">
                  500+
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Hours Saved
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

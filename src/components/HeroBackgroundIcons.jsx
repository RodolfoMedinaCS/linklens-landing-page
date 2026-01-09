import React from 'react';

const FloatingIcon = ({ icon, className, delay, size = "32" }) => (
  <div 
    className={`absolute animate-float ${className}`} 
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-3 md:p-4 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
      <iconify-icon icon={icon} width={size} height={size}></iconify-icon>
    </div>
  </div>
);

export const HeroBackgroundIcons = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-[900px] z-0 pointer-events-none overflow-hidden">
       <div className="max-w-[1400px] mx-auto relative h-full w-full">
       {/* Left Side - Scattered */}
       <FloatingIcon 
         icon="logos:youtube-icon" 
         className="top-[12%] left-[5%] md:left-[10%] rotate-[-6deg]" 
         delay="0" 
         size="40"
       />
       <FloatingIcon 
         icon="logos:figma" 
         className="top-[38%] left-[-2%] md:left-[3%] rotate-[12deg]" 
         delay="1.5"
         size="36" 
       />
       <FloatingIcon 
         icon="vscode-icons:file-type-pdf2" 
         className="top-[60%] left-[8%] md:left-[12%] rotate-[-12deg]" 
         delay="3" 
         size="42"
       />
       
       {/* Extra small blurred ones for depth */}
       <FloatingIcon 
         icon="logos:pinterest" 
         className="top-[25%] left-[18%] opacity-50 scale-75 blur-[1px]" 
         delay="2.5" 
         size="24"
       />

       {/* Right Side - Scattered */}
       <FloatingIcon 
         icon="logos:spotify-icon" 
         className="top-[15%] right-[5%] md:right-[8%] rotate-[12deg]" 
         delay="2" 
         size="38"
       />
       <FloatingIcon 
         icon="logos:notion-icon" 
         className="top-[45%] right-[-1%] md:right-[4%] rotate-[-6deg]" 
         delay="0.5" 
         size="34"
       />
       <FloatingIcon 
         icon="flat-color-icons:google" 
         className="top-[68%] right-[10%] md:right-[14%] rotate-[8deg]" 
         delay="4" 
         size="36"
       />

       {/* Extra small blurred ones for depth */}
       <FloatingIcon 
         icon="ri:twitter-x-fill" 
         className="top-[28%] right-[20%] opacity-50 scale-75 blur-[1px]" 
         delay="5" 
         size="24"
       />
       </div>
    </div>
  );
};

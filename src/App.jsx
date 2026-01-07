import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, BookmarkPlus, Sparkles, Search, LayoutGrid, Star, Clock, FileCode2,
  MoreHorizontal, Figma, Type, Check, Wand2, X, Bookmark, Zap, CheckCircle,
  ShieldCheck, CalendarOff, Plus, Mail, ArrowRight, BookOpen, Highlighter,
  Quote, Ruler, List, Palette, MousePointerClick, Download
} from 'lucide-react';
import Lenis from 'lenis';
import { ExtensionSpotlight } from './components/ExtensionSpotlight';
import { SemanticSearchVisual } from './components/SemanticSearchVisual';
import { DiscoveryVisual } from './components/DiscoveryVisual';
import { ReaderModeSpotlightV2 } from './components/ReaderModeSpotlightV2';
import { CollectionsTree } from './components/CollectionsTree';
import { StudentVisual } from './components/use-cases/StudentVisual';
import { ResearcherVisual } from './components/use-cases/ResearcherVisual';
import { EducatorVisual } from './components/use-cases/EducatorVisual';
import { CreatorVisual } from './components/use-cases/CreatorVisual';
import { tabContent, leftFaqs, rightFaqs, problems, footerLinks } from './data';

function App() {
  const [isYearly, setIsYearly] = useState(false);
  const [activeTab, setActiveTab] = useState("students");
  const [openFaq, setOpenFaq] = useState(null);
  const [problemIndex, setProblemIndex] = useState(6);
  const [isInstant, setIsInstant] = useState(true);
  const listRef = useRef(null);

  // Refs for direct DOM manipulation to avoid re-renders on scroll
  const navRef = useRef(null);
  const navContainerRef = useRef(null);
  const logoTextRef = useRef(null);
  const signInWrapperRef = useRef(null);
  const dashboardRef = useRef(null);
  
  // Track previous state to avoid unnecessary DOM writes
  const wasScrolledRef = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', (e) => {
      const scrollY = e.scroll;
      const isScrolled = scrollY > 20;

      // 1. Dashboard Scale Logic (Continuous)
      if (scrollY < 1000 && dashboardRef.current) {
        const scale = Math.min(1.1, 0.9 + (scrollY / 400) * 0.2);
        dashboardRef.current.style.transform = `scale(${scale})`;
      }

      // 2. Navbar Styling (Conditional - Only update on change)
      if (isScrolled !== wasScrolledRef.current) {
        
        if (navContainerRef.current) {
          if (isScrolled) {
            navContainerRef.current.className = "mx-auto flex items-center justify-between transition-all duration-500 ease-in-out max-w-2xl bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-sm rounded-full py-2 px-6";
            if (navRef.current) navRef.current.classList.add('pt-4');
          } else {
            navContainerRef.current.className = "mx-auto flex items-center justify-between transition-all duration-500 ease-in-out max-w-5xl bg-transparent border-transparent py-2 px-6";
            if (navRef.current) navRef.current.classList.remove('pt-4');
          }
        }

        // 3. Logo Text Visibility
        if (logoTextRef.current) {
          if (isScrolled) {
             logoTextRef.current.classList.add('hidden', 'md:block');
          } else {
             logoTextRef.current.classList.remove('hidden', 'md:block');
          }
        }

        // 4. Sign In Button Visibility
        if (signInWrapperRef.current) {
          if (isScrolled) {
            signInWrapperRef.current.classList.remove('grid-cols-[1fr]', 'opacity-100');
            signInWrapperRef.current.classList.add('grid-cols-[0fr]', 'opacity-0');
          } else {
            signInWrapperRef.current.classList.remove('grid-cols-[0fr]', 'opacity-0');
            signInWrapperRef.current.classList.add('grid-cols-[1fr]', 'opacity-100');
          }
        }
        
        wasScrolledRef.current = isScrolled;
      }
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
    <div className="bg-white min-h-screen font-sans antialiased text-gray-900 selection:bg-[#BAE6FD] selection:text-gray-900">
      {/* Navbar */}
      <nav ref={navRef} className="fixed top-0 z-50 w-full transition-all duration-300">
        <div 
          ref={navContainerRef}
          className="mx-auto flex items-center justify-between transition-all duration-500 ease-in-out max-w-5xl bg-transparent border-transparent py-2 px-6"
        >
          <div className="flex items-center gap-0.5">
            <img src="/logo-prism.png" alt="LinkLens" className="w-9 h-9 object-contain" />
            <span ref={logoTextRef} className="text-lg font-bold tracking-tight text-gray-900 transition-opacity duration-300 -ml-1">LinkLens</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Chrome Extension
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div 
              ref={signInWrapperRef}
              className="grid transition-all duration-500 ease-in-out grid-cols-[1fr] opacity-100"
            >
              <div className="overflow-hidden">
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap px-2">
                  Sign In
                </button>
              </div>
            </div>
            <button className="text-sm font-medium text-white bg-gray-900 px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 whitespace-nowrap">
              Get Started
            </button>
          </div>
          <button className="md:hidden p-2 text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="w-full overflow-x-hidden relative pb-0">
        {/* 5-Color Mesh Gradient Background (Hero Only) */}
        <div className="absolute inset-0 z-0 bg-white h-[900px]"></div>
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none h-[900px]">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#A7F3D0] opacity-40 blur-[100px] animate-blob mix-blend-multiply"></div>
          <div className="absolute top-[0%] -right-[10%] w-[50%] h-[60%] rounded-full bg-[#BAE6FD] opacity-40 blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
          <div className="absolute top-[30%] right-[15%] w-[40%] h-[40%] rounded-full bg-[#DDD6FE] opacity-40 blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center pt-32 pb-24 text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-white shadow-sm mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#A7F3D0] ring-1 ring-emerald-200"></span>
            <span className="text-xs font-medium text-gray-600 tracking-wide">
              Trusted by
              <span className="text-gray-900 font-semibold"> 500+ </span>
              students and researchers
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-gray-900 mb-6 max-w-4xl leading-[1.1]">
            Save. Organize. Read.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
              All in one place.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 font-normal leading-relaxed">
            LinkLens is the modern bookmark manager for students and researchers.
            Save links in one click, organize them in beautiful collections, and
            read distraction-free with powerful tools.
          </p>

          <div className="flex flex-col items-center gap-6 mb-16">
            <button className="group bg-gray-900 text-white text-base font-medium px-8 py-3.5 rounded-xl shadow-xl shadow-gray-900/20 hover:bg-gray-800 hover:shadow-2xl hover:shadow-gray-900/30 transition-all duration-300 flex items-center gap-2">
              Get Started Free
              <iconify-icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform"></iconify-icon>
            </button>
            <div className="text-sm font-medium text-gray-500">
              No credit card required • 75 bookmarks free forever
            </div>
          </div>

          {/* Browser Mockup */}
          <div className="relative w-full max-w-5xl mx-auto perspective-[2000px] group">
            <div 
              ref={dashboardRef}
              style={{ transform: `scale(0.9)` }}
              className="relative bg-white rounded-t-xl rounded-b-lg shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-200/80 overflow-hidden origin-center will-change-transform"
            >
              <div className="bg-gray-50/80 border-b border-gray-200 px-4 py-3 flex items-center gap-4 backdrop-blur-sm">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400/80 border border-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80 border border-emerald-500/50"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white border border-gray-200 text-gray-400 text-xs py-1.5 px-32 rounded-md flex items-center gap-2 shadow-sm">
                    <iconify-icon icon="solar:lock-keyhole-minimalistic-bold" className="text-gray-300"></iconify-icon>
                    app.linklens.ai
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-50 flex flex-col items-center justify-center overflow-hidden">
                <img 
                  src="/hero-dashboard-new.png" 
                  alt="LinkLens Dashboard" 
                  className="w-full h-auto block" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: 3 CORE PILLARS */}
        <section className="w-full py-20 px-6 border-b border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
              {/* Pillar 1: Save */}
              <div className="flex flex-col md:flex-row gap-5 items-center md:items-start group">
                <div className="w-14 h-14 rounded-2xl bg-[#A7F3D0]/30 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <BookmarkPlus className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Save Instantly</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Bookmark articles, videos, and papers with one click using our Chrome extension. No more lost tabs.
                  </p>
                </div>
              </div>
              
              {/* Pillar 2: Organize */}
              <div className="flex flex-col md:flex-row gap-5 items-center md:items-start group">
                <div className="w-14 h-14 rounded-2xl bg-[#BAE6FD]/30 text-sky-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                   <LayoutGrid className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Organize Beautifully</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Sort your research into visual collections. Choose from 1,300+ icons and 4 stunning layouts.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Read */}
              <div className="flex flex-col md:flex-row gap-5 items-center md:items-start group">
                <div className="w-14 h-14 rounded-2xl bg-[#DDD6FE]/30 text-violet-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                   <BookOpen className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Read & Cite</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Read without distractions. Highlight, annotate, and generate citations automatically for your papers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SAVE (CHROME EXTENSION) */}
        <section className="w-full py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden">
           <div className="max-w-7xl mx-auto relative z-10">
             <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Content */}
                <div className="flex flex-col gap-6 order-2 lg:order-1">
                  <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    <Bookmark className="w-3 h-3 fill-current" />
                    Save Content
                  </span>
                  <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
                    Capture ideas without
                    <br />
                    breaking your flow
                  </h2>
                  <p className="text-lg text-gray-600 font-normal leading-relaxed max-w-lg">
                    See something interesting? Click the LinkLens button and keep browsing. We’ll handle the rest.
                  </p>

                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                         <MousePointerClick className="w-5 h-5 text-gray-700" />
                       </div>
                       <div>
                         <h4 className="text-base font-semibold text-gray-900">One-click Capture</h4>
                         <p className="text-sm text-gray-500 mt-1">
                           Save the current tab instantly via Chrome extension.
                         </p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                         <Sparkles className="w-5 h-5 text-gray-700" />
                       </div>
                       <div>
                         <h4 className="text-base font-semibold text-gray-900">Smart Tagging</h4>
                         <p className="text-sm text-gray-500 mt-1">
                           AI automatically suggests tags so you don't have to type them.
                         </p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                         <FileCode2 className="w-5 h-5 text-gray-700" />
                       </div>
                       <div>
                         <h4 className="text-base font-semibold text-gray-900">Add Notes Instantly</h4>
                         <p className="text-sm text-gray-500 mt-1">
                           Jot down why you saved it before you forget.
                         </p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className="relative order-1 lg:order-2 flex justify-center">
                   <ExtensionSpotlight />
                </div>
             </div>
           </div>
        </section>

        {/* SECTION 4: ORGANIZE (COLLECTIONS) */}
        <section className="w-full py-24 md:py-32 px-6 md:px-12 bg-gray-50/50">
           <div className="max-w-7xl mx-auto">
             <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Visual */}
                <div className="relative flex justify-center">
                   <CollectionsTree />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6">
                  <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold uppercase tracking-wider text-sky-700">
                    <LayoutGrid className="w-3 h-3 fill-current" />
                    Organize
                  </span>
                  <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
                    Make it yours with
                    <br />
                    custom collections
                  </h2>
                  <p className="text-lg text-gray-600 font-normal leading-relaxed max-w-lg">
                    Create the perfect library structure. Whether you're a visual thinker or a list lover, LinkLens adapts to you.
                  </p>

                  <ul className="space-y-4 mt-2">
                     <li className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-sky-500" />
                        <span className="text-gray-700">Choose from 1,300+ custom icons</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-sky-500" />
                        <span className="text-gray-700">Unlimited nested collections (Premium)</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-sky-500" />
                        <span className="text-gray-700">Drag and drop organization</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-sky-500" />
                        <span className="text-gray-700">AI suggests where new bookmarks belong</span>
                     </li>
                  </ul>
                </div>
             </div>
           </div>
        </section>

        {/* SECTION 5: READER MODE (MAJOR FEATURE) */}
        <section className="w-full py-24 md:py-32 px-6 md:px-12 bg-white border-y border-gray-100">
           <div className="max-w-[1400px] mx-auto">
             <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-xs font-semibold uppercase tracking-wider text-violet-700 mb-6">
                   <BookOpen className="w-3 h-3 fill-current" />
                   Reader Mode
                </span>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
                   Your research powerhouse.
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                   LinkLens isn't just for saving links. It's for reading, understanding, and using them. 
                   Switch to Reader Mode for a distraction-free experience designed for students.
                </p>
             </div>

             <ReaderModeSpotlightV2 />
           </div>
        </section>

        {/* SECTION 6: BEAUTIFUL LAYOUTS */}
        <section className="w-full py-20 px-6 bg-gray-50">
           <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-10">View your research your way</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {/* Layout Items */}
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform">
                    <div className="w-full aspect-video bg-gray-100 rounded-lg flex flex-wrap p-1 gap-1 content-start">
                       <div className="w-[45%] h-6 bg-gray-200 rounded-sm"></div>
                       <div className="w-[45%] h-6 bg-gray-200 rounded-sm"></div>
                       <div className="w-[45%] h-6 bg-gray-200 rounded-sm"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Grid</span>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform">
                    <div className="w-full aspect-video bg-gray-100 rounded-lg flex gap-1 p-1">
                       <div className="flex-1 flex flex-col gap-1">
                          <div className="bg-gray-200 h-8 rounded-sm"></div>
                          <div className="bg-gray-200 h-4 rounded-sm"></div>
                       </div>
                       <div className="flex-1 flex flex-col gap-1">
                          <div className="bg-gray-200 h-4 rounded-sm"></div>
                          <div className="bg-gray-200 h-8 rounded-sm"></div>
                       </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Moodboard</span>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform">
                    <div className="w-full aspect-video bg-gray-100 rounded-lg flex flex-col justify-center p-2 relative">
                        <div className="absolute left-1/2 top-2 bottom-2 w-0.5 bg-gray-300 -translate-x-1/2"></div>
                        <div className="w-8 h-4 bg-gray-200 rounded-sm self-start mb-1"></div>
                        <div className="w-8 h-4 bg-gray-200 rounded-sm self-end"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Timeline</span>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform">
                    <div className="w-full aspect-video bg-gray-100 rounded-lg flex flex-col gap-1 p-2">
                        <div className="w-full h-2 bg-gray-200 rounded-sm"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-sm"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-sm"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-sm"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">List</span>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 7: PREMIUM AI DISCOVERY */}
        <section className="w-full py-24 md:py-32 px-6 md:px-12 bg-gray-900 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

           <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col items-center text-center mb-20">
                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-6">
                    <Sparkles className="w-3 h-3 fill-current" />
                    Premium Features
                 </span>
                 <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
                    Discover faster with AI
                 </h2>
                 <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                    Upgrade to Premium to unlock our advanced AI engine. It reads your bookmarks so you can find connections you didn't know existed.
                 </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                 {/* Feature 1: Semantic Search */}
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-6">
                       <Search className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Semantic Search</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                       Don't remember the exact title? No problem. Search for concepts like "climate change solutions" and our AI will find that article about renewable energy—even if the keywords don't match.
                    </p>
                    <SemanticSearchVisual />
                 </div>

                 {/* Feature 2: Discovery AI */}
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-6">
                       <Wand2 className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Discovery AI</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                       Found a perfect source? Use Discovery to instantly surface every other bookmark in your library that is conceptually similar. It's like magic for literature reviews.
                    </p>
                    <DiscoveryVisual />
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 8: WAVE GOODBYE (KEPT AS IS) */}
        <section className="w-full relative px-6 md:px-12 py-24 md:py-40" style={{ backgroundImage: 'radial-gradient(at 0% 0%, rgba(127, 232, 184, 0.1) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(196, 181, 253, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(125, 211, 252, 0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(252, 211, 77, 0.1) 0px, transparent 50%)', backgroundColor: '#FAFAFA' }}>
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
                      AI Tags Generated
                    </div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="relative flex flex-col items-center text-center gap-6 group">
                  <div className="w-20 h-20 rounded-full bg-white border border-sky-100 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: '0 0 30px -5px rgba(125, 211, 252, 0.4)' }}>
                    <div className="absolute inset-0 bg-[#7DD3FC] rounded-full opacity-40 blur-[20px] group-hover:opacity-60 transition-opacity animate-pulse"></div>
                    <Search className="w-8 h-8 text-sky-600 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-4xl font-semibold text-gray-900 tracking-tight mb-1">
                      25K+
                    </div>
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Smart Searches
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

        {/* Bottom Pricing Section (UPDATED) */}
        <section className="w-full relative py-24 md:py-32 px-6 md:px-12 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">
                Pricing
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
                Start reading for free
              </h2>
              <p className="text-lg text-gray-600 font-normal">
                Core features and Reader Mode are always free. Upgrade for AI discovery.
              </p>
            </div>
            <div className="flex justify-center items-center gap-4 mb-16">
              <span className="text-sm font-medium text-gray-900" id="monthly-label">
                Billed Monthly
              </span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${isYearly ? 'bg-gray-900' : 'bg-gray-200'}`}
              >
                <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${isYearly ? 'translate-x-6' : ''}`}></span>
              </button>
              <span className="text-sm font-medium text-gray-500" id="yearly-label">
                Billed Yearly
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100" id="annual-savings">
                Save ~33%
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Free Tier */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                <div className="p-8 pb-0">
                  <div className="w-12 h-12 rounded-xl bg-[#A7F3D0]/30 flex items-center justify-center mb-6 text-emerald-700">
                    <BookOpen className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Free
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 h-10 leading-relaxed">
                    Everything you need to save and read.
                  </p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-semibold tracking-tight text-gray-900">
                      $0
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      Forever
                    </span>
                  </div>
                  <button className="w-full bg-gray-100 text-gray-900 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-200 transition-colors">
                    Get Started
                  </button>
                </div>
                <div className="p-8 bg-gray-50 mt-8 flex-1 border-t border-gray-100">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500 stroke-[2] mt-0.5" />
                      75 bookmarks
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500 stroke-[2] mt-0.5" />
                      10 collections
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500 stroke-[2] mt-0.5" />
                      AI Auto-tagging
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500 stroke-[2] mt-0.5" />
                      Smart Collection Filing
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500 stroke-[2] mt-0.5" />
                      <strong>Reader Mode</strong> (Distraction free)
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500 stroke-[2] mt-0.5" />
                      All 4 Layouts included
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pro Tier */}
              <div className="relative bg-white rounded-2xl shadow-xl border border-transparent overflow-hidden flex flex-col h-full ring-1 ring-[#DDD6FE] shadow-indigo-100">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#A7F3D0] via-[#BAE6FD] to-[#DDD6FE]"></div>
                <div className="absolute top-5 right-5 bg-[#DDD6FE]/20 text-indigo-900 text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#DDD6FE]/50 uppercase tracking-wide">
                  Most Popular
                </div>
                <div className="p-8 pb-0 relative">
                  <div className="w-12 h-12 rounded-xl bg-[#DDD6FE]/30 flex items-center justify-center mb-6 text-violet-700">
                    <Sparkles className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Pro
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 h-10 leading-relaxed">
                    Unlock AI superpowers.
                  </p>
                  <div className="relative h-20 mb-1 w-full">
                    <div className={`absolute left-0 top-0 flex items-baseline gap-1 transition-all duration-500 ease-out transform origin-top ${!isYearly ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
                      <span className="text-5xl font-semibold tracking-tight text-gray-900">
                        $6
                      </span>
                      <span className="text-base font-medium text-gray-500">/mo</span>
                    </div>
                    <div className={`absolute left-0 top-0 flex flex-col items-start transition-all duration-500 ease-out transform origin-top ${isYearly ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-semibold tracking-tight text-gray-900">
                          $4
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          /mo
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-500 font-medium">
                          Billed annually at $48
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#A7F3D0] text-emerald-800 tracking-wide uppercase">
                          Save $24
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gray-900 text-white rounded-xl py-2.5 text-sm font-medium shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 transition-all hover:translate-y-px">
                    Start 7-Day Free Trial
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3 font-medium">
                    No credit card required
                  </p>
                </div>
                <div className="p-8 bg-gray-50 mt-6 flex-1 border-t border-gray-100">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-sm text-gray-900">
                      <div className="w-4 h-4 rounded-full bg-[#DDD6FE] flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-gray-900 stroke-[3]" />
                      </div>
                      <span className="font-medium">Everything in Free</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-violet-500 stroke-[2] mt-0.5" />
                      Unlimited bookmarks
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-violet-500 stroke-[2] mt-0.5" />
                      Unlimited collections
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-violet-500 stroke-[2] mt-0.5" />
                      <strong>Semantic Search</strong> (Search by meaning)
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-violet-500 stroke-[2] mt-0.5" />
                      <strong>Discovery AI</strong> (Find connections)
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-violet-500 stroke-[2] mt-0.5" />
                      Export & Backup
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gray-400 stroke-[1.5]" />
                7-day free trial
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gray-400 stroke-[1.5]" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CalendarOff className="w-4 h-4 text-gray-400 stroke-[1.5]" />
                Cancel anytime
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: USE CASES (Kept) */}
        <section className="w-full relative py-24 md:py-32 px-6 md:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">
                <span className="w-2 h-2 rounded-full bg-gray-900"></span>
                Built for the way you work
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
                How LinkLens helps you
                <br />
                in different fields
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200/50">
                {[
                  { id: "students", label: "Students", icon: "🎓" },
                  { id: "researchers", label: "Researchers", icon: "🔬" },
                  { id: "educators", label: "Educators", icon: "📚" },
                  { id: "creators", label: "Content Creators", icon: "📹" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-[2rem] border border-gray-200 shadow-xl shadow-gray-100 overflow-hidden relative">
               {/* Decorative background gradient based on tab color */}
               <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 -mr-20 -mt-20 transition-colors duration-500 ${
                  activeTab === 'students' ? 'bg-emerald-300' :
                  activeTab === 'researchers' ? 'bg-violet-300' :
                  activeTab === 'educators' ? 'bg-sky-300' :
                  'bg-amber-300'
               }`}></div>

              <div className="grid md:grid-cols-2 gap-12 p-8 md:p-16 relative z-10">
                {/* Text Content */}
                <div className="flex flex-col justify-center gap-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {tabContent[activeTab].headline}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {tabContent[activeTab].description}
                    </p>
                  </div>

                  <ul className="space-y-4 my-4">
                    {tabContent[activeTab].bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                         <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            activeTab === 'students' ? 'bg-emerald-100 text-emerald-600' :
                            activeTab === 'researchers' ? 'bg-violet-100 text-violet-600' :
                            activeTab === 'educators' ? 'bg-sky-100 text-sky-600' :
                            'bg-amber-100 text-amber-600'
                         }`}>
                           <Check className="w-3.5 h-3.5 stroke-[3]" />
                         </div>
                         <span className="text-gray-700 font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2">
                    <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-gray-900/10 hover:bg-gray-800 transition-colors">
                      {tabContent[activeTab].cta}
                    </button>
                  </div>
                </div>

                {/* Visual Side */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50/50 overflow-hidden min-h-[300px] md:min-h-[400px] relative">
                   {activeTab === 'students' ? (
                      <StudentVisual />
                   ) : activeTab === 'researchers' ? (
                      <ResearcherVisual />
                   ) : activeTab === 'educators' ? (
                      <EducatorVisual />
                   ) : activeTab === 'creators' ? (
                      <CreatorVisual />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="relative group">
                          <div className={`absolute inset-0 rounded-full blur-2xl opacity-40 transition-colors duration-500 ${
                              activeTab === 'researchers' ? 'bg-violet-200' :
                              activeTab === 'educators' ? 'bg-sky-200' :
                              'bg-amber-200'
                          }`}></div>
                          <div className="relative transform transition-transform duration-500 hover:scale-110">
                            {(() => {
                              const Icon = {
                                bookmark: Bookmark,
                                search: Search,
                                layout: LayoutGrid,
                                sparkles: Sparkles
                              }[tabContent[activeTab].iconName];
                              const colorClass = {
                                bookmark: "text-emerald-200",
                                search: "text-violet-200",
                                layout: "text-sky-200",
                                sparkles: "text-amber-200"
                              }[tabContent[activeTab].iconName];
                              return <Icon className={`w-32 h-32 ${colorClass}`} strokeWidth={1} />;
                            })()}
                          </div>
                       </div>
                     </div>
                   )}
                </div>
              </div>
            </div>

            {/* Bottom Checklist */}
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-16">
              {['Cloud Sync', 'Chrome Extension', 'Mobile Ready', 'Data Export'].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-gray-900 flex items-center justify-center text-white shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ */}
        <section className="w-full relative py-24 md:py-32 px-6 md:px-12 bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">
                FAQs
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              {/* Left Column */}
              <div className="flex flex-col gap-4">
                {leftFaqs.map((item) => (
                  <div key={item.id} className="border-b border-gray-200/60 pb-2">
                    <button
                      className="w-full py-4 flex items-start justify-between text-left focus:outline-none group"
                      onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                    >
                      <span className={`text-base font-medium transition-colors pr-4 ${openFaq === item.id ? 'text-indigo-600' : 'text-gray-900 group-hover:text-gray-600'}`}>
                        {item.q}
                      </span>
                      <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300 ${
                        openFaq === item.id 
                          ? 'bg-indigo-600 border-indigo-600 text-white rotate-45' 
                          : 'bg-white border-gray-200 text-gray-400 group-hover:border-indigo-200 group-hover:text-indigo-400'
                      }`}>
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${
                        openFaq === item.id ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm text-gray-600 leading-relaxed pr-8">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-4">
                {rightFaqs.map((item) => (
                  <div key={item.id} className="border-b border-gray-200/60 pb-2">
                    <button
                      className="w-full py-4 flex items-start justify-between text-left focus:outline-none group"
                      onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                    >
                      <span className={`text-base font-medium transition-colors pr-4 ${openFaq === item.id ? 'text-indigo-600' : 'text-gray-900 group-hover:text-gray-600'}`}>
                        {item.q}
                      </span>
                      <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300 ${
                        openFaq === item.id 
                          ? 'bg-indigo-600 border-indigo-600 text-white rotate-45' 
                          : 'bg-white border-gray-200 text-gray-400 group-hover:border-indigo-200 group-hover:text-indigo-400'
                      }`}>
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${
                        openFaq === item.id ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm text-gray-600 leading-relaxed pr-8">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: FINAL CTA */}
        <section className="w-full relative py-24 md:py-32 px-6 md:px-12 bg-white">
          <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 mb-6 leading-tight">
              Start{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A7F3D0] via-[#BAE6FD] to-[#DDD6FE]">
                organizing
              </span>
              {' '}smarter today
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mb-10 font-normal leading-relaxed">
              Join hundreds of students and researchers finding their bookmarks faster with LinkLens.
            </p>

            <div className="w-full max-w-md flex flex-col gap-4">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5 placeholder-gray-400"
                />
                <button className="bg-gray-900 text-white px-6 py-3.5 rounded-xl font-medium shadow-lg shadow-gray-900/20 hover:bg-gray-800 transition-colors whitespace-nowrap">
                  Get Started Free
                </button>
              </div>
              <p className="text-sm text-gray-500 font-medium">
                No credit card required • 75 bookmarks free forever
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
              <div className="md:col-span-1">
                <div className="flex items-center gap-0.5 mb-4">
                  <img src="/logo-prism.png" alt="LinkLens" className="w-9 h-9 object-contain" />
                  <span className="text-lg font-bold tracking-tight text-gray-900 -ml-1">LinkLens</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Save, organize, and read in one place.
                </p>
                <a href="mailto:hello@linklens.com" className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                  <Mail className="w-4 h-4" />
                  hello@linklens.com
                </a>
              </div>

              {/* Links Columns */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Product</h4>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, idx) => (
                    <li key={idx}>
                      <a href={link.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Company</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, idx) => (
                    <li key={idx}>
                      <a href={link.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Social</h4>
                <ul className="space-y-3">
                  {footerLinks.social.map((link, idx) => (
                    <li key={idx}>
                      <a href={link.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-sm text-gray-400">
                © 2024 LinkLens. All rights reserved.
              </span>
              
              {/* Optional Status Dot */}
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-medium text-emerald-700">All Systems Operational</span>
              </div>

              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
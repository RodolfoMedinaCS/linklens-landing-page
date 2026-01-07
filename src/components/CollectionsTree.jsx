import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MoreHorizontal, Plus } from 'lucide-react';
import { clsx } from 'clsx';

// Tree Data Structure with Custom Icons
const TREE_DATA = [
  {
    id: 'design',
    label: 'Design Inspiration',
    iconPath: '/icons/creative/design/art-design.svg',
    isOpen: true,
    children: [
      { id: 'ui', label: 'UI Patterns', iconPath: '/icons/creative/tech/code.svg' },
      { id: 'space', label: 'Space & Sci-Fi', iconPath: '/icons/creative/space/planet-1.svg' },
    ]
  },
  {
    id: 'personal',
    label: 'Personal',
    iconPath: '/icons/creative/tech/folder.svg', // Using generic folder
    isOpen: true,
    children: [
      { id: 'recipes', label: 'Recipes to Try', iconPath: '/icons/creative/food/pizza-1.svg' },
      { id: 'pets', label: 'Cat Videos', iconPath: '/icons/creative/animals/cat.svg' }
    ]
  }
];

const TreeNode = ({ node, depth = 0, activeId, setActiveId }) => {
  const [isOpen, setIsOpen] = useState(node.isOpen);
  const hasChildren = node.children && node.children.length > 0;
  const isActive = activeId === node.id;

  return (
    <div className="select-none">
      <motion.div
        onClick={() => {
           setIsOpen(!isOpen);
           setActiveId(node.id);
        }}
        className={clsx(
          "flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all relative group",
          isActive ? "text-slate-900 shadow-sm" : "hover:bg-slate-50 text-slate-600"
        )}
        style={{ 
            paddingLeft: `${depth * 20 + 12}px`,
            background: isActive ? 'linear-gradient(120deg, #A7F3D0 0%, #BAE6FD 50%, #DDD6FE 100%)' : undefined 
        }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: depth * 0.1 }}
      >
        <button className={clsx("p-0.5 rounded hover:bg-black/5 transition-colors", !hasChildren && "invisible")}>
           <ChevronRight className={clsx("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-90", isActive ? "text-slate-700" : "text-slate-400")} />
        </button>

        <div className="w-6 h-6 flex items-center justify-center">
            <img src={node.iconPath} alt="" className="w-full h-full object-contain drop-shadow-sm" />
        </div>
        
        <span className={clsx("text-sm font-medium flex-1 truncate", isActive ? "font-semibold" : "")}>{node.label}</span>

        <MoreHorizontal className={clsx("w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity", isActive ? "text-slate-700" : "text-slate-400")} />
      </motion.div>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {node.children.map(child => (
              <TreeNode 
                key={child.id} 
                node={child} 
                depth={depth + 1} 
                activeId={activeId}
                setActiveId={setActiveId}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CollectionsTree = () => {
  const [activeId, setActiveId] = useState('ui');

  return (
    <div className="relative w-full max-w-md mx-auto h-[480px] bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden flex flex-col">
       {/* Fake Browser Header */}
       <div className="h-12 border-b border-slate-100 flex items-center px-5 justify-between bg-slate-50/50 backdrop-blur-md">
          <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-slate-200"></div>
             <div className="w-3 h-3 rounded-full bg-slate-200"></div>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Collections</span>
          <Plus className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
       </div>

       {/* Tree Area */}
       <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-200 space-y-1">
          {TREE_DATA.map(node => (
             <TreeNode 
               key={node.id} 
               node={node} 
               activeId={activeId} 
               setActiveId={setActiveId} 
             />
          ))}
          
          {/* Add New Placeholder */}
          <div className="px-3 py-2 mt-2 flex items-center gap-3 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors group border border-dashed border-slate-200 hover:border-slate-300 rounded-xl ml-7">
             <div className="w-6 h-6 flex items-center justify-center bg-slate-50 rounded-md group-hover:bg-slate-100 transition-colors">
                <Plus className="w-4 h-4" />
             </div>
             <span className="text-sm font-medium">New Collection</span>
          </div>
       </div>

       {/* Floating "Icon Cloud" Decorative Element (Bottom Right) */}
       <motion.div 
          className="absolute bottom-6 right-6"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
       >
          <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 flex flex-col gap-2 w-32">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Custom Icons</span>
             <div className="grid grid-cols-4 gap-2">
                {[
                   '/icons/creative/design/art-design.svg',
                   '/icons/creative/tech/code.svg',
                   '/icons/creative/space/planet-1.svg',
                   '/icons/creative/food/pizza-1.svg',
                   '/icons/creative/animals/cat.svg',
                   '/icons/creative/tech/folder.svg',
                   '/icons/creative/design/art-design.svg', // Repeat for filler
                   '/icons/creative/space/planet-1.svg'
                ].map((src, i) => (
                   <motion.div 
                     key={i}
                     className="w-6 h-6 bg-slate-50 rounded-md flex items-center justify-center p-1"
                     whileHover={{ scale: 1.2, backgroundColor: '#BAE6FD' }}
                   >
                      <img src={src} alt="" className="w-full h-full object-contain" />
                   </motion.div>
                ))}
             </div>
          </div>
       </motion.div>
    </div>
  );
};
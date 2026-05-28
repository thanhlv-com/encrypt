import React from 'react';
import { TOOLS, ToolCategory } from '../tools';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Monitor } from 'lucide-react';

type SidebarProps = {
  activeToolId: string;
  onToolSelect: (id: string) => void;
};

const CATEGORIES: ToolCategory[] = ['Encryption'];

export function Sidebar({ activeToolId, onToolSelect }: SidebarProps) {
  const categories: ToolCategory[] = ['Cryptography'];
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-72 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto transition-colors duration-200">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <h1 className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-500 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Encrypt
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest font-semibold">Cryptography Toolset</p>
      </div>
      <div className="p-2 space-y-4 flex-1">
        {categories.map((category) => {
          const catTools = TOOLS.filter(t => t.category === category);
          if (catTools.length === 0) return null;
          
          return (
             <div key={category}>
               <h2 className="px-3 mb-3 text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500">
                 {category}
               </h2>
               <div className="space-y-1 mb-6">
                 {catTools.map(tool => (
                   <button
                     key={tool.id}
                     className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all border-l-2 ${
                       activeToolId === tool.id 
                         ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-medium border-blue-600 dark:border-blue-500' 
                         : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                     }`}
                     onClick={() => onToolSelect(tool.id)}
                   >
                     <tool.icon className={`w-4 h-4 ${activeToolId === tool.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                     {tool.name}
                   </button>
                 ))}
               </div>
             </div>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <h3 className="px-1 mb-3 text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500">Theme</h3>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg">
          <button
            onClick={() => setTheme('light')}
            className={`flex-1 flex justify-center items-center py-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
            title="Light Mode"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTheme('system')}
            className={`flex-1 flex justify-center items-center py-1.5 rounded-md transition-colors ${theme === 'system' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
            title="System Theme"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex-1 flex justify-center items-center py-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
            title="Dark Mode"
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

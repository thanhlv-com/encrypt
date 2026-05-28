/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TOOLS } from './tools';
import { EncryptionTool } from './tools/EncryptionTool';
import { applySeoForTool } from './seo';

export default function App() {
  const [activeToolId, setActiveToolId] = useState(() => {
    const path = window.location.pathname.replace(/^\/+/, '');
    return TOOLS.find(t => t.id === path) ? path : TOOLS[0].id;
  });

  const [algoModes, setAlgoModes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const t of TOOLS) {
      if (!initial[t.algo]) initial[t.algo] = t.id;
    }
    const path = window.location.pathname.replace(/^\/+/, '');
    const currentTool = TOOLS.find(t => t.id === path) || TOOLS[0];
    initial[currentTool.algo] = currentTool.id;
    return initial;
  });

  const setTool = (id: string) => {
    setActiveToolId(id);
    const tool = TOOLS.find(t => t.id === id);
    if (tool) {
      setAlgoModes(prev => ({ ...prev, [tool.algo]: id }));
    }
  };

  const activeTool = TOOLS.find(t => t.id === activeToolId) || TOOLS[0];
  const uniqueAlgos = Array.from(new Set(TOOLS.map(t => t.algo)));

  useEffect(() => {
    const currentPath = window.location.pathname.replace(/^\/+/, '');
    if (currentPath !== activeToolId) {
      window.history.pushState(null, '', `/${activeToolId}`);
    }
  }, [activeToolId]);

  useEffect(() => {
    applySeoForTool(activeTool);
  }, [activeTool]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+/, '');
      const tool = TOOLS.find(t => t.id === path);
      if (tool) {
        setActiveToolId(tool.id);
        setAlgoModes(prev => ({ ...prev, [tool.algo]: tool.id }));
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="flex h-screen bg-[#F8F9FA] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-200">
      <Sidebar activeToolId={activeToolId} onToolSelect={setTool} />
      <main className="flex-1 flex flex-col min-w-0">
        {uniqueAlgos.map(algo => {
          const toolIdForAlgo = algoModes[algo] || TOOLS.find(t => t.algo === algo)!.id;
          const toolToPass = TOOLS.find(t => t.id === toolIdForAlgo)!;
          
          return (
            <div key={algo} className={activeTool.algo === algo ? "flex-1 flex flex-col min-h-0" : "hidden"}>
              <EncryptionTool tool={toolToPass} onSwapTool={setTool} />
            </div>
          );
        })}
      </main>
    </div>
  );
}

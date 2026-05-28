import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  return (
    <div className="flex-1 flex flex-col transition-colors duration-200">
      <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between shrink-0 transition-colors duration-200">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-[11px] text-blue-600 dark:text-blue-400 font-bold hover:underline transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

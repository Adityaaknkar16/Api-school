import React from 'react';
import { RotateCcw, ShieldCheck } from 'lucide-react';

export default function Navbar({ onReset, isResetting, progressCount, totalCount }) {
  const percentage = totalCount > 0 ? Math.round((progressCount / totalCount) * 100) : 0;

  return (
    <nav className="sticky top-0 z-50 h-16 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-white/[0.06] px-4 md:px-8 flex items-center justify-between">
      {/* Brand logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="text-sm font-bold text-white">✦</span>
        </div>
        <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
          API Playground
        </span>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center space-x-8 text-xs font-medium text-slate-400">
        {['Docs', 'GitHub', 'Get Started'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(' ', '-')}`}
            className="relative py-1 transition-colors duration-200 hover:text-white group"
          >
            {link}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-200 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* Actions (Reset and Progress Indicator) */}
      <div className="flex items-center space-x-4">
        {/* Progress indicator pill */}
        <div className="flex items-center space-x-2 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full">
          <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700/50">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 font-mono">
            {progressCount}/{totalCount} Completed
          </span>
        </div>

        {/* Reset DB Button */}
        <button
          onClick={onReset}
          disabled={isResetting}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-semibold transition-all duration-200 disabled:opacity-50"
        >
          <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Reset DB</span>
        </button>
      </div>
    </nav>
  );
}

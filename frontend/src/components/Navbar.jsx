import React from 'react';
import { RotateCcw, ShieldCheck, Sun, Moon } from 'lucide-react';

export default function Navbar({ onReset, isResetting, progressCount, totalCount, theme, setTheme }) {
  const percentage = totalCount > 0 ? Math.round((progressCount / totalCount) * 100) : 0;

  return (
    <nav className="sticky top-0 z-50 h-16 backdrop-blur-xl bg-themeBg/80 border-b border-themeBorder/80 px-4 md:px-8 flex items-center justify-between transition-colors duration-300">
      {/* Brand logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="text-sm font-bold text-white">✦</span>
        </div>
        <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          API Playground
        </span>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center space-x-8 text-xs font-medium text-themeMuted">
        {['Docs', 'GitHub', 'Get Started'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(' ', '-')}`}
            className="relative py-1 transition-colors duration-200 hover:text-themeText group"
          >
            {link}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-200 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* Actions (Reset and Progress Indicator) */}
      <div className="flex items-center space-x-4">
        {/* Progress indicator pill */}
        <div className="flex items-center space-x-2 bg-themeCard/50 border border-themeBorder px-3 py-1.5 rounded-full">
          <div className="w-16 bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-300/30 dark:border-slate-700/50">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {progressCount}/{totalCount} Completed
          </span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-1.5 rounded-full border border-themeBorder bg-themeCard/40 hover:bg-themeCard/80 text-themeMuted hover:text-themeText transition-all duration-200"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-500" />
          )}
        </button>

        {/* Reset DB Button */}
        <button
          onClick={onReset}
          disabled={isResetting}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold transition-all duration-200 disabled:opacity-50"
        >
          <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Reset DB</span>
        </button>
      </div>
    </nav>
  );
}

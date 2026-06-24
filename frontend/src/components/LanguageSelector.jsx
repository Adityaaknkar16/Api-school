import React from 'react';

const languages = [
  { id: 'javascript', label: 'JS', icon: '⚡' },
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'php', label: 'PHP', icon: '🐘' },
  { id: 'java', label: 'Java', icon: '☕' }
];

export default function LanguageSelector({ selectedLanguage, onChange }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected Language</label>
      <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.id;
          return (
            <button
              key={lang.id}
              onClick={() => onChange(lang.id)}
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 scale-105 border border-indigo-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span>{lang.icon}</span>
              <span>{lang.label}</span>
              {lang.id === 'javascript' && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" title="Executes in Browser"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

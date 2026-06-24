import React from 'react';

const operations = [
  { id: 'getAll', label: 'GET ALL', method: 'GET', activeColor: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 shadow-cyan-500/15' },
  { id: 'getOne', label: 'GET ONE', method: 'GET', activeColor: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 shadow-cyan-500/15' },
  { id: 'create', label: 'POST', method: 'POST', activeColor: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-emerald-500/15' },
  { id: 'update', label: 'PUT', method: 'PUT', activeColor: 'border-amber-500/50 bg-amber-500/10 text-amber-300 shadow-amber-500/15' },
  { id: 'delete', label: 'DELETE', method: 'DELETE', activeColor: 'border-red-500/50 bg-red-500/10 text-red-300 shadow-red-500/15' }
];

export default function OperationTabs({ selectedOperation, onChange }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Operation</label>
      <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        {operations.map((op) => {
          const isSelected = selectedOperation === op.id;
          return (
            <button
              key={op.id}
              onClick={() => onChange(op.id)}
              className={`flex-1 min-w-[75px] flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all duration-300 ${
                isSelected
                  ? `${op.activeColor} shadow-lg border scale-105`
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-[9px] font-extrabold uppercase tracking-widest opacity-80 mb-0.5">
                {op.method}
              </span>
              <span className="text-[11px] font-semibold">{op.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

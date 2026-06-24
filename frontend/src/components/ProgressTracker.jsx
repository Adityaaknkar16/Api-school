import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';

const operations = [
  { id: 'getAll', label: 'GET All Records' },
  { id: 'getOne', label: 'GET One Record' },
  { id: 'create', label: 'Create Record (POST)' },
  { id: 'update', label: 'Update Record (PUT)' },
  { id: 'delete', label: 'Delete Record (DELETE)' }
];

export default function ProgressTracker({ progress, selectedDataset }) {
  // calculate total and dataset progress
  let totalTasks = 15;
  let totalCompleted = 0;
  
  ['students', 'courses', 'teachers'].forEach(d => {
    operations.forEach(op => {
      if (progress[d]?.[op.id]) {
        totalCompleted++;
      }
    });
  });

  const overallPercentage = Math.round((totalCompleted / totalTasks) * 100);

  // current dataset statistics
  let datasetCompleted = 0;
  operations.forEach(op => {
    if (progress[selectedDataset]?.[op.id]) {
      datasetCompleted++;
    }
  });

  const datasetPercentage = Math.round((datasetCompleted / 5) * 100);

  return (
    <div className="glass-panel p-5 relative overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/45">
      {/* Decorative inner gradient glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <h3 className="text-xs font-bold text-themeText uppercase tracking-widest">Mastery Progress</h3>
        </div>
        <span className="text-xs font-mono font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
          {totalCompleted} / {totalTasks} Completed
        </span>
      </div>

      {/* Progress Bar (animated gradient) */}
      <div className="w-full bg-slate-200 dark:bg-slate-950 rounded-full h-3 mb-6 p-0.5 overflow-hidden border border-themeBorder">
        <motion.div 
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full relative" 
          initial={{ width: 0 }}
          animate={{ width: `${overallPercentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Glowing edge */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-sm rounded-full"></div>
        </motion.div>
      </div>

      {/* Operations for the selected dataset */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-themeMuted font-semibold mb-1">
          <span className="capitalize">{selectedDataset} Tasks</span>
          <span className="font-mono text-[10px] text-themeMuted">{datasetCompleted}/5 Done</span>
        </div>

        <div className="space-y-2">
          {operations.map((op) => {
            const isCompleted = progress[selectedDataset]?.[op.id];
            return (
              <motion.div
                key={op.id}
                layout
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500/5 dark:bg-emerald-950/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-300 shadow-sm'
                    : 'bg-themeCard/30 border-themeBorder/40 text-themeMuted hover:border-themeBorder'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 dark:text-emerald-400" />
                    ) : (
                      <Circle className="w-4.5 h-4.5 text-slate-400 dark:text-slate-700" />
                    )}
                  </div>
                  <span className={`text-xs font-semibold ${isCompleted ? 'text-emerald-600 dark:text-emerald-300/90' : 'text-themeMuted hover:text-themeText'}`}>
                    {op.label}
                  </span>
                </div>
                {isCompleted && (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10">
                    Done
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

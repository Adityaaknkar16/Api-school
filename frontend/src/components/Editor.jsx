import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Play, Copy, Check, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Editor({ 
  code, 
  onChange, 
  onRun, 
  isRunnable, 
  isExecuting,
  copied, 
  onCopy 
}) {
  return (
    <div className="glass-panel p-5 h-full flex flex-col shadow-xl shadow-black/30">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 block"></span>
          </div>
          <span className="text-[11px] font-bold text-slate-400 font-mono tracking-wider ml-1">sandbox.js</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Copy Button */}
          <button
            onClick={onCopy}
            className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] transition duration-200"
            title="Copy Code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Run Button */}
          {isRunnable ? (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onRun}
              disabled={isExecuting}
              className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold transition duration-200 shadow-lg shadow-indigo-500/30 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isExecuting ? 'Running...' : 'Run Code'}</span>
            </motion.button>
          ) : (
            <span className="text-[10px] px-2.5 py-1.5 bg-white/[0.02] text-slate-400 rounded-lg font-bold border border-white/[0.06]">
              Reference Code Only
            </span>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 min-h-[300px] rounded-xl overflow-hidden border border-white/[0.06] bg-black/40">
        <MonacoEditor
          height="100%"
          language={isRunnable ? 'javascript' : 'python'}
          theme="vs-dark"
          value={code}
          onChange={onChange}
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12 },
            lineNumbers: 'on',
            readOnly: !isRunnable,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6
            }
          }}
        />
      </div>
    </div>
  );
}

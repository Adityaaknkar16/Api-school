import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LanguageSelector from './components/LanguageSelector';
import OperationTabs from './components/OperationTabs';
import ProgressTracker from './components/ProgressTracker';
import Editor from './components/Editor';
import ResponsePanel from './components/ResponsePanel';
import codeTemplates from './templates/codeTemplates';
import axios from 'axios';
import { Sparkles, Terminal, Shield, Cpu, RefreshCw, Layers, Award, ArrowRight } from 'lucide-react';

export default function App() {
  const [selectedDataset, setSelectedDataset] = useState('students');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedOperation, setSelectedOperation] = useState('getAll');
  const [code, setCode] = useState('');
  
  const [response, setResponse] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  const [editorCopied, setEditorCopied] = useState(false);
  const [responseCopied, setResponseCopied] = useState(false);

  // Progress tracker state
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('api_playground_progress');
    return saved ? JSON.parse(saved) : {
      students: { getAll: false, getOne: false, create: false, update: false, delete: false },
      courses: { getAll: false, getOne: false, create: false, update: false, delete: false },
      teachers: { getAll: false, getOne: false, create: false, update: false, delete: false }
    };
  });

  // Sync templates on selector changes
  useEffect(() => {
    const template = codeTemplates[selectedLanguage]?.[selectedDataset]?.[selectedOperation];
    if (template) {
      setCode(template);
    }
  }, [selectedLanguage, selectedDataset, selectedOperation]);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  // Copy code from editor
  const copyEditorCode = () => {
    navigator.clipboard.writeText(code);
    setEditorCopied(true);
    toast.success('Code copied to clipboard!', {
      style: { background: '#111118', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.08)' }
    });
    setTimeout(() => setEditorCopied(false), 2000);
  };

  // Copy response panel content
  const copyResponseContent = (content) => {
    navigator.clipboard.writeText(content);
    setResponseCopied(true);
    toast.success('Response output copied!', {
      style: { background: '#111118', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.08)' }
    });
    setTimeout(() => setResponseCopied(false), 2000);
  };

  // Save progress to localStorage
  const updateProgress = (dataset, operation) => {
    const updated = {
      ...progress,
      [dataset]: {
        ...progress[dataset],
        [operation]: true
      }
    };
    setProgress(updated);
    localStorage.setItem('api_playground_progress', JSON.stringify(updated));

    const datasetLabel = dataset.slice(0, -1); // remove last 's'
    const opLabel = operation === 'getAll' ? 'fetched all' 
                  : operation === 'getOne' ? 'fetched single'
                  : operation === 'create' ? 'created new'
                  : operation === 'update' ? 'updated'
                  : 'deleted';

    toast.success(`You successfully ${opLabel} ${datasetLabel}! Task checked off.`, {
      icon: '🎉',
      duration: 3500,
      style: { background: '#059669', color: '#fff', fontWeight: 'bold' }
    });
  };

  // Database Reset Handler
  const handleResetDatabase = async () => {
    setIsResetting(true);
    try {
      const res = await axios.post('/api/reset');
      toast.success('Database reset to original seed data!', {
        style: { background: '#111118', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.08)' }
      });
      setResponse({
        status: res.status,
        statusText: res.statusText,
        data: res.data
      });
      
      if (window.confirm("Do you want to reset your practice progress checklist as well?")) {
        const cleared = {
          students: { getAll: false, getOne: false, create: false, update: false, delete: false },
          courses: { getAll: false, getOne: false, create: false, update: false, delete: false },
          teachers: { getAll: false, getOne: false, create: false, update: false, delete: false }
        };
        setProgress(cleared);
        localStorage.setItem('api_playground_progress', JSON.stringify(cleared));
        toast('Progress tracker reset!', { icon: '✨' });
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      toast.error(`Reset failed: ${errMsg}`);
    } finally {
      setIsResetting(false);
    }
  };

  // Executing sandbox JS in browser
  const runCode = async () => {
    setIsExecuting(true);
    const startTime = performance.now();

    let loggedData = null;
    let responseData = null;
    let responseStatus = 200;
    let responseStatusText = 'OK';

    const originalFetch = window.fetch;
    const customFetch = async (...args) => {
      try {
        const res = await originalFetch(...args);
        responseStatus = res.status;
        responseStatusText = res.statusText;

        const clone = res.clone();
        try {
          responseData = await clone.json();
        } catch (err) {
          responseData = await clone.text();
        }
        return res;
      } catch (err) {
        throw err;
      }
    };

    const customConsole = {
      log: (arg) => {
        loggedData = arg;
      },
      error: (arg) => {
        loggedData = arg;
      }
    };

    try {
      const runner = new Function('fetch', 'console', `
        return (async () => {
          ${code}
        })();
      `);

      await runner(customFetch, customConsole);
      
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      setResponseTime(duration);

      if (responseData !== null) {
        setResponse({
          status: responseStatus,
          statusText: responseStatusText,
          data: responseData
        });
        
        if (responseStatus >= 200 && responseStatus < 300) {
          updateProgress(selectedDataset, selectedOperation);
        } else {
          toast.error(`API Error: Received HTTP ${responseStatus}`, {
            style: { background: '#7f1d1d', color: '#fca5a5' }
          });
        }
      } else if (loggedData !== null) {
        setResponse({
          status: 200,
          statusText: 'OK',
          data: loggedData
        });
        updateProgress(selectedDataset, selectedOperation);
      } else {
        setResponse({
          status: 200,
          statusText: 'Success',
          data: { message: 'Code executed successfully, but nothing was returned or logged.' }
        });
      }
    } catch (err) {
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setResponse({
        isLocalError: true,
        message: err.message,
        stack: err.stack
      });
      toast.error(`Syntax or Runtime Error: ${err.message}`, {
        style: { background: '#7f1d1d', color: '#fca5a5' }
      });
    } finally {
      setIsExecuting(false);
    }
  };

  // Get total completed tasks
  let progressCount = 0;
  ['students', 'courses', 'teachers'].forEach(d => {
    ['getAll', 'getOne', 'create', 'update', 'delete'].forEach(op => {
      if (progress[d]?.[op]) progressCount++;
    });
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col font-sans antialiased overflow-x-hidden relative">
      
      {/* Toast provider */}
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Floating Animated Orbs */}
      <div className="orb w-[300px] h-[300px] bg-purple-600/10 top-[10%] left-[10%]"></div>
      <div className="orb w-[400px] h-[400px] bg-indigo-600/10 top-[40%] right-[5%]"></div>
      <div className="orb w-[250px] h-[250px] bg-blue-600/10 bottom-[15%] left-[20%]"></div>

      {/* Navbar */}
      <Navbar 
        onReset={handleResetDatabase} 
        isResetting={isResetting} 
        progressCount={progressCount} 
        totalCount={15} 
      />

      {/* HERO / LANDING SECTION */}
      <section className="relative z-10 pt-16 pb-12 px-4 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive REST API Learning Engine</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Practice <span className="shimmer-text">APIs & CRUD</span> without installing anything.
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            The fastest way for developers to learn REST API and CRUD operations — right in your browser. Select a language, write queries, and master requests in real-time.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#playground"
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/45 transition duration-200"
            >
              <span>Start Practicing</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, bg: 'rgba(255,255,255,0.06)' }}
              whileTap={{ scale: 0.98 }}
              href="#docs"
              className="px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 text-sm font-bold hover:text-white transition duration-200"
            >
              View Docs
            </motion.a>
          </div>

          {/* Stats Badges row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto pt-8">
            {[
              { label: '50 Students', icon: '👨‍🎓' },
              { label: '8 Courses', icon: '📚' },
              { label: '10 Teachers', icon: '👩‍🏫' },
              { label: '4 Languages', icon: '⚡' },
              { label: '5 Operations', icon: '🛠️' },
              { label: 'Free Forever', icon: '🎁' }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs font-semibold text-slate-400"
              >
                <span>{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CORE PLAYGROUND SECTION */}
      <section id="playground" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Control Center Panel */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          
          {/* Card-Style Dataset Selector */}
          <div className="glass-panel p-5 shadow-xl shadow-black/20">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
              Select Dataset
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'students', label: 'Students', icon: '👨‍🎓', count: '50 records' },
                { id: 'courses', label: 'Courses', icon: '📚', count: '8 records' },
                { id: 'teachers', label: 'Teachers', icon: '👩‍🏫', count: '10 records' }
              ].map((card) => {
                const isSelected = selectedDataset === card.id;
                return (
                  <button
                    key={card.id}
                    onClick={() => {
                      setSelectedDataset(card.id);
                      setResponse(null);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500 text-white shadow-lg shadow-indigo-500/15 scale-105'
                        : 'bg-white/[0.01] border-white/[0.04] text-slate-400 hover:text-slate-200 hover:border-white/[0.1]'
                    }`}
                  >
                    <span className="text-2xl mb-1">{card.icon}</span>
                    <span className="text-xs font-bold">{card.label}</span>
                    <span className="text-[9px] text-slate-500 mt-0.5">{card.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lang and CRUD Selection Card */}
          <div className="glass-panel p-5 space-y-6 shadow-xl shadow-black/20">
            <LanguageSelector 
              selectedLanguage={selectedLanguage} 
              onChange={(lang) => {
                setSelectedLanguage(lang);
                setResponse(null);
              }} 
            />
            
            <OperationTabs 
              selectedOperation={selectedOperation} 
              onChange={(op) => {
                setSelectedOperation(op);
                setResponse(null);
              }} 
            />
          </div>

          {/* Achievement Progress Checklist */}
          <ProgressTracker progress={progress} selectedDataset={selectedDataset} />

        </div>

        {/* Right Split Panel - Editor + Response Terminal */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:h-[calc(100vh-140px)]">
          <div className="h-full">
            <Editor 
              code={code}
              onChange={handleEditorChange}
              onRun={runCode}
              isRunnable={selectedLanguage === 'javascript'}
              isExecuting={isExecuting}
              copied={editorCopied}
              onCopy={copyEditorCode}
            />
          </div>

          <div className="h-full">
            <ResponsePanel 
              response={response}
              responseTime={responseTime}
              copied={responseCopied}
              onCopy={copyResponseContent}
            />
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="mt-24 border-t border-white/[0.06] bg-[#08080c] py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 rounded bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-xs font-bold text-white">✦</span>
              </div>
              <span className="text-sm font-bold text-white">API Playground</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Practice REST APIs and CRUD commands directly inside your browser. Built to help developers master server endpoints with zero local installations.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-between gap-4">
            <div className="flex space-x-6 text-xs text-slate-400 font-semibold">
              <a href="#github" className="hover:text-white transition">GitHub</a>
              <a href="#twitter" className="hover:text-white transition">Twitter</a>
              <a href="#docs" className="hover:text-white transition">Docs</a>
            </div>
            <p className="text-[11px] text-slate-600">
              &copy; {new Date().getFullYear()} API Playground. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import { Terminal, Copy, Check, Zap, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResponsePanel({ response, responseTime, copied, onCopy }) {
  const hasResponse = !!response;
  const [hideSecrets, setHideSecrets] = useState(true);
  
  let isSuccess = false;
  let statusText = '';
  let statusCode = null;

  if (hasResponse) {
    statusCode = response.status;
    isSuccess = statusCode >= 200 && statusCode < 300;
    statusText = response.statusText || (isSuccess ? 'OK' : 'Error');
  }

  // Helper to recursively mask sensitive fields
  const maskSensitiveData = (obj) => {
    if (obj === null || obj === undefined) return obj;
    if (Array.isArray(obj)) {
      return obj.map(maskSensitiveData);
    }
    if (typeof obj === 'object') {
      const masked = {};
      for (const [k, v] of Object.entries(obj)) {
        if (typeof v === 'string' && /password|token|secret|key|email|phone|auth/i.test(k)) {
          if (k.toLowerCase() === 'email' && v.includes('@')) {
            const [local, domain] = v.split('@');
            masked[k] = local.length > 2 ? `${local.slice(0, 2)}••••@${domain}` : `••••@${domain}`;
          } else if (k.toLowerCase() === 'phone') {
            masked[k] = v.length > 4 ? `••••••${v.slice(-4)}` : '••••••••';
          } else {
            masked[k] = '••••••••';
          }
        } else if (typeof v === 'object') {
          masked[k] = maskSensitiveData(v);
        } else {
          masked[k] = v;
        }
      }
      return masked;
    }
    return obj;
  };

  // Regex JSON Syntax Highlighter (using CSS classes mapped to variables)
  const highlightJSON = (jsonString) => {
    if (!jsonString) return '';
    // Escape HTML special chars
    let escaped = jsonString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return escaped.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = 'json-number'; // Number default
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'json-key'; // Key
          } else {
            cls = 'json-string'; // String
          }
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean'; // Boolean
        } else if (/null/.test(match)) {
          cls = 'json-null'; // Null
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  };

  const getResponseBodyHtml = () => {
    if (!hasResponse) {
      return '<span class="text-themeMuted">// Run your JavaScript code to see response outputs here...</span>';
    }
    
    if (response.isLocalError) {
      return `<span class="text-red-600 dark:text-red-400">/* Local Execution Error */\n${response.message}\n${response.stack || ''}</span>`;
    }

    try {
      const dataToDisplay = hideSecrets ? maskSensitiveData(response.data) : response.data;
      const jsonStr = JSON.stringify(dataToDisplay, null, 2);
      return highlightJSON(jsonStr);
    } catch (err) {
      return String(response.data);
    }
  };

  return (
    <div className="glass-panel p-5 h-full flex flex-col shadow-xl shadow-black/5 dark:shadow-black/30">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-themeBorder mb-4">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <span className="text-xs font-bold text-themeText uppercase tracking-widest">Response Console</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasResponse && !response.isLocalError && (
            <>
              {/* Hide/Show Secrets Toggle */}
              <button
                onClick={() => setHideSecrets(!hideSecrets)}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 ${
                  hideSecrets 
                    ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20' 
                    : 'bg-themeCard/40 hover:bg-themeCard/80 text-themeMuted hover:text-themeText border-themeBorder'
                }`}
                title={hideSecrets ? "Show Secrets" : "Hide Secrets"}
              >
                {hideSecrets ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Secrets Hidden</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Show Secrets</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onCopy(JSON.stringify(hideSecrets ? maskSensitiveData(response.data) : response.data, null, 2))}
                className="p-2 rounded-lg bg-themeCard/40 hover:bg-themeCard/80 text-themeMuted hover:text-themeText border border-themeBorder transition duration-200"
                title="Copy Output"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Meta Row */}
      <AnimatePresence mode="wait">
        {hasResponse && !response.isLocalError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap items-center gap-3 px-4 py-2 rounded-xl bg-themeCard/30 border border-themeBorder mb-4 text-xs"
          >
            <div className="flex items-center space-x-2">
              <span className="text-themeMuted font-semibold">Status:</span>
              <span className={`flex items-center space-x-1.5 font-bold px-2 py-0.5 rounded-full text-[10px] ${
                isSuccess 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                  : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isSuccess ? 'bg-emerald-500 dark:bg-emerald-400 animate-pulse' : 'bg-red-500 dark:bg-red-400'} inline-block`}></span>
                <span>{statusCode} {statusText}</span>
              </span>
            </div>
            {responseTime && (
              <div className="flex items-center space-x-1.5 border-l border-themeBorder pl-3">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                <span className="text-themeMuted font-semibold">Time:</span>
                <span className="font-bold text-amber-500 font-mono">{responseTime} ms</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Response Display */}
      <div className="w-full h-[480px] rounded-xl overflow-auto bg-themeConsole border border-themeBorder p-4">
        <pre className="text-xs leading-relaxed font-mono whitespace-pre-wrap break-all">
          <code dangerouslySetInnerHTML={{ __html: getResponseBodyHtml() }} />
        </pre>
      </div>
    </div>
  );
}

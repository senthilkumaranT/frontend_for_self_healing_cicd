import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Copy, Check, Trash2 } from 'lucide-react';

export default function AgentTerminal({ logsByStage, activeStage }) {
  const [activeTab, setActiveTab] = useState('all');
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef(null);

  // Auto scroll to bottom when new logs arrive
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logsByStage, activeTab]);

  // Sync active tab with running stage
  useEffect(() => {
    if (activeStage && activeStage !== 'github_pr') {
      setActiveTab(activeStage);
    }
  }, [activeStage]);

  // Combine all logs in order
  const getAllLogs = () => {
    const order = ['github_action', 'webhook', 'error_analyzer', 'code_fixer', 'test_runner', 'pr_creator', 'github_pr'];
    return order
      .map(stage => logsByStage[stage])
      .filter(log => log)
      .join('\n\n');
  };

  const getActiveLogs = () => {
    if (activeTab === 'all') {
      return getAllLogs() || '> Pipeline idle. Click "Trigger Webhook" to begin...';
    }
    return logsByStage[activeTab] || `> No logs available for ${activeTab.replace('_', ' ')}.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveLogs());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert terminal codes or prefixes to rich colored HTML
  const formatLogContent = (text) => {
    if (!text) return '';
    return text.split('\n').map((line, i) => {
      let colorClass = 'text-slate-300';
      if (line.startsWith('❌') || line.startsWith('Error:') || line.includes('FAILED')) {
        colorClass = 'text-red-400 font-semibold';
      } else if (line.startsWith('✅') || line.startsWith('🎉') || line.includes('PASSED') || line.startsWith('Success')) {
        colorClass = 'text-emerald-400 font-semibold';
      } else if (line.startsWith('🚀') || line.startsWith('📡') || line.startsWith('🔍') || line.startsWith('🛠️') || line.startsWith('🧪') || line.startsWith('📦')) {
        colorClass = 'text-blue-400 font-semibold';
      } else if (line.startsWith('---') || line.startsWith('===')) {
        colorClass = 'text-slate-500';
      } else if (line.startsWith('>') || line.startsWith('$')) {
        colorClass = 'text-cyan-400';
      }

      return (
        <div key={i} className={`${colorClass} whitespace-pre-wrap font-mono text-xs leading-5`}>
          {line}
        </div>
      );
    });
  };

  const tabs = [
    { id: 'all', label: 'All Logs' },
    { id: 'github_action', label: 'GitHub Action' },
    { id: 'webhook', label: 'Webhook' },
    { id: 'error_analyzer', label: 'Analyzer Agent' },
    { id: 'code_fixer', label: 'Code Fix Agent' },
    { id: 'test_runner', label: 'Test Agent' },
    { id: 'pr_creator', label: 'PR Creator' }
  ];

  return (
    <div className="flex flex-col h-[480px] rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <span className="text-slate-400 font-mono text-xs ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-500" />
            agent-console:~/{activeTab}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="p-1.5 rounded bg-slate-850 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
          title="Copy Console Logs"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Tabs / Filter Row */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 overflow-x-auto custom-scrollbar">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          const hasLogs = logsByStage[tab.id] || (tab.id === 'all' && getAllLogs());
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap cursor-pointer transition-all ${
                isSelected 
                  ? 'border-blue-500 text-blue-400 bg-slate-950' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
              } ${hasLogs && !isSelected ? 'text-slate-300 font-semibold' : ''}`}
            >
              {tab.label}
              {hasLogs && tab.id !== 'all' && (
                <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Terminal Display */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono bg-slate-950/90 text-left">
        <div className="space-y-1">
          {formatLogContent(getActiveLogs())}
          {/* Pulsing cursor if active stage is executing in this tab */}
          {activeStage === activeTab && (
            <div className="text-emerald-400 text-xs font-mono cursor-blink mt-1">
              &gt;_
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}

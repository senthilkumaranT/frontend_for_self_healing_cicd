import React from 'react';
import { 
  Play, 
  Webhook, 
  Cpu, 
  Wrench, 
  CheckSquare, 
  GitPullRequest, 
  ExternalLink 
} from 'lucide-react';

const STAGES = [
  {
    id: 'github_action',
    label: 'GitHub Action',
    sublabel: 'Build & Test',
    icon: Play,
  },
  {
    id: 'webhook',
    label: 'Webhook',
    sublabel: 'Event Listener',
    icon: Webhook,
  },
  {
    id: 'error_analyzer',
    label: 'Error Analyzer',
    sublabel: 'Llama-3 Agent',
    icon: Cpu,
  },
  {
    id: 'code_fixer',
    label: 'Code Fixer',
    sublabel: 'Llama-3 Agent',
    icon: Wrench,
  },
  {
    id: 'test_runner',
    label: 'Test Agent',
    sublabel: 'Verifier',
    icon: CheckSquare,
  },
  {
    id: 'pr_creator',
    label: 'PR Creator',
    sublabel: 'GitHub Agent',
    icon: GitPullRequest,
  },
  {
    id: 'github_pr',
    label: 'GitHub PR',
    sublabel: 'Final Merged PR',
    icon: ExternalLink,
  }
];

export default function PipelineFlow({ currentStage, stageStatuses }) {
  const getStatusStyles = (id) => {
    const status = stageStatuses[id] || 'idle';
    
    if (id === currentStage) {
      if (status === 'failed') return 'bg-red-950/80 border-red-500 text-red-400 glow-pulse-red';
      if (status === 'success') return 'bg-emerald-950/80 border-emerald-500 text-emerald-400 glow-pulse-green';
      return 'bg-blue-950/80 border-blue-500 text-blue-400 glow-pulse-blue';
    }

    switch (status) {
      case 'success':
        return 'bg-emerald-950/40 border-emerald-600/60 text-emerald-400';
      case 'failed':
        return 'bg-red-950/40 border-red-600/60 text-red-400';
      case 'running':
        return 'bg-blue-950/60 border-blue-500 text-blue-400 glow-pulse-blue';
      case 'idle':
      default:
        return 'bg-slate-900/40 border-slate-700/60 text-slate-500';
    }
  };

  const getConnectionLineColor = (id, index) => {
    if (index >= STAGES.length - 1) return 'stroke-slate-800';
    const nextStage = STAGES[index + 1].id;
    const currentStatus = stageStatuses[id];
    const nextStatus = stageStatuses[nextStage];

    if (currentStatus === 'success' && (nextStatus === 'running' || nextStatus === 'success')) {
      return 'stroke-blue-500';
    }
    if (currentStatus === 'success' && nextStatus === 'failed') {
      return 'stroke-red-500';
    }
    if (currentStatus === 'success') {
      return 'stroke-emerald-600';
    }
    if (currentStatus === 'failed') {
      return 'stroke-red-500';
    }
    return 'stroke-slate-800';
  };

  return (
    <div className="w-full glass-panel rounded-xl p-6 overflow-x-auto custom-scrollbar">
      <h2 className="text-slate-200 text-sm font-semibold tracking-wider uppercase mb-6 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
        Live Pipeline Orchestrator Flow
      </h2>

      <div className="min-w-[900px] relative flex justify-between items-center py-6 px-4">
        {/* SVG connection lines in the background */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 pointer-events-none px-16">
          <svg className="w-full h-8 overflow-visible" style={{ position: 'absolute', top: '-12px', left: 0 }}>
            {STAGES.slice(0, -1).map((stage, i) => {
              const widthPct = 100 / (STAGES.length - 1);
              const startX = `${i * widthPct + 5}%`;
              const endX = `${(i + 1) * widthPct - 5}%`;
              const status = stageStatuses[stage.id];
              const isFlowing = status === 'success' && (stageStatuses[STAGES[i + 1].id] === 'running' || stageStatuses[STAGES[i + 1].id] === 'success');
              
              return (
                <line
                  key={`line-${stage.id}`}
                  x1={startX}
                  y1="50%"
                  x2={endX}
                  y2="50%"
                  strokeWidth="2.5"
                  className={`${getConnectionLineColor(stage.id, i)} ${isFlowing ? 'animate-flow-line' : ''}`}
                />
              );
            })}
          </svg>
        </div>

        {/* Pipeline Nodes */}
        {STAGES.map((stage, index) => {
          const IconComponent = stage.icon;
          const status = stageStatuses[stage.id] || 'idle';
          const isActive = stage.id === currentStage;

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center flex-1">
              <div 
                className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all duration-300 ${getStatusStyles(stage.id)}`}
              >
                <IconComponent className={`w-6 h-6 ${isActive && status === 'running' ? 'animate-pulse' : ''}`} />
              </div>

              <div className="text-center mt-3">
                <p className="text-xs font-semibold text-slate-200">{stage.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{stage.sublabel}</p>
              </div>

              {/* Status Badge */}
              <div className="mt-2">
                {status === 'running' && (
                  <span className="px-2 py-0.5 text-[9px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full animate-pulse">
                    RUNNING
                  </span>
                )}
                {status === 'success' && (
                  <span className="px-2 py-0.5 text-[9px] font-semibold bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 rounded-full">
                    SUCCESS
                  </span>
                )}
                {status === 'failed' && (
                  <span className="px-2 py-0.5 text-[9px] font-semibold bg-red-500/20 text-red-400 border border-red-500/30 rounded-full">
                    FAILED
                  </span>
                )}
                {status === 'idle' && (
                  <span className="px-2 py-0.5 text-[9px] font-semibold bg-slate-800/60 text-slate-500 border border-slate-700/50 rounded-full">
                    QUEUED
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

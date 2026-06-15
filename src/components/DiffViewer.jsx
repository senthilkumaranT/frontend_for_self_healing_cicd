import React from 'react';
import { FileCode, FileUp } from 'lucide-react';

export default function DiffViewer({ diffString }) {
  if (!diffString) {
    return (
      <div className="flex flex-col items-center justify-center h-[320px] rounded-xl border border-dashed border-slate-800 bg-slate-900/10 text-slate-500">
        <FileCode className="w-10 h-10 mb-2 stroke-1" />
        <p className="text-sm font-mono">No code diff generated yet.</p>
        <p className="text-xs text-slate-600 mt-1">Run the pipeline to see the self-healing code changes.</p>
      </div>
    );
  }

  const lines = diffString.split('\n');

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
      {/* Title Bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
        <FileUp className="w-4 h-4 text-emerald-400" />
        <span className="text-slate-300 font-mono text-xs font-semibold">
          diff --git a/broken_script.py b/broken_script.py
        </span>
      </div>

      {/* Diff Table */}
      <div className="overflow-x-auto overflow-y-auto max-h-[420px] custom-scrollbar bg-slate-950 p-4 font-mono text-xs text-left">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 min-w-[600px]">
          {lines.map((line, idx) => {
            let lineClass = 'text-slate-400';
            let bgClass = '';
            
            if (line.startsWith('+') && !line.startsWith('+++')) {
              lineClass = 'text-emerald-400 font-medium';
              bgClass = 'bg-emerald-950/20 w-full px-2 -mx-2 border-l-2 border-emerald-500';
            } else if (line.startsWith('-') && !line.startsWith('---')) {
              lineClass = 'text-red-400 font-medium';
              bgClass = 'bg-red-950/20 w-full px-2 -mx-2 border-l-2 border-red-500';
            } else if (line.startsWith('@@')) {
              lineClass = 'text-blue-400 font-semibold';
              bgClass = 'bg-blue-950/10 py-0.5 w-full px-2 -mx-2';
            } else if (line.startsWith('---') || line.startsWith('+++')) {
              lineClass = 'text-slate-500 font-semibold';
              bgClass = 'w-full px-2 -mx-2';
            }

            return (
              <React.Fragment key={idx}>
                {/* Line number column */}
                <div className="text-slate-600 text-right select-none pr-2 border-r border-slate-800/60 w-10">
                  {idx + 1}
                </div>
                {/* Code line column */}
                <div className={`${lineClass} ${bgClass} whitespace-pre font-mono`}>
                  {line}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

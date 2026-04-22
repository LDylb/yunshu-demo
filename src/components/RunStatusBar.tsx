import type { RunStatus } from '../types/scenario';

export function RunStatusBar({ status, logs }: { status: RunStatus; logs: string[] }) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="flex items-center justify-between px-4 py-2 text-xs">
        <span>执行状态：<b>{status}</b></span>
        <span className="text-slate-500">运行日志（最近 {logs.length} 条）</span>
      </div>
      <div className="max-h-32 overflow-y-auto border-t border-slate-100 bg-slate-950 p-3 font-mono text-xs text-emerald-300">
        {logs.length === 0 ? <div className="text-slate-400">尚未发起执行。点击“允许”后查看日志。</div> : logs.map((log, i) => <div key={`${log}-${i}`}>[{String(i + 1).padStart(2, '0')}] {log}</div>)}
      </div>
    </footer>
  );
}

import { Play, Save, RotateCcw, ShieldCheck } from 'lucide-react';
import type { RunStatus } from '../types/scenario';

interface Props {
  status: RunStatus;
  hasUnsaved: boolean;
  envLabel: string;
  onSave: () => void;
  onReset: () => void;
  onRun: () => void;
  onAllow: () => void;
}

const statusColor: Record<RunStatus, string> = {
  未运行: 'bg-slate-200 text-slate-700',
  运行中: 'bg-amber-100 text-amber-700',
  已提交: 'bg-emerald-100 text-emerald-700',
};

export function TopWorkbenchBar({ status, hasUnsaved, envLabel, onSave, onReset, onRun, onAllow }: Props) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-5">
      <div className="flex items-center gap-4 text-sm">
        <span className="rounded bg-brand-50 px-2 py-1 font-semibold text-brand-700">量子云枢</span>
        <span className="text-slate-500">实例：<b className="text-slate-700">quantum-hub-demo</b></span>
        <span className="text-slate-500">环境：<b className="text-slate-700">{envLabel}</b></span>
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusColor[status]}`}>{status}</span>
        {hasUnsaved && <span className="text-xs text-orange-600">未保存修改</span>}
      </div>
      <div className="flex items-center gap-2 text-sm">
        <button onClick={onSave} className="inline-flex items-center gap-1 rounded border border-slate-300 px-3 py-1.5 hover:bg-slate-50"><Save size={14} />保存</button>
        <button onClick={onReset} className="inline-flex items-center gap-1 rounded border border-slate-300 px-3 py-1.5 hover:bg-slate-50"><RotateCcw size={14} />重置</button>
        <button onClick={onRun} className="inline-flex items-center gap-1 rounded border border-brand-200 bg-brand-50 px-3 py-1.5 text-brand-700 hover:bg-brand-100"><Play size={14} />运行</button>
        <button onClick={onAllow} className="inline-flex items-center gap-1 rounded bg-brand-600 px-3 py-1.5 font-medium text-white hover:bg-brand-700"><ShieldCheck size={14} />允许</button>
      </div>
    </header>
  );
}

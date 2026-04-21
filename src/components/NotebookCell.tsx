import { PlayCircle } from 'lucide-react';
import type { NotebookCellData } from '../types/scenario';

interface Props {
  cell: NotebookCellData;
  index: number;
  onChange: (id: string, code: string) => void;
}

export function NotebookCell({ cell, index, onChange }: Props) {
  const lines = cell.code.split('\n');
  return (
    <article className="mb-3 rounded border border-slate-200 bg-white shadow-panel">
      <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2 text-xs text-slate-500">
        <span>Cell [{index + 1}] · {cell.title}</span>
        <button className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700"><PlayCircle size={14} />运行</button>
      </div>
      <div className="flex">
        <div className="w-10 border-r border-slate-100 bg-slate-50 px-1 py-2 text-right text-xs text-slate-400">
          {lines.map((_, i) => <div key={`${cell.id}-${i}`}>{i + 1}</div>)}
        </div>
        <textarea
          value={cell.code}
          onChange={(e) => onChange(cell.id, e.target.value)}
          className="code-scroll h-40 flex-1 resize-none bg-slate-950/95 p-3 font-mono text-xs leading-5 text-slate-100 outline-none"
        />
      </div>
    </article>
  );
}

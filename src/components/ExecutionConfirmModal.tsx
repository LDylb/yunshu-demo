interface Props {
  open: boolean;
  scenarioName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ExecutionConfirmModal({ open, scenarioName, onCancel, onConfirm }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
      <div className="w-[460px] rounded-lg bg-white p-5 shadow-2xl">
        <h3 className="mb-2 text-lg font-semibold">确认执行</h3>
        <p className="mb-4 text-sm text-slate-600">你将执行场景「{scenarioName}」的当前代码。系统会校验代码并提交量子任务。</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">取消</button>
          <button onClick={onConfirm} className="rounded bg-brand-600 px-3 py-1.5 text-sm text-white hover:bg-brand-700">允许并执行</button>
        </div>
      </div>
    </div>
  );
}

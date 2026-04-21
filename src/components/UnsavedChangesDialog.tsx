interface Props {
  open: boolean;
  targetScenarioName: string;
  onStay: () => void;
  onSaveAndSwitch: () => void;
  onDiscardAndSwitch: () => void;
}

export function UnsavedChangesDialog({ open, targetScenarioName, onStay, onSaveAndSwitch, onDiscardAndSwitch }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/30">
      <div className="w-[500px] rounded-lg bg-white p-5 shadow-2xl">
        <h3 className="mb-2 text-lg font-semibold">检测到未保存修改</h3>
        <p className="mb-4 text-sm text-slate-600">当前 Notebook 有未保存内容。是否先保存，再切换到「{targetScenarioName}」？</p>
        <div className="flex justify-end gap-2">
          <button onClick={onStay} className="rounded border border-slate-300 px-3 py-1.5 text-sm">留在当前页面</button>
          <button onClick={onDiscardAndSwitch} className="rounded border border-orange-300 px-3 py-1.5 text-sm text-orange-700">不保存并切换</button>
          <button onClick={onSaveAndSwitch} className="rounded bg-brand-600 px-3 py-1.5 text-sm text-white">保存并切换</button>
        </div>
      </div>
    </div>
  );
}

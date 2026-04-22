import type { ScenarioData } from '../types/scenario';
import { NotebookCell } from './NotebookCell';

interface Props {
  scenario: ScenarioData;
  onCodeChange: (cellId: string, code: string) => void;
}

export function NotebookEditor({ scenario, onCodeChange }: Props) {
  return (
    <section>
      <div className="mb-2 text-sm text-slate-500">输入说明：请按顺序执行 Cell，确认参数后点击“允许”发起运行。</div>
      {scenario.cells.map((cell, index) => (
        <NotebookCell key={cell.id} cell={cell} index={index} onChange={onCodeChange} />
      ))}
    </section>
  );
}

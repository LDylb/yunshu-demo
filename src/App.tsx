import { useMemo, useState } from 'react';
import { TopWorkbenchBar } from './components/TopWorkbenchBar';
import { IndustryTree } from './components/IndustryTree';
import { ScenarioMetaBar } from './components/ScenarioMetaBar';
import { NotebookEditor } from './components/NotebookEditor';
import { ExecutionConfirmModal } from './components/ExecutionConfirmModal';
import { RunStatusBar } from './components/RunStatusBar';
import { UnsavedChangesDialog } from './components/UnsavedChangesDialog';
import { defaultScenarioId, industries, scenarioMap as initialScenarioMap } from './data/mockScenarios';
import type { RunStatus, ScenarioData } from './types/scenario';

const cloneScenario = (scenario: ScenarioData): ScenarioData => structuredClone(scenario);

function App() {
  const [savedScenarioMap, setSavedScenarioMap] = useState<Record<string, ScenarioData>>(() =>
    structuredClone(initialScenarioMap),
  );
  const [activeScenarioId, setActiveScenarioId] = useState(defaultScenarioId);
  const [scenarioDraft, setScenarioDraft] = useState<ScenarioData>(() => cloneScenario(initialScenarioMap[defaultScenarioId]));
  const [expandedIndustries, setExpandedIndustries] = useState<string[]>(['finance', 'biomed']);
  const [status, setStatus] = useState<RunStatus>('未运行');
  const [logs, setLogs] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingScenarioId, setPendingScenarioId] = useState<string | null>(null);

  const hasUnsaved = useMemo(
    () => JSON.stringify(scenarioDraft.cells) !== JSON.stringify(savedScenarioMap[activeScenarioId].cells),
    [scenarioDraft.cells, activeScenarioId, savedScenarioMap],
  );

  const saveCurrent = () => {
    setSavedScenarioMap((prev) => ({ ...prev, [activeScenarioId]: cloneScenario(scenarioDraft) }));
  };

  const resetCurrent = () => {
    setScenarioDraft(cloneScenario(savedScenarioMap[activeScenarioId]));
    setStatus('未运行');
    setLogs([]);
  };

  const switchScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setScenarioDraft(cloneScenario(savedScenarioMap[scenarioId]));
    setStatus('未运行');
    setLogs([]);
  };

  const handleScenarioSelect = (scenarioId: string) => {
    if (scenarioId === activeScenarioId) return;
    if (hasUnsaved) {
      setPendingScenarioId(scenarioId);
      return;
    }
    switchScenario(scenarioId);
  };

  const executeFlow = () => {
    setShowConfirm(false);
    setStatus('运行中');
    const newLogs = ['正在校验代码', '正在加载运行环境', '正在连接量子运行时', '正在提交任务', '任务已提交'];
    setLogs(newLogs);
    setTimeout(() => setStatus('已提交'), 800);
  };

  return (
    <div className="flex h-screen flex-col bg-slate-100 text-slate-800">
      <TopWorkbenchBar
        status={status}
        hasUnsaved={hasUnsaved}
        envLabel={scenarioDraft.env}
        onSave={saveCurrent}
        onReset={resetCurrent}
        onRun={() => setStatus('运行中')}
        onAllow={() => setShowConfirm(true)}
      />

      <div className="flex min-h-0 flex-1">
        <IndustryTree
          industries={industries}
          scenarioMap={savedScenarioMap}
          activeScenarioId={activeScenarioId}
          expandedIndustries={expandedIndustries}
          onToggleIndustry={(id) =>
            setExpandedIndustries((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
          }
          onSelectScenario={handleScenarioSelect}
        />

        <main className="min-h-0 flex-1 overflow-y-auto p-4">
          <ScenarioMetaBar scenario={scenarioDraft} />
          <NotebookEditor
            scenario={scenarioDraft}
            onCodeChange={(cellId, code) => {
              setScenarioDraft((prev) => ({
                ...prev,
                cells: prev.cells.map((cell) => (cell.id === cellId ? { ...cell, code } : cell)),
              }));
            }}
          />
        </main>
      </div>

      <RunStatusBar status={status} logs={logs} />

      <ExecutionConfirmModal
        open={showConfirm}
        scenarioName={scenarioDraft.name}
        onCancel={() => setShowConfirm(false)}
        onConfirm={executeFlow}
      />

      <UnsavedChangesDialog
        open={Boolean(pendingScenarioId)}
        targetScenarioName={pendingScenarioId ? savedScenarioMap[pendingScenarioId].name : ''}
        onStay={() => setPendingScenarioId(null)}
        onSaveAndSwitch={() => {
          saveCurrent();
          if (pendingScenarioId) switchScenario(pendingScenarioId);
          setPendingScenarioId(null);
        }}
        onDiscardAndSwitch={() => {
          if (pendingScenarioId) switchScenario(pendingScenarioId);
          setPendingScenarioId(null);
        }}
      />
    </div>
  );
}

export default App;

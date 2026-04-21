import type { ScenarioData } from '../types/scenario';

export function ScenarioMetaBar({ scenario }: { scenario: ScenarioData }) {
  return (
    <section className="mb-3 rounded border border-slate-200 bg-white p-4 shadow-panel">
      <h2 className="mb-1 text-lg font-semibold text-slate-800">{scenario.name}</h2>
      <p className="mb-3 text-sm text-slate-600">{scenario.summary}</p>
      <div className="grid grid-cols-3 gap-3 text-xs text-slate-600">
        <div><span className="block text-slate-400">场景目标</span>{scenario.goal}</div>
        <div><span className="block text-slate-400">输入要求</span>{scenario.inputRequirements}</div>
        <div><span className="block text-slate-400">推荐资源</span>{scenario.resourceType}</div>
      </div>
    </section>
  );
}

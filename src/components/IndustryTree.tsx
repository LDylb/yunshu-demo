import { ChevronDown, ChevronRight, FolderTree } from 'lucide-react';
import type { IndustryData, ScenarioData } from '../types/scenario';

interface Props {
  industries: IndustryData[];
  scenarioMap: Record<string, ScenarioData>;
  activeScenarioId: string;
  expandedIndustries: string[];
  onToggleIndustry: (id: string) => void;
  onSelectScenario: (id: string) => void;
}

export function IndustryTree({ industries, scenarioMap, activeScenarioId, expandedIndustries, onToggleIndustry, onSelectScenario }: Props) {
  return (
    <aside className="w-72 border-r border-slate-200 bg-slate-50 p-3">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700"><FolderTree size={16} />场景资源管理</div>
      <div className="space-y-2 text-sm">
        {industries.map((industry) => {
          const expanded = expandedIndustries.includes(industry.id);
          return (
            <div key={industry.id} className="rounded border border-slate-200 bg-white">
              <button onClick={() => onToggleIndustry(industry.id)} className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-50">
                <span>{industry.name}</span>
                {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {expanded && (
                <div className="border-t border-slate-100 p-1">
                  {industry.scenarios.map((scenarioId) => {
                    const active = activeScenarioId === scenarioId;
                    return (
                      <button
                        key={scenarioId}
                        onClick={() => onSelectScenario(scenarioId)}
                        className={`mb-1 w-full rounded px-2 py-1.5 text-left text-xs ${active ? 'bg-brand-100 text-brand-700' : 'text-slate-600 hover:bg-slate-100'}`}
                      >
                        {scenarioMap[scenarioId].name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

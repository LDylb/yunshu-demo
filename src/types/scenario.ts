export type RunStatus = '未运行' | '运行中' | '已提交';

export interface NotebookCellData {
  id: string;
  title: string;
  code: string;
}

export interface ScenarioData {
  id: string;
  industryId: string;
  name: string;
  summary: string;
  goal: string;
  inputRequirements: string;
  resourceType: string;
  env: string;
  cells: NotebookCellData[];
}

export interface IndustryData {
  id: string;
  name: string;
  scenarios: string[];
}

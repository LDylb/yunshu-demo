import type { IndustryData, ScenarioData } from '../types/scenario';

export const industries: IndustryData[] = [
  { id: 'finance', name: '金融', scenarios: ['portfolio-opt', 'risk-pred'] },
  { id: 'biomed', name: '生物医药', scenarios: ['molecule-screen', 'protein-model'] },
];

export const scenarioMap: Record<string, ScenarioData> = {
  'portfolio-opt': {
    id: 'portfolio-opt',
    industryId: 'finance',
    name: '投资组合优化',
    summary: '使用量子近似优化算法（QAOA）对资产权重进行约束优化。',
    goal: '在收益目标下最小化波动并满足风险预算约束。',
    inputRequirements: '资产收益率矩阵、协方差矩阵、约束参数。',
    resourceType: '标准量子算力',
    env: 'Python 3.10 · Quantum Runtime',
    cells: [
      {
        id: 'c1',
        title: '导入依赖',
        code: `import numpy as np\nimport pandas as pd\nfrom quantum_hub import RuntimeClient, QAOASolver\nfrom portfolio_utils import normalize_weights, evaluate_portfolio`,
      },
      {
        id: 'c2',
        title: '加载示例数据',
        code: `returns = pd.read_csv('mock/returns.csv', index_col=0)\ncov_matrix = returns.cov().values\nmean_returns = returns.mean().values\nassets = list(returns.columns)\nprint(f'载入资产数量: {len(assets)}')`,
      },
      {
        id: 'c3',
        title: '设置模型参数',
        code: `risk_penalty = 0.35\ntarget_return = 0.11\nmax_weight = 0.30\nsolver = QAOASolver(layers=3, shots=2048, optimizer='cobyla')`,
      },
      {
        id: 'c4',
        title: '构建量子任务',
        code: `problem = solver.build_portfolio_problem(\n    mean_returns=mean_returns,\n    cov_matrix=cov_matrix,\n    target_return=target_return,\n    risk_penalty=risk_penalty,\n    max_weight=max_weight,\n)`,
      },
      {
        id: 'c5',
        title: '提交运行',
        code: `client = RuntimeClient(instance='quantum-hub-demo')\njob = client.submit(problem, backend='qh.standard.v2')\nprint('任务ID:', job.id)`,
      },
    ],
  },
  'risk-pred': {
    id: 'risk-pred',
    industryId: 'finance',
    name: '风险分类预测',
    summary: '结合量子特征映射与经典分类器进行信用风险分层。',
    goal: '提升中高风险样本识别率并保持可解释的阈值策略。',
    inputRequirements: '客户特征数据、违约标签、分层样本权重。',
    resourceType: '标准量子算力',
    env: 'Python 3.10 · Quantum Runtime',
    cells: [
      { id: 'r1', title: '导入依赖', code: `import pandas as pd\nfrom quantum_hub import RuntimeClient, FeatureMap\nfrom sklearn.svm import SVC` },
      { id: 'r2', title: '加载示例数据', code: `df = pd.read_csv('mock/credit_risk.csv')\nX = df.drop(columns=['default'])\ny = df['default']` },
      { id: 'r3', title: '设置模型参数', code: `feature_map = FeatureMap(type='zz', reps=2)\nclassifier = SVC(C=2.0, probability=True)` },
      { id: 'r4', title: '构建量子任务', code: `encoded = feature_map.encode(X.head(200))\nclassifier.fit(encoded, y.head(200))` },
      { id: 'r5', title: '提交运行', code: `runtime = RuntimeClient(instance='quantum-hub-demo')\njob = runtime.submit(classifier, backend='qh.standard.v2')\nprint(job.id)` },
    ],
  },
  'molecule-screen': {
    id: 'molecule-screen',
    industryId: 'biomed',
    name: '分子活性筛选',
    summary: '通过量子电路近似分子特征，快速筛选候选活性分子。',
    goal: '降低早期筛选成本，提高先导化合物命中率。',
    inputRequirements: '分子描述符、活性标签、筛选阈值。',
    resourceType: '标准量子算力',
    env: 'Python 3.10 · Quantum Runtime',
    cells: [
      { id: 'm1', title: '导入依赖', code: `import pandas as pd\nfrom quantum_hub import RuntimeClient, MoleculeEncoder` },
      { id: 'm2', title: '加载示例数据', code: `mols = pd.read_csv('mock/molecule_library.csv')\nX = mols.drop(columns=['active'])\ny = mols['active']` },
      { id: 'm3', title: '设置模型参数', code: `encoder = MoleculeEncoder(depth=4)\nthreshold = 0.72` },
      { id: 'm4', title: '构建量子任务', code: `quantum_feature = encoder.transform(X)\nscore = quantum_feature.mean(axis=1)` },
      { id: 'm5', title: '提交运行', code: `client = RuntimeClient(instance='quantum-hub-demo')\njob = client.submit(score, backend='qh.standard.v2')\nprint(job.id)` },
    ],
  },
  'protein-model': {
    id: 'protein-model',
    industryId: 'biomed',
    name: '蛋白结构建模',
    summary: '在约束条件下求解蛋白关键折叠路径的低能态组合。',
    goal: '缩短结构候选迭代周期，为湿实验提供高价值候选。',
    inputRequirements: '氨基酸序列、约束规则、能量函数参数。',
    resourceType: '增强量子算力',
    env: 'Python 3.10 · Quantum Runtime',
    cells: [
      { id: 'p1', title: '导入依赖', code: `from quantum_hub import RuntimeClient, FoldingSolver\nimport numpy as np` },
      { id: 'p2', title: '加载示例数据', code: `sequence = 'MKTLLILAVVVATATGAHS'\nconstraints = np.load('mock/folding_constraints.npy')` },
      { id: 'p3', title: '设置模型参数', code: `solver = FoldingSolver(depth=5, shots=4096)\nenergy_scale = 1.2` },
      { id: 'p4', title: '构建量子任务', code: `task = solver.build(sequence=sequence, constraints=constraints, energy_scale=energy_scale)` },
      { id: 'p5', title: '提交运行', code: `runtime = RuntimeClient(instance='quantum-hub-demo')\njob = runtime.submit(task, backend='qh.enhanced.v1')\nprint(job.id)` },
    ],
  },
};

export const defaultScenarioId = 'portfolio-opt';

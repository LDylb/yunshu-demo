# 量子云枢场景工作台（单页原型）

基于 React + Vite + Tailwind CSS + TypeScript + Lucide React 的桌面端单页原型，用于展示“量子云枢”核心工作台交互。

## 本地运行

```bash
npm install
npm run dev
```

生产预览：

```bash
npm run preview
```

默认访问：`http://localhost:5173/`

## 页面入口路由

- 单页入口：`/`
- React 挂载入口：`src/main.tsx`
- 主页面：`src/App.tsx`

## Mock 数据位置

- 场景与行业数据：`src/data/mockScenarios.ts`
- 类型定义：`src/types/scenario.ts`

## 主要组件说明

- `TopWorkbenchBar`：顶部全局状态栏（实例、环境、状态、保存/重置/运行/允许）
- `IndustryTree`：左侧行业/场景导航树（可折叠、场景切换）
- `ScenarioMetaBar`：场景信息条（目标、输入要求、推荐资源）
- `NotebookEditor`：Notebook 主编辑区
- `NotebookCell`：单个 Cell（行号、运行图标、可编辑代码）
- `ExecutionConfirmModal`：允许执行确认弹窗
- `UnsavedChangesDialog`：未保存切换提醒弹窗
- `RunStatusBar`：底部运行状态与日志区

## 已实现交互

1. 一级行业展开/收起
2. 二级场景切换 notebook
3. 代码区可编辑
4. 编辑后显示“未保存修改”
5. 点击【保存】清除未保存状态
6. 点击【允许】弹出确认框
7. 点击“允许并执行”进入运行状态
8. 底部日志出现执行过程反馈
9. 编辑后切换场景触发“保存后再切换”提醒


## GitHub Pages 预览说明

如果部署到 GitHub Pages 后出现空白页，通常是静态资源路径（Vite `base`）配置不正确导致。

本项目已在 `vite.config.ts` 中根据 GitHub Actions 环境自动设置 `base`：
- Actions/Pages 部署时：自动使用 `/<仓库名>/`
- 本地开发时：使用 `/`

这样可避免 Pages 地址为 `https://<user>.github.io/<repo>/` 时资源 404 引起白屏。

排查建议：
1. 打开浏览器开发者工具，查看 `Network` 是否有 `assets/*.js` 404
2. 确认 Pages 使用的是最新构建产物
3. 强制刷新（Ctrl/Cmd + Shift + R）清理缓存后重试

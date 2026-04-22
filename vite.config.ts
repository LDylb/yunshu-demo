import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubPagesDeploy = process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  base: isGitHubPagesDeploy && repoName ? `/${repoName}/` : '/',
export default defineConfig({
  plugins: [react()],
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const [owner, repoName] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const isGitHubPagesDeploy = process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_PAGES === 'true';
const isUserOrOrgPagesRepo = Boolean(owner && repoName && repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`);

const base = isGitHubPagesDeploy
  ? isUserOrOrgPagesRepo
    ? '/'
    : repoName
      ? `/${repoName}/`
      : '/'
  : '/';

export default defineConfig({
  base,
  plugins: [react()],
});

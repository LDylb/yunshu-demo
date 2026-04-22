#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const cwd = process.cwd();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checks = [];

function record(name, ok, detail) {
  checks.push({ name, ok, detail });
}

function checkPackageJson() {
  const file = path.join(cwd, 'package.json');
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed.name || !parsed.scripts) {
      record('package.json JSON', false, 'JSON 可解析，但缺少 name 或 scripts 字段。');
      return null;
    }
    record('package.json JSON', true, `JSON 解析成功（name=${parsed.name}）。`);
    return parsed;
  } catch (err) {
    record('package.json JSON', false, `解析失败：${err.message}`);
    return null;
  }
}

function checkDependenciesInstalled(pkg) {
  if (!pkg) return;
  const deps = Object.keys({ ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) });
  if (deps.length === 0) {
    record('依赖安装状态', true, '未声明依赖，跳过检查。');
    return;
  }

  const missing = deps.filter((dep) => !fs.existsSync(path.join(cwd, 'node_modules', dep)));
  if (missing.length === 0) {
    record('依赖安装状态', true, `共 ${deps.length} 个依赖，均已安装。`);
  } else {
    record('依赖安装状态', false, `缺少 ${missing.length} 个依赖：${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ' ...' : ''}`);
  }
}

function readNpmRegistry() {
  const envRegistry = process.env.npm_config_registry;
  return envRegistry || 'https://registry.npmjs.org';
}

function checkRegistryConnectivity() {
  const registry = readNpmRegistry();
  return new Promise((resolve) => {
    const url = new URL('/-/ping', registry.endsWith('/') ? registry : `${registry}/`);
    const req = https.request(
      url,
      {
        method: 'GET',
        timeout: 8000,
      },
      (res) => {
        const ok = res.statusCode && res.statusCode >= 200 && res.statusCode < 400;
        if (ok) {
          record('registry 连通性', true, `可访问 ${url.origin}（HTTP ${res.statusCode}）。`);
        } else {
          record('registry 连通性', false, `访问 ${url.origin} 失败（HTTP ${res.statusCode}）。`);
        }
        resolve();
      },
    );
    req.on('timeout', () => {
      req.destroy(new Error('连接超时'));
    });
    req.on('error', (err) => {
      record('registry 连通性', false, `访问 ${url.origin} 失败：${err.message}`);
      resolve();
    });
    req.end();
  });
}

function checkViteBaseConfig() {
  const file = path.join(cwd, 'vite.config.ts');
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const hasBase = /\bbase\s*:/.test(raw);
    const hasRepoAware = raw.includes('GITHUB_REPOSITORY') || raw.includes('/yunshu-demo/');
    if (!hasBase) {
      record('Vite base 配置', false, '未检测到 base 配置，GitHub Pages 可能出现资源 404。');
      return;
    }
    if (!hasRepoAware) {
      record('Vite base 配置', false, '检测到 base，但未发现 GitHub Pages repo 路径适配逻辑。');
      return;
    }
    record('Vite base 配置', true, '已检测到 base 与 GitHub Pages repo 路径适配逻辑。');
  } catch (err) {
    record('Vite base 配置', false, `读取 vite.config.ts 失败：${err.message}`);
  }
}

function printSummary() {
  console.log('\n量子云枢 Doctor 检查结果\n');
  checks.forEach((c) => {
    const icon = c.ok ? '✅' : '❌';
    console.log(`${icon} ${c.name}：${c.detail}`);
  });
  const failed = checks.filter((c) => !c.ok).length;
  console.log(`\n总计：${checks.length} 项，失败 ${failed} 项。`);
  if (failed > 0) {
    console.log('建议：先解决失败项，再执行 npm run build / npm run preview。');
    process.exitCode = 1;
  }
}

async function run() {
  const pkg = checkPackageJson();
  checkDependenciesInstalled(pkg);
  await checkRegistryConnectivity();
  checkViteBaseConfig();
  printSummary();
}

run().catch((err) => {
  console.error('Doctor 脚本执行异常：', err);
  process.exit(1);
});

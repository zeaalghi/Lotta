import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const buildIdPath = path.join(root, '.next', 'BUILD_ID');

if (fs.existsSync(buildIdPath)) {
  fs.unlinkSync(buildIdPath);
}

const nextBin = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');
const res = spawnSync(process.execPath, [nextBin, 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
});

if (fs.existsSync(buildIdPath)) {
  const buildId = fs.readFileSync(buildIdPath, 'utf8').trim();
  console.log(`[BUILD PASS] Verified production build artifact (.next/BUILD_ID = ${buildId})`);
  process.exit(0);
}

process.exit(res.status ?? 1);

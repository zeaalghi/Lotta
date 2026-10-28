import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

// 1. Check banned icon packages (Decision C2 / G3)
const bannedPackages = [
  'lucide-react',
  '@heroicons/react',
  'react-icons',
  '@fortawesome/fontawesome-free',
  '@fortawesome/react-fontawesome',
  '@radix-ui/react-icons',
];
const allDeps = {
  ...(pkg.dependencies ?? {}),
  ...(pkg.devDependencies ?? {}),
};

for (const banned of bannedPackages) {
  if (allDeps[banned]) {
    console.error(`[LINT FAIL] Banned icon package detected in package.json: ${banned}`);
    process.exit(1);
  }
}

// 2. Scan src/**/*.{ts,tsx,css} for decorative <svg> or Unicode emojis
function walkFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full));
    } else if (/\.(ts|tsx|css)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

const emojiRegex = /\p{Extended_Pictographic}/u;
const srcFiles = walkFiles(path.join(root, 'src'));

for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (/<svg[\s>]/i.test(content)) {
    console.error(`[LINT FAIL] Forbidden <svg> icon tag found in ${path.relative(root, file)}`);
    process.exit(1);
  }
  if (emojiRegex.test(content)) {
    console.error(`[LINT FAIL] Forbidden Unicode emoji found in ${path.relative(root, file)}`);
    process.exit(1);
  }
}

console.log(`[LINT PASS] Checked ${srcFiles.length} source files: zero icon packages, zero <svg> tags, zero emojis.`);

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('M0 E2E — Build Output & Golden Ratio CSS Contract', () => {
  const root = process.cwd();

  it('verifies .phi-grid Golden Ratio 1.618fr : 1fr and no-sidebar layout contract', () => {
    const css = fs.readFileSync(path.join(root, 'src', 'app', 'globals.css'), 'utf8');
    expect(css).toContain('1.618fr');
    expect(css).toContain('#F8F9F5');
    expect(css).toContain('#1A3A26');

    const pageTsx = fs.readFileSync(path.join(root, 'src', 'app', 'page.tsx'), 'utf8');
    const shellTsx = fs.readFileSync(path.join(root, 'src', 'components', 'LottaShell.tsx'), 'utf8');
    expect(shellTsx).toContain('Beyond the Horizon of Lombok');
    expect(pageTsx).toContain('t.heroTitle');
    expect(pageTsx).not.toContain('<aside className="sidebar');
  });
});

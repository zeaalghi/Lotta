import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import tailwindConfig from '../../tailwind.config';

interface PublicGuide {
  id: number;
  name: string;
  gender: 'female' | 'male';
  specialties: string[];
  photoUrl: string;
  [key: string]: unknown;
}

describe('M0 — Bootstrap & Forest-Sage Design Tokens + 326 Guides Privacy Audit', () => {
  const root = process.cwd();
  const guidesPath = path.join(root, 'src', 'data', 'guides.json');
  const guides: PublicGuide[] = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));

  it('C3: locks exact V5 Clean Forest & Sage color tokens in tailwind.config.ts', () => {
    const forest = (tailwindConfig.theme?.extend?.colors as Record<string, Record<string, string>>)?.forest;
    expect(forest).toBeDefined();
    expect(forest.header).toBe('#1A3A26');
    expect(forest.title).toBe('#2B4F39');
    expect(forest.primary).toBe('#5F8D70');
    expect(forest.hover).toBe('#4D775C');
    expect(forest.sage).toBe('#A8CBB8');
    expect(forest.card).toBe('#D4E4DC');
    expect(forest.pill).toBe('#E6EFEA');
    expect(forest.canvas).toBe('#F8F9F5');
    expect(forest.alt).toBe('#F1F4EE');
    expect(forest.border).toBe('#C5D6CC');
    expect(forest.input).toBe('#9AB0A3');
  });

  it('C4: verifies exact 326 DPD HPI NTB Guides count (36 Female, 290 Male)', () => {
    expect(guides.length).toBe(326);
    const femaleCount = guides.filter((g) => g.gender === 'female').length;
    const maleCount = guides.filter((g) => g.gender === 'male').length;
    expect(femaleCount).toBe(36);
    expect(maleCount).toBe(290);
  });

  it('C4: enforces strict privacy — zero private phone numbers, addresses, or KTA numbers in guides.json', () => {
    const forbiddenKeys = [
      'nomor_telepon',
      'phone',
      'telepon',
      'whatsapp',
      'wa',
      'alamat',
      'address',
      'no_kta',
      'kta',
      'email',
      'photoUrl',
    ];

    for (const guide of guides) {
      const keys = Object.keys(guide);
      for (const badKey of forbiddenKeys) {
        expect(keys).not.toContain(badKey);
      }
      expect(typeof guide.id).toBe('number');
      expect(typeof guide.name).toBe('string');
      expect(guide.name.length).toBeGreaterThan(0);
      expect(['female', 'male']).toContain(guide.gender);
      expect(Array.isArray(guide.specialties)).toBe(true);
    }
  });
});

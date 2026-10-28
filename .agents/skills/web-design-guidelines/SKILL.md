---
name: web-design-guidelines
description: Web UI guidelines covering accessibility (WCAG AA), keyboard navigation, responsive breakpoints, data tables, and form ergonomics.
---

# Web Design Guidelines Skill

Use this skill alongside `DESIGN.md` and `antislop` when building pages in `apps/web`.

## Standards
1. **Accessibility & Contrast**:
   - Body text contrast >= 4.5:1; large text and interactive borders >= 3:1.
   - All icon-only buttons must include `aria-label` and `title`.
   - Dialogs and drawers must trap focus and restore focus on close.
2. **Data Tables & Lists**:
   - Sticky headers on scrollable tables.
   - Monospace (`tabular-nums`) for codes, SKUs, quantities, and currency columns.
   - Support empty filter results with a quick "Reset filter" button.
3. **Forms & Dialogs**:
   - Label every input explicitly (`<Label htmlFor="...">`).
   - Place primary action on the bottom-right (`Simpan` / `Buat`), secondary cancel (`Batal`) to its left.
   - Confirm destructive or deactivation actions with a clear confirmation dialog explaining the impact.
4. **Responsive Layout**:
   - Desktop-first operational density (`1280px+`) with clean tablet/mobile adaptation (`768px`, `375px`) for field/scanner views.

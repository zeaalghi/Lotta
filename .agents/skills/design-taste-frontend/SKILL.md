---
name: design-taste-frontend
description: Curates visual taste, spacing rhythm, typographic scale, and layout proportions for modern web applications.
---

# Design Taste Frontend Skill

Use this skill to ensure every screen feels crafted by a senior product designer.

## Core Principles
1. **4px / 8px Spatial Grid**: Use consistent spacing steps (`gap-2`, `gap-4`, `gap-6`, `p-4`, `p-6`). Avoid arbitrary pixel values.
2. **Visual Hierarchy (3 Levels Max per Card/Section)**:
   - Primary: `text-sm font-semibold text-foreground`
   - Secondary: `text-xs text-muted-foreground`
   - Metadata / Numeric: `text-xs font-mono tabular-nums text-muted-foreground`
3. **Page Header Anatomy**:
   - Breadcrumb or section kicker on top.
   - Page Title (`text-xl font-semibold tracking-tight`) + concise 1-line subtitle on the left.
   - Primary CTA button (max 1 solid primary button per view) + secondary filter/export actions on the right.
4. **Data-First Layouts**:
   - Keep filter bars compact in a single horizontal row above data tables (`Search input` + `Status select` + `Reset button`).
   - Align numeric columns (`qty`, `price`, `percentage`) to the right (`text-right font-mono tabular-nums`).
   - Keep action columns compact on the far right with a subtle icon menu or inline quick action.

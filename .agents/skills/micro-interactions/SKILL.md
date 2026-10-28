---
name: micro-interactions
description: Enforces purposeful, fast, and responsive micro-interactions, keyboard navigation, optimistic updates, and loading feedback.
---

# Micro-Interactions Skill

Use this skill when polishing interactive elements, forms, tables, and state transitions in `apps/web`.

## Principles
1. **Speed & Restraint (120ms–200ms)**:
   - Operational software must feel instantaneous. Keep transitions between `120ms` and `200ms` with `ease-out`.
   - Never block user input with long decorative entry animations.
2. **Interactive State Completeness**:
   - Every interactive element must define distinct `default`, `hover`, `focus-visible` (accessible ring), `active` (subtle press feedback), and `disabled` states.
3. **Skeleton & Optimistic Feedback**:
   - Replace full-page spinners with structural skeletons matching table rows or cards.
   - For fast toggles (e.g., `is_active` switch, status pin), use optimistic updates with rollback on error + toast notification.
4. **Keyboard-First Ergonomics**:
   - Support `Enter` to submit, `Esc` to close dialogs/drawers, and `/` or `Ctrl+K` to focus search/barcode inputs on operational screens.

---
name: frontend-design
description: Implementation standards for Vite + React + TanStack Query/Router + Tailwind CSS + shadcn/ui components.
---

# Frontend Design & Engineering Skill

Use this skill when writing React components in `apps/web`.

## Component Rules
1. **Server State vs Client State**:
   - Use **TanStack Query** for all async API data. Never copy server data into `useState` via `useEffect`.
   - Use URL search params for table filters, pagination, and active tabs so views are shareable and reload-safe.
2. **Forms & Validation**:
   - Validate all user inputs client-side before submission and map backend validation error codes (`400`/`409`) directly to field-level error messages.
   - Disable submit buttons while `mutation.isPending` is true and show a clear loading indicator.
3. **Permission-Aware UI (RBAC)**:
   - Hide or disable create/edit/deactivate controls when the logged-in user lacks the required permission key (e.g., `master:write`), while keeping read views accessible for `*:read` roles.
4. **Component Granularity**:
   - Keep page components under ~200 lines by extracting Modals/Drawers, FilterBars, and DataTables into focused subcomponents.

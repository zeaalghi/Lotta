---
name: codebase-design
description: Enforces modular full-stack monorepo architecture, strict domain boundaries, Prisma snake_case conventions, and RBAC guard patterns.
---

# Codebase Design Skill

Use this skill when structuring backend modules (`apps/api`), frontend features (`apps/web`), or shared packages (`packages/shared`).

## 1. Database & Prisma Conventions (`apps/api/prisma`)
- **Naming**: Models in `PascalCase` (`WarehouseZone`), database tables and columns mapped to `snake_case` (`@@map("warehouse_zones")`, `@map("created_at")`).
- **Audit Columns**: Every core table includes `id` (UUID), `created_at`, `updated_at`, and `is_active` (soft-deactivate instead of hard delete unless explicitly specified in Confirmed Decisions).
- **Indexes & Constraints**: Explicitly declare composite unique constraints and foreign key indexes in `schema.prisma`.

## 2. Backend Module Design (`apps/api/src/modules/<domain>`)
Each domain module must be self-contained:
- `<domain>.controller.ts`: Thin HTTP layer, DTO validation (`class-validator` / `zod`), and `@RequirePermissions(...)` decorator.
- `<domain>.service.ts`: Pure business rules, transaction boundaries (`prisma.$transaction`), and domain error codes.
- `dto/`: Explicit Request/Response DTOs. Never leak raw Prisma internal fields unintentionally.
- `<domain>.spec.ts`: Unit tests covering happy paths, boundary conditions, and RBAC scope restrictions.

## 3. Frontend Feature Design (`apps/web/src/features/<domain>`)
- `api/`: Typed API client functions + TanStack Query hooks (`useQuery`, `useMutation` with explicit cache invalidation).
- `components/`: Domain-specific tables, dialogs, and forms.
- `pages/`: Route-level views connecting query hooks to presentational components.
- Shared UI primitives belong in `apps/web/src/components/ui/`.

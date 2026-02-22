# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Beatrice-Back is a [Strapi v5](https://strapi.io) headless CMS backend. It is a fresh installation with no custom content types or API endpoints yet — these will be added over time.

## Commands

```bash
# Development
npm run develop     # Start dev server with hot reload (admin + API)
npm run build       # Build admin panel for production
npm run start       # Start production server (no hot reload)

# Utilities
npm run strapi console # Interactive REPL with Strapi context
```

This project uses **npm** (`package-lock.json`). Do not use yarn. Strapi uses its own CLI — always use `npm run strapi <command>` rather than invoking `strapi` directly.

## Architecture

### Stack
- **Framework:** Strapi v5.36.1 (TypeScript)
- **Default DB:** SQLite (`.tmp/data.db`) — switch via `DATABASE_CLIENT` env var
- **Also supports:** MySQL, PostgreSQL (configured in `config/database.ts`)
- **Admin UI:** React 18 + styled-components (built separately from the API)

### Key Directories
- `config/` — Strapi configuration (database, server, middlewares, admin, API, plugins)
- `src/api/` — Custom content types, controllers, routes, services (currently empty)
- `src/extensions/` — Overrides for Strapi core or plugins (currently empty)
- `src/index.ts` — App lifecycle hooks (`register`, `bootstrap`)
- `dist/` — Compiled TypeScript output (do not edit manually)

### Configuration Files
| File | Purpose |
|------|---------|
| `config/database.ts` | Multi-DB config; reads `DATABASE_CLIENT` to switch between sqlite/mysql/postgres |
| `config/server.ts` | Host/port via `HOST`/`PORT` env vars |
| `config/admin.ts` | Admin JWT, API token salts, encryption keys |
| `config/middlewares.ts` | Middleware stack (logger, CORS, security, body, session, etc.) |
| `config/api.ts` | REST defaults: `defaultLimit=25`, `maxLimit=100`, `withCount=true` |

### Content Types
New content types are generated via the Strapi CLI or admin UI and land in `src/api/<name>/`. Each gets:
- `content-types/` — Schema definition (JSON)
- `controllers/`, `routes/`, `services/` — Auto-generated business logic

### Environment Variables
Copy `.env.example` to `.env`. Key variables:

```
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite        # sqlite | mysql | postgres
DATABASE_FILENAME=.tmp/data.db
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
JWT_SECRET=...
```

For MySQL/PostgreSQL, also set: `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`.

## TypeScript Notes
- Backend config (`config/`, `src/`) targets ES2019, `strict: false`
- Admin UI (`src/admin/`) targets ESNext, `strict: true`
- Both compile to `dist/` — run `yarn build` after config changes when deploying

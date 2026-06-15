# Budsjettet

A personal budgeting web app built with React, TypeScript, and Vite.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **TailwindCSS v4** with a custom OKLCH color theme
- **shadcn/ui** component library
- **TanStack Router** — file-based routing (routes live in `src/routes/`)
- **TanStack Query** — server state and data fetching
- **Supabase** — database and auth backend
- **Zustand** — client-side state management

## Getting started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

## Routing

Routes are file-based via `@tanstack/router-plugin`. Add a file under `src/routes/` and it's automatically picked up — `routeTree.gen.ts` is auto-generated on `npm run dev` or `npm run build`.

| File | Route |
|------|-------|
| `src/routes/__root.tsx` | Root layout |
| `src/routes/index.tsx` | `/` |

## Supabase

The client is initialised in `src/lib/supabase.ts` and exported as `supabase`. Import it wherever you need database or auth access:

```ts
import { supabase } from '@/lib/supabase'
```

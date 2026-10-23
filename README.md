# Shopping Web

The frontend for a small online shop, built with **Next.js** (App Router). Signed-in users can browse products, add their own, buy one through **Stripe Checkout**, and see live product updates. All data comes from the companion NestJS + Prisma API in [`../shopping-server`](../shopping-server).

## Features

- **Authentication**: sign up and log in with email and password. The JWT from the API is kept in an HTTP-only cookie, and `src/proxy.ts` redirects guests to `/login` and signed-in users away from the auth pages.
- **Product catalogue**: a product list with loading skeletons, a product detail page (`/products/[productId]`), and a status filter (all / available / sold) kept in the URL query string.
- **Create products**: a modal form validated with Zod, with an optional image upload sent as `FormData`.
- **Prices in PLN**: stored in cents and formatted for display.
- **Checkout**: a single-product Stripe Checkout session with success and cancel pages.
- **Live updates**: the `/api/products/events` route proxies the API's Server-Sent Events stream, so signed-in users see product changes (for example, a product being sold) without reloading.
- **UI**: shadcn/ui components, light/dark theme toggle, toast notifications, and a navbar with a user menu and logout.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Components, Server Actions, React Compiler) |
| UI library | [React 19](https://react.dev) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com), `tw-animate-css` |
| Components | [shadcn/ui](https://ui.shadcn.com) on [Base UI](https://base-ui.com), [Lucide](https://lucide.dev) icons |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Validation | [Zod 4](https://zod.dev), [`@t3-oss/env-nextjs`](https://env.t3.gg) for typed env variables |
| Auth helpers | [`jwt-decode`](https://github.com/auth0/jwt-decode) |
| Lint & format | [Biome](https://biomejs.dev) |
| Package manager | [pnpm](https://pnpm.io) |

**Backend** ([`shopping-server`](../shopping-server)): NestJS 11, Prisma 7 with PostgreSQL, JWT auth with argon2 password hashing, Stripe, BullMQ, and Pino logging.

## Project structure

```
src/
├── app/                 # Routes (App Router)
│   ├── (auth)/          # /login, /signup
│   ├── api/products/    # SSE proxy for live product events
│   ├── checkout/        # Stripe success / cancel pages
│   └── products/        # Product detail page
├── components/          # Shared components (navbar, modal, theme) and shadcn/ui primitives in ui/
├── features/            # Feature modules: actions, queries, schemas, components
│   ├── auth/
│   ├── checkout/
│   └── products/
├── lib/                 # API client, env, constants, helpers
└── proxy.ts             # Route protection (formerly middleware)
```

## Getting started

### Prerequisites

- Node.js 22+
- pnpm
- The [`shopping-server`](../shopping-server) API running (by default on `http://localhost:3001`)

### Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create `.env.local` with the API address:

   ```bash
   API_URL=http://localhost:3001
   ```

3. Start the dev server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Run the production build |
| `pnpm lint` | Check the code with Biome |
| `pnpm lint:write` | Check and auto-fix with Biome |
| `pnpm format` | Format the code with Biome |

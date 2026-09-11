This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploying to Cloudflare Workers (site.reveyro.co.za)

This site is deployed to **Cloudflare Workers** using the official
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) adapter — the same
hosting platform as the main Reveyro app. Because the site has interactive
forms (`/api/contact`, `/api/demo-request`), it runs as a full-stack Next.js
Worker rather than a static export.

The production domain is `https://site.reveyro.co.za` (subdomain DNS is already
in place on the `reveyro.co.za` zone). Deployment config lives in
`wrangler.jsonc`; the OpenNext build output (`.open-next/`) is gitignored.

### Preview locally in the Workers runtime

```bash
npm run preview
```

This builds the app and serves it in the same runtime used in production.

### Deploy

```bash
npm run deploy
```

`npm run deploy` runs the OpenNext Cloudflare build and then deploys to
Cloudflare. You must be authenticated with Wrangler first
(`npx wrangler login`).

> Standing rule: do **not** run `npm run deploy` without explicit approval.

### Environment variables

**Vars** (non-secret, committed in `wrangler.jsonc`):
- `PUBLIC_BASE_URL=https://site.reveyro.co.za`
- `DEMO_REQUEST_NOTIFY_EMAIL=natheers@reveyro.co.za` (request-access form)
- `CONTACT_NOTIFY_EMAIL=hello@reveyro.co.za` (contact form)

**Secrets** (never commit — set in the Cloudflare dashboard or via CLI):

```bash
npx wrangler secret put RESEND_API_KEY
```

For local preview, secret values go in a gitignored `.dev.vars` file (copy the
layout from `.env.example`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

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

## Tanstack Query

QueryProvider.tsx configures Tanstack Query in the project. I wraps around the entire app in layout.tsx in the app directory, so all child components will have access. By default layout.tsx is a server component and therefor the Query Client Provider can't be passed directly. QueryProvider.tsx is a client component and enables us to use Tanstack Query as a client side tool.

## React Leaflet and Next.js compatability

To use Leaflet inside a Next.js App Router project, we must disable server-side rendering for the map component because Leaflet depends on browser-only APIs such as window and document. If Next.js tries to load Leaflet during server rendering, it throws a “window is not defined” error. To solve this, the map is split into two components: a lightweight wrapper that is dynamically imported with ssr: false, and a separate component that contains all React-Leaflet and Leaflet logic. This ensures that Leaflet is only executed in the browser while still allowing the rest of the application to use SSR normally. Additionally, Leaflet’s default marker icons do not load correctly in modern bundlers, so the icon image paths must be manually imported and merged into Leaflet’s default configuration. Finally, some “invalid source map” warnings may appear during development due to Leaflet’s CSS source maps not being fully compatible with Turbopack, but these do not affect functionality and disappear in production builds.

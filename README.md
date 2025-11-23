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

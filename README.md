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

## Structure and seperation of concerns

Having a an organized and easy to understand folder structure makes development easier for the whole team and devs new to the project. Seperation of concerns is a fundamental principle that makes software more modular, maintainable, and easier to understand by isolating different functionalities like data management, user interface, and business logic.

## Tanstack Query

QueryProvider.tsx configures Tanstack Query in the project. It wraps around the entire app in layout.tsx in the app directory, so all child components will have access. By default layout.tsx is a server component and therefor the Query Client Provider can't be passed directly. QueryProvider.tsx is a client component and enables us to use Tanstack Query as a client side tool.

## React Leaflet and Next.js compatability

To use Leaflet inside a Next.js App Router project, it's necessary to disable server-side rendering for the map component because Leaflet depends on browser-only APIs such as window and document. If Next.js tries to load Leaflet during server rendering, it throws a “window is not defined” error. To solve this, the map is split into two components: a lightweight wrapper that is dynamically imported with ssr: false, and a separate component that contains all React-Leaflet and Leaflet logic. This ensures that Leaflet is only executed in the browser while still allowing the rest of the application to use SSR normally if needed. Finally, some “invalid source map” warnings may appear during development due to Leaflet’s CSS source maps not being fully compatible with Turbopack, but these do not affect functionality and disappear in production builds.

## Flow of latitude and longitude between components

When the user clicks on the map, the click event is handled inside MapClickHandler (within MapInner.tsx). This event captures the latitude (lat) and longitude (lon) of the clicked location and passes them to the onClick function. The onClick handler is defined in useMapClick, where it calls setLocation from the WeatherContextProvider.

The WeatherContextProvider stores the selected lat and lon in React context. Any component subscribed to this context, such as WeatherPanel, can access the current location using the useWeatherContext hook.

WeatherPanel reads the coordinates from context and triggers the useWeather hook to fetch weather data using React Query. This ensures that weather information updates reactively whenever the user selects a new location on the map.

## Use of AI

I have used AI in the developement of this project in what I believe to be a responsible manner. I have used it mostly for debugging, help with documentation and for "low hanging fruit", the tasks that don't require too much human brain power.

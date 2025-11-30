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

# World Weather

Works with the use of World Weather API. To run it locally you will need an API key from the World Weather API.

## Structure and seperation of concerns

Having a an organized and easy to understand folder structure makes development easier for the whole team and devs new to the project. Seperation of concerns is a fundamental principle that makes software more modular, maintainable, and easier to understand by isolating different functionalities like data management, user interface, and business logic.

## Tanstack Query

QueryProvider.tsx configures Tanstack Query in the project. It wraps around the entire app in layout.tsx in the app directory, so all child components will have access. By default layout.tsx is a server component and therefor the Query Client Provider can't be passed directly. QueryProvider.tsx is a client component and enables us to use Tanstack Query as a client side tool.

## React Leaflet and Next.js compatability

To use Leaflet inside a Next.js App Router project, it's necessary to disable server-side rendering for the map component because Leaflet depends on browser-only APIs such as window and document. If Next.js tries to load Leaflet during server rendering, it throws a “window is not defined” error. To solve this, the map is split into two components: a lightweight wrapper that is dynamically imported with ssr: false, and a separate component that contains all React-Leaflet and Leaflet logic. This ensures that Leaflet is only executed in the browser while still allowing the rest of the application to use SSR normally if needed.
Additionally, Leaflet’s default marker icons do not load correctly in modern bundlers, so to fix this I have used leaflet-defaulticon-compatibility.
Finally, some “invalid source map” warnings may appear during development due to Leaflet’s CSS source maps not being fully compatible with Turbopack, but these do not affect functionality and disappear in production builds.

## Flow of latitude and longitude between components

When the user clicks on the map, the click event is handled inside MapClickHandler (within MapInner.tsx). This event captures the latitude (lat) and longitude (lon) of the clicked location and passes them to the onClick function. The onClick handler is defined in useMapClick, where it calls setLocation from the WeatherContextProvider.
The WeatherContextProvider stores the selected lat and lon in React context. Any component subscribed to this context, such as WeatherPanel, can access the current location using the useWeatherContext hook. The Context Provider is wrapped aound the subscribed components in layout.tsx
WeatherPanel reads the coordinates from context and triggers the useWeather hook to fetch weather data using Tanstack Query. This ensures that weather information updates reactively whenever the user selects a new location on the map.

## SearchLocation Component

The SearchLocation component provides a location-search UI using the OpenWeather geocoding API. As the user types into the search field, the component uses a custom useLocation hook to fetch matching cities through Tanstack Query, which caches results for one hour and prevents unnecessary requests. The user can select any result, which updates the global weather context (setLocation) and the map marker context (setMarkerPosition). The component also provides loading, error, and no-result feedback and formats city/state/country values into a readable display string.

## Use of AI

I have used AI in the developement of this project in what I believe to be a responsible manner. I have used it mostly for debugging, help with documentation and for "low hanging fruit", the tasks that don't require too much human brain power, or adding styling or extra things that are nice to have but not need to have. One component that is nice to have and completly made using AI is MapHandlers.tsx. It makes a cool zoom like animation to the location which has been entered into the searchform.

## What should be improved in the future?

Search function could use some UI improvements to the dropdown and get autocomplete search.
The weather data could be improved by adding data for a few days or weeks in the future, or just more weather data in general.
The map could have a different background more suited for a weather app if desired.
UI in general could be made more elaborate if the clean look is a little too simple
Addition of unit and integration tests
Ux enhancements could include search history, favorite locations etc.
More "life" via animations

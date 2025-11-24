"use client";

import { createContext, useContext, useState } from "react";

// define type/shape of location
interface Location {
    lat: number | null;
    lon: number | null;
}

// Definition of context value and what it exposes
interface WeatherContextValue {
    location: Location;
    setLocation: (loc: Location) => void;
}

// create the context
const WeatherContext = createContext<WeatherContextValue | undefined>(
    undefined
);

// component that provides the context
export function WeatherContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [location, setLocation] = useState<Location>({
        lat: null,
        lon: null,
    });

    return (
        <WeatherContext.Provider value={{ location, setLocation }}>
            {children}
        </WeatherContext.Provider>
    );
}

// custom hook for consuming the context
export function useWeatherContext() {
    const ctx = useContext(WeatherContext);
    if (!ctx) {
        throw new Error(
            "useWeatherContext must be used within WeatherContextProvider"
        );
    }
    return ctx;
}

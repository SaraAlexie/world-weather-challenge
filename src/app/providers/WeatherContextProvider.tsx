"use client";

import { createContext, useContext, useState } from "react";

interface Location {
    lat: number | null;
    lon: number | null;
}

interface WeatherContextValue {
    location: Location;
    setLocation: (loc: Location) => void;
}

type Unit = "metric" | "imperial";

interface WeatherContextValue {
    location: Location;
    setLocation: (loc: Location) => void;
    unit: Unit;
    setUnit: (unit: Unit) => void;
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

    const [unit, setUnit] = useState<Unit>("metric");

    return (
        <WeatherContext.Provider
            value={{ location, setLocation, unit, setUnit }}
        >
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

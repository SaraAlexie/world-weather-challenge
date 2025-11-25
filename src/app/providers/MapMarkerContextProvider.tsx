"use client";

import { createContext, useContext, useState } from "react";

interface MapMarkerContextType {
    markerPosition: [number, number] | null;
    setMarkerPosition: (position: [number, number] | null) => void;
}

const MapMarkerContext = createContext<MapMarkerContextType | undefined>(
    undefined
);

export function MapMarkerContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [markerPosition, setMarkerPosition] = useState<
        [number, number] | null
    >(null);

    return (
        <MapMarkerContext.Provider
            value={{ markerPosition, setMarkerPosition }}
        >
            {children}
        </MapMarkerContext.Provider>
    );
}

export function useMapMarkerContext() {
    const ctx = useContext(MapMarkerContext);
    if (!ctx) {
        throw new Error(
            "useMapMarkerContext must be used within a MapMarkerContextProvider"
        );
    }
    return ctx;
}

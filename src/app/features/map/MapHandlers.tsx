"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useMapMarkerContext } from "../../providers/MapMarkerContextProvider";
import { useWeatherContext } from "../../providers/WeatherContextProvider";

export default function MapHandlers() {
    const map = useMap();
    const { markerPosition, setMarkerPosition } = useMapMarkerContext();
    const { location } = useWeatherContext();

    // Sync weather context location to marker position
    useEffect(() => {
        if (location.lat !== null && location.lon !== null) {
            setMarkerPosition([location.lat, location.lon]);
        }
    }, [location.lat, location.lon, setMarkerPosition]);

    // Animate map to marker position
    useEffect(() => {
        if (!map || !markerPosition) return;
        try {
            // fly to the selected marker position and set a sensible zoom
            // shorter duration for a faster animation
            map.flyTo(markerPosition as [number, number], 13, {
                animate: true,
                duration: 0.4,
            });
        } catch (err) {
            // ignore map errors
            // eslint-disable-next-line no-console
            console.error("MapHandlers error:", err);
        }
    }, [map, markerPosition]);

    return null;
}

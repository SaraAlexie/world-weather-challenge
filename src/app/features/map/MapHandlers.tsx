"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useMapMarkerContext } from "../../providers/MapMarkerContextProvider";

export default function MapHandlers() {
    const map = useMap();
    const { markerPosition } = useMapMarkerContext();

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

"use client";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";
import MapMarker from "./MapMarker";
import MapHandlers from "./MapHandlers";
import { DEFAULT_MARKER } from "../../config/defaults";
import "leaflet/dist/leaflet.css";
// fix for compatibility of default icons in Leaflet when using Next.js
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// onClick is optional for flexibility
interface MapInnerProps {
    onClick: (event: LeafletMouseEvent) => void;
}

// ensure onClick is always passed as a function from parent (Map.tsx).
function MapClickHandler({ onClick }: MapInnerProps) {
    useMapEvents({
        click: (event: LeafletMouseEvent) => {
            onClick(event);
        },
    });
    return null;
}

export default function MapInner({ onClick }: MapInnerProps) {
    return (
        <MapContainer
            center={DEFAULT_MARKER}
            zoom={13}
            className="w-full h-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapHandlers />
            <MapClickHandler onClick={onClick} />
            <MapMarker />
        </MapContainer>
    );
}

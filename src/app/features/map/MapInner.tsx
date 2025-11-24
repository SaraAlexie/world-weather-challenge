"use client";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

// onClick is optional for flexibility
interface MapInnerProps {
    onClick: (event: LeafletMouseEvent) => void;
}

// ensure onClick is always passed as a function from parent (Map.tsx).
function MapClickHandler({ onClick }: MapInnerProps) {
    useMapEvents({
        click: (event: LeafletMouseEvent) => {
            console.log("Lat:", event.latlng.lat, "Lon:", event.latlng.lng);
            onClick(event);
        },
    });
    return null;
}

export default function MapInner({ onClick }: MapInnerProps) {
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            className="h-screen w-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onClick={onClick} />
        </MapContainer>
    );
}

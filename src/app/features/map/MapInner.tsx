"use client";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapInnerProps {
    onClick: (event: LeafletMouseEvent) => void;
}

interface ClickHandlerProps {
    onClick: (event: LeafletMouseEvent) => void;
}

function MapClickHandler({ onClick }: ClickHandlerProps) {
    useMapEvents({
        click: (event: LeafletMouseEvent) => {
            console.log("Leaflet click event:", event);
            console.log("Lat:", event.latlng.lat, "Lon:", event.latlng.lng);

            onClick(event);
        },
    });
    return null; // This component only registers events
}

export default function MapInner({ onClick }: MapInnerProps) {
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "100vh", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onClick={onClick} />
        </MapContainer>
    );
}

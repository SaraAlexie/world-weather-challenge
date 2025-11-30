"use client";
import MapPanel from "./features/map/MapPanel";
import WeatherPanel from "./features/weather/WeatherPanel";

export default function Home() {
    return (
        <>
            <WeatherPanel />
            <MapPanel />
        </>
    );
}

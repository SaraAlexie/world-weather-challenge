"use client";

import Map from "./features/map/Map";
import WeatherPanel from "./features/weather/WeatherPanel";

export default function Home() {
    return (
        <>
            <h1>Weather app</h1>
            <Map />
            <WeatherPanel />
        </>
    );
}

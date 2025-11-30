"use client";
import Header from "./components/ui/Header";
import MapPanel from "./features/map/MapPanel";
import WeatherPanel from "./features/weather/WeatherPanel";

export default function Home() {
    return (
        <>
            <Header />
            <WeatherPanel />
            <MapPanel />
        </>
    );
}

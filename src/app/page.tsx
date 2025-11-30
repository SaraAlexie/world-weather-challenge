"use client";
import Header from "./components/ui/Header";
import Map from "./features/map/Map";
import WeatherPanel from "./features/weather/WeatherPanel";

export default function Home() {
    return (
        <>
            <Header />
            <WeatherPanel />
            <Map />
        </>
    );
}

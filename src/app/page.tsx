"use client";
import Header from "./components/ui/Header";
import Map from "./features/map/Map";
import WeatherPanel from "./features/weather/WeatherPanel";
import SplitLayout from "./components/ui/SplitLayout";

export default function Home() {
    return (
        <>
            <Header />
            <SplitLayout map={<Map />} panel={<WeatherPanel />} />
        </>
    );
}

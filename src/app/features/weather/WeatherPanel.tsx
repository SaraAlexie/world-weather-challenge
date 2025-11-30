"use client";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { useWeather } from "./UseWeather";
import WeatherCard from "../../components/ui/WeatherCard";
import SearchLocation from "../location/SearchLocation";
import { getWeatherTheme } from "../../styles/weatherThemes";

export default function WeatherPanel() {
    const { location, unit } = useWeatherContext();
    const { lat, lon } = location;

    // fallback dummy values (won’t trigger fetch because of `enabled`)
    // but satisfy the type requirements of useWeather
    const safeLat = lat ?? 0;
    const safeLon = lon ?? 0;

    const { data, isLoading, error } = useWeather(safeLat, safeLon, unit);

    if (lat === null || lon === null) {
        return (
            <div>
                <p className="text-sm text-gray-500">
                    Click the map to get weather data or search for a location
                </p>
                <SearchLocation />
            </div>
        );
    }
    if (isLoading) return <p>Loading weather...</p>;
    if (error) return <p>Error loading weather.</p>;
    if (!data) return <p>No data available.</p>;

    const main = data.weather?.[0]?.main;
    const theme = getWeatherTheme(main);

    return (
        <div
            className="weather-panel-bg"
            style={{ background: theme.gradient, color: theme.textColor }}
        >
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                <WeatherCard data={data} />
                <div className="shrink-0 w-full md:w-auto">
                    <SearchLocation />
                </div>
            </div>
        </div>
    );
}

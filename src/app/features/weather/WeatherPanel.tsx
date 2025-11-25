"use client";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { useWeather } from "./UseWeather";
import WeatherCard from "../../components/ui/WeatherCard";

export default function WeatherPanel() {
    const { location, unit } = useWeatherContext();
    const { lat, lon } = location;

    // fallback dummy values (won’t trigger fetch because of `enabled`)
    const safeLat = lat ?? 0;
    const safeLon = lon ?? 0;

    const { data, isLoading, error } = useWeather(safeLat, safeLon, unit);

    if (lat === null || lon === null) {
        return (
            <p className="text-sm text-gray-500">
                Click the map to get weather data.
            </p>
        );
    }
    if (isLoading) return <p>Loading weather...</p>;
    if (error) return <p>Error loading weather.</p>;
    if (!data) return <p>No data available.</p>;

    return <WeatherCard data={data} />;
}

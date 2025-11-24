"use client";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { useWeather } from "./UseWeather";

export default function WeatherPanel() {
    const { location } = useWeatherContext();
    const { lat, lon } = location;

    if (lat === null || lon === null) {
        return (
            <p className="text-sm text-gray-500">
                Click the map to get weather data.
            </p>
        );
    }

    const { data, isLoading, error } = useWeather(lat, lon);

    if (isLoading) return <p>Loading weather...</p>;
    if (error) return <p>Error loading weather.</p>;
    if (!data) return <p>No data found.</p>;

    console.log("WeatherPanel location:", lat, lon);

    return (
        <div>
            <h2>Weather Panel</h2>
            <h3>{data.coord.lon}</h3>
            <h3>{data.coord.lat}</h3>
        </div>
    );
}

"use client";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { useWeather } from "./UseWeather";
import UnitToggle from "./UnitToggle";

export default function WeatherPanel() {
    const { location, unit, setUnit } = useWeatherContext();
    const { lat, lon } = location;

    // fallback dummy values (won’t trigger fetch because of `enabled`)
    const safeLat = lat ?? 0;
    const safeLon = lon ?? 0;

    const { data, isLoading, error } = useWeather(safeLat, safeLon, unit);

    const toggleUnit = () => {
        setUnit(unit === "metric" ? "imperial" : "metric");
    };

    if (lat === null || lon === null) {
        return <p>Click the map to get weather data.</p>;
    }
    if (isLoading) return <p>Loading weather...</p>;
    if (error) return <p>Error loading weather.</p>;
    if (!data) return <p>No data available.</p>;

    data && console.log("Weather data:", data);

    return (
        <div>
            <h2>Weather Panel</h2>
            <h3>
                Location: {data.name}, {data.sys.country}
            </h3>
            <h3>Temp: {data?.main?.temp}</h3>
            <h3>Longitude: {data.coord.lon}</h3>
            <h3>Latitude: {data.coord.lat}</h3>
            <UnitToggle />
        </div>
    );
}

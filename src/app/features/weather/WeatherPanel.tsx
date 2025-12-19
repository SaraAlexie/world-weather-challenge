"use client";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { useWeather, useForecast } from "../../hooks/WeatherHooks";
import WeatherCard from "../../components/ui/WeatherCard";
import SearchLocation from "../location/SearchLocation";
import { getWeatherTheme } from "../../styles/weatherThemes";
import WeatherDetails from "./WeatherDetails";

export default function WeatherPanel() {
    const { location, unit } = useWeatherContext();
    const { lat, lon } = location;

    // Safe fallback values (hooks must always be called)
    const safeLat = lat ?? 0;
    const safeLon = lon ?? 0;

    const weather = useWeather(safeLat, safeLon, unit);
    const forecast = useForecast(safeLat, safeLon, unit);

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

    if (weather.isLoading || forecast.isLoading) {
        return <p>Loading weather...</p>;
    }

    if (weather.error || forecast.error) {
        return <p>Error loading weather.</p>;
    }

    if (!weather.data || !forecast.data) {
        return null;
    }

    const main = weather.data.weather?.[0]?.main;
    const theme = getWeatherTheme(main);

    return (
        <div
            className="weather-panel-bg"
            style={{ background: theme.gradient, color: theme.textColor }}
        >
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                {/* SearchLocation */}
                <div className="order-1 md:order-2 shrink-0 w-full md:w-auto">
                    <SearchLocation />
                </div>

                {/* Weather content */}
                <div className="order-2 md:order-1 w-full max-w-5xl mx-auto glass-card rounded-lg p-4 flex flex-col gap-32 xl:flex-row justify-center">
                    <WeatherCard
                        data={weather.data}
                        hourly={forecast.data.list}
                    />

                    <div className="xl:w-2/5">
                        <WeatherDetails data={weather.data} />
                    </div>
                </div>
            </div>
        </div>
    );
}

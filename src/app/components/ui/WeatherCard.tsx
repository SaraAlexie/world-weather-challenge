"use client";
import { WeatherData } from "../../types/weather";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import UnitToggle from "../../features/weather/UnitToggle";
import {
    WiDaySunny,
    WiCloud,
    WiRain,
    WiThunderstorm,
    WiSnow,
    WiFog,
} from "react-icons/wi";

function WeatherIcon({ main }: { main?: string }) {
    const key = (main || "").toLowerCase();
    switch (key) {
        case "clear":
            return <WiDaySunny size={86} className="text-yellow-300" />;
        case "clouds":
            return <WiCloud size={86} className="text-gray-200" />;
        case "rain":
        case "drizzle":
            return <WiRain size={86} className="text-blue-200" />;
        case "thunderstorm":
            return <WiThunderstorm size={86} className="text-purple-200" />;
        case "snow":
            return <WiSnow size={86} className="text-sky-50" />;
        case "mist":
        case "haze":
        case "fog":
            return <WiFog size={86} className="text-gray-100" />;
        default:
            return <WiDaySunny size={86} className="text-yellow-200" />;
    }
}

export default function WeatherCard({ data }: { data: WeatherData }) {
    const { unit } = useWeatherContext();
    const main = data.weather?.[0]?.main;
    const description = data.weather?.[0]?.description ?? "";

    return (
        <div>
            {/* Left: Main Info */}
            <div className="flex-1 space-y-4">
                {/* Header */}
                <div className="flex flex-row gap-2 sm:gap-3">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl sm:text-4xl font-bold truncate">
                            {data.name}, {data.sys.country}
                        </h2>
                        <p className="capitalize text-xs sm:text-base muted-text truncate">
                            {description}
                        </p>
                    </div>
                    <div className="shrink-0 self-start sm:self-center">
                        <WeatherIcon main={main} />
                    </div>
                </div>

                {/* Temperature */}
                <div className="text-7xl font-extrabold text-center">
                    {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
                </div>

                {/* Mini Metrics */}

                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-center">
                    <div>
                        <p className="font-medium text-lg muted-text">
                            Feels like
                        </p>
                        <p className="font-semibold text-2xl">
                            {Math.round(data.main.feels_like)}°
                            {unit === "metric" ? "C" : "F"}
                        </p>
                    </div>

                    <div>
                        <p className="font-medium text-lg muted-text">
                            Humidity
                        </p>
                        <p className="font-semibold text-2xl">
                            {data.main.humidity}%
                        </p>
                    </div>

                    <div>
                        <p className="font-medium text-lg muted-text">High</p>
                        <p className="font-semibold text-2xl">
                            {Math.round(data.main.temp_max)}°
                            {unit === "metric" ? "C" : "F"}
                        </p>
                    </div>

                    <div>
                        <p className="font-medium text-lg muted-text">Low</p>
                        <p className="font-semibold text-2xl">
                            {Math.round(data.main.temp_min)}°
                            {unit === "metric" ? "C" : "F"}
                        </p>
                    </div>
                </div>

                <UnitToggle />
            </div>
        </div>
    );
}

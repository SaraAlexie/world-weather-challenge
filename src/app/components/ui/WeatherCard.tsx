"use client";
import { WeatherData } from "../../types/weather";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import UnitToggle from "../../features/weather/UnitToggle";
import WeatherDetails from "./WeatherDetails";
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
        <div className="w-full max-w-md mx-auto glass-card rounded-lg p-4 sm:p-6 flex-shrink-0">
            <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg lg:text-xl font-bold truncate">
                        {data.name}, {data.sys.country}
                    </h2>
                    <p className="capitalize text-xs sm:text-sm muted-text truncate">
                        {description}
                    </p>
                </div>

                <div className="shrink-0 self-start sm:self-center">
                    <WeatherIcon main={main} />
                </div>
            </div>

            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
            </div>

            <hr className="border-white/30" />

            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                <div>
                    <p className="font-medium muted-text">Feels like</p>
                    <p className="font-semibold">
                        {Math.round(data.main.feels_like)}°
                    </p>
                </div>
                <div>
                    <p className="font-medium muted-text">Humidity</p>
                    <p className="font-semibold">{data.main.humidity}%</p>
                </div>
                <div>
                    <p className="font-medium muted-text">High</p>
                    <p className="font-semibold">
                        {Math.round(data.main.temp_max)}°
                    </p>
                </div>
                <div>
                    <p className="font-medium muted-text">Low</p>
                    <p className="font-semibold">
                        {Math.round(data.main.temp_min)}°
                    </p>
                </div>
            </div>

            <WeatherDetails data={data} />

            <UnitToggle />
        </div>
    );
}

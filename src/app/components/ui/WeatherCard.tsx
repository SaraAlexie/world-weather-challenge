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
        <div className="max-w-md w-full mx-auto glass-card rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold">{data.name}, {data.sys.country}</h2>
                    <p className="capitalize text-sm muted-text">{description}</p>
                </div>

                <div>
                    <WeatherIcon main={main} />
                </div>
            </div>

            <div className="text-5xl font-extrabold">
                {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
            </div>

            <hr className="border-white/30" />

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="font-medium muted-text">Feels like</p>
                    <p className="font-semibold">{Math.round(data.main.feels_like)}°</p>
                </div>
                <div>
                    <p className="font-medium muted-text">Humidity</p>
                    <p className="font-semibold">{data.main.humidity}%</p>
                </div>
                <div>
                    <p className="font-medium muted-text">High</p>
                    <p className="font-semibold">{Math.round(data.main.temp_max)}°</p>
                </div>
                <div>
                    <p className="font-medium muted-text">Low</p>
                    <p className="font-semibold">{Math.round(data.main.temp_min)}°</p>
                </div>
            </div>

            <UnitToggle />
        </div>
    );
}

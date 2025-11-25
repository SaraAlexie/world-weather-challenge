"use client";
import { WeatherData } from "../../types/weather";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import UnitToggle from "../../features/weather/UnitToggle";

export default function WeatherCard({ data }: { data: WeatherData }) {
    const { unit } = useWeatherContext();

    return (
        <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow p-6 space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800">
                    {data.name}, {data.sys.country}
                </h2>
                <p className="text-gray-500 capitalize text-sm">
                    {data.weather?.[0]?.description}
                </p>
            </div>

            <div className="text-5xl font-bold text-blue-600">
                {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
            </div>

            <hr className="border-gray-200" />

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                    <p className="font-medium">Feels like</p>
                    <p className="font-semibold">
                        {Math.round(data.main.feels_like)}°
                    </p>
                </div>
                <div>
                    <p className="font-medium">Humidity</p>
                    <p className="font-semibold">{data.main.humidity}%</p>
                </div>
                <div>
                    <p className="font-medium">High</p>
                    <p className="font-semibold">
                        {Math.round(data.main.temp_max)}°
                    </p>
                </div>
                <div>
                    <p className="font-medium">Low</p>
                    <p className="font-semibold">
                        {Math.round(data.main.temp_min)}°
                    </p>
                </div>
            </div>

            <UnitToggle />
        </div>
    );
}

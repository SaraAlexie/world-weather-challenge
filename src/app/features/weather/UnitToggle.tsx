"use client";
import { useWeatherContext } from "../../providers/WeatherContextProvider";

export default function UnitToggle() {
    const { unit, setUnit } = useWeatherContext();

    const toggleUnit = () => {
        setUnit(unit === "metric" ? "imperial" : "metric");
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={toggleUnit}
                className="px-4 py-2 rounded-full border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition"
            >
                Show in {unit === "metric" ? "Imperial" : "Metric"} Units
            </button>
        </div>
    );
}

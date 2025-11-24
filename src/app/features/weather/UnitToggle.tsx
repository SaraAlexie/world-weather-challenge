"use client";
import { useWeatherContext } from "../../providers/WeatherContextProvider";

export default function UnitToggle() {
    const { unit, setUnit } = useWeatherContext();

    const toggleUnit = () => {
        setUnit(unit === "metric" ? "imperial" : "metric");
    };

    return (
        <button
            onClick={toggleUnit}
            className="mt-2 mb-4 px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-100"
        >
            Show in {unit === "metric" ? "°F" : "°C"}
        </button>
    );
}

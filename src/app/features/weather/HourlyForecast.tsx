"use client";

import { HourlyForecast as HourlyForecastType } from "../../types/forecast";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import next from "next";

interface Props {
    hourly: HourlyForecastType[];
}

function formatHour(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function HourlyForecast({ hourly }: Props) {
    const { unit } = useWeatherContext();

    const nextHours = hourly.slice(0, 16); // Next 48 hours (3-hour intervals)

    return (
        <div className="mt-4 xl:max-w-96">
            <h3 className="text-sm font-semibold mb-2 px-1">Next 48 hours</h3>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/30">
                {nextHours.map((hour) => (
                    <div
                        key={hour.dt}
                        className="shrink-0 w-20 rounded-lg bg-white/20 backdrop-blur border border-white/30 p-2 text-center"
                    >
                        <p className="text-xs opacity-80">
                            {formatHour(hour.dt)}
                        </p>

                        <img
                            src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                            alt={hour.weather[0].description}
                            className="w-10 h-10 mx-auto"
                        />

                        <p className="text-sm font-semibold">
                            {Math.round(hour.main.temp)}°
                            {unit === "metric" ? "C" : "F"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

"use client";

import type { DailyForecast as DailyForecastType } from "../../types/forecast";
import { useWeatherContext } from "../../providers/WeatherContextProvider";

interface Props {
    daily: DailyForecastType[];
}

function formatDay(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleDateString([], {
        weekday: "short",
    });
}

export default function DailyForecast({ daily }: Props) {
    const { unit } = useWeatherContext();

    // Skip today, show next 7 days
    const nextDays = daily.slice(1, 8);

    return (
        <div className="space-y-2">
            {nextDays.map((day) => (
                <div
                    key={day.dt}
                    className="flex items-center justify-between rounded-lg bg-white/20 backdrop-blur border border-white/30 px-3 py-2"
                >
                    <div className="flex items-center gap-3">
                        <span className="w-10 text-sm font-medium">
                            {formatDay(day.dt)}
                        </span>

                        <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt={day.weather[0].description}
                            className="w-8 h-8"
                        />
                    </div>

                    <div className="text-sm font-semibold">
                        {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}
                        °{unit === "metric" ? "C" : "F"}
                    </div>
                </div>
            ))}
        </div>
    );
}

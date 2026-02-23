"use client";

import { useState, useMemo } from "react";
import type { ForecastResponse } from "../../types/forecast";
import type { WeatherData } from "../../types/weather";
import DailyForecast from "./DailyForecast";
import WeatherDetails from "./WeatherDetails";
import { buildDailyFromList } from "../../utils/forecast";

interface Props {
    forecast: ForecastResponse;
    weatherData: WeatherData;
}

type Tab = "daily" | "details";

export default function ForecastTabs({ forecast, weatherData }: Props) {
    const [activeTab, setActiveTab] = useState<Tab>("daily");

    // Build daily forecast from list, recomputes only when forecast changes
    const daily = useMemo(() => buildDailyFromList(forecast), [forecast]);

    return (
        <div className="mt-4">
            {/* Tabs */}
            <div className="flex gap-2 mb-3">
                <button
                    onClick={() => setActiveTab("daily")}
                    className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition
                        ${
                            activeTab === "daily"
                                ? "bg-white/90 text-gray-900"
                                : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                >
                    5-Day
                </button>
                <button
                    onClick={() => setActiveTab("details")}
                    className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition
                        ${
                            activeTab === "details"
                                ? "bg-white/90 text-gray-900"
                                : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                >
                    Details
                </button>
            </div>

            {/* Content */}
            {activeTab === "daily" ? (
                <DailyForecast daily={daily} />
            ) : (
                <WeatherDetails data={weatherData} />
            )}
        </div>
    );
}

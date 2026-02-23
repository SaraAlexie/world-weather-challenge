"use client";

import { useState, useRef, useEffect } from "react";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { useWeather, useForecast } from "../../hooks/WeatherHooks";
import WeatherCard from "../../components/ui/WeatherCard";
import SearchLocation from "../location/SearchLocation";
import { isDaytime } from "../../utils/isDaytime";
import { getWeatherTheme } from "../../styles/weatherThemes";
import ForecastTabs from "./ForecastTabs";
import { FiSearch, FiX } from "react-icons/fi";

export default function WeatherPanel() {
    const { location, unit } = useWeatherContext();
    const { lat, lon } = location;

    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Hooks must be called before any conditional returns.
    // Passing null directly — hooks bail early when coords are null (no ?? 0 fallback needed).
    const weather = useWeather(lat, lon, unit);
    const forecast = useForecast(lat, lon, unit);

    // Close search on outside click or ESC key
    useEffect(() => {
        if (!searchOpen) return;

        function handleClickOutside(e: MouseEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(e.target as Node)
            ) {
                setSearchOpen(false);
            }
        }

        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") setSearchOpen(false);
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [searchOpen]);

    if (lat === null || lon === null) {
        return (
            <div className="p-4">
                <SearchLocation />
            </div>
        );
    }

    // Derive theme as soon as weather data is available, with a neutral fallback while loading.
    const description = weather.data?.weather?.[0]?.description;
    const isDay = weather.data
        ? isDaytime(
              weather.data.dt,
              weather.data.sys.sunrise,
              weather.data.sys.sunset,
          )
        : true;
    const theme = getWeatherTheme(description, isDay);

    return (
        <div
            className="weather-panel-bg"
            style={{
                background: theme.gradient,
                color: theme.textColor,
            }}
        >
            {/* SEARCH HEADER */}
            <div className="relative z-50 w-full max-w-5xl mx-auto px-4 pt-6">
                <div className="flex justify-end">
                    <div
                        ref={searchRef}
                        className={`flex items-center justify-end transition-all duration-300 ease-in-out ${
                            searchOpen ? "w-full max-w-sm" : "w-8"
                        }`}
                    >
                        {searchOpen ? (
                            <div className="flex items-center gap-2 w-full animate-fadeIn">
                                <SearchLocation autoFocus />
                                <button
                                    onClick={() => setSearchOpen(false)}
                                    className="shrink-0 p-1 rounded-full opacity-70 hover:opacity-100 transition"
                                    aria-label="Close search"
                                >
                                    <FiX size={18} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="p-1 rounded-full opacity-70 hover:opacity-100 transition"
                                aria-label="Open search"
                            >
                                <FiSearch size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Weather content */}
            <div className="w-full max-w-5xl mx-auto glass-card rounded-lg p-4 mt-6 flex flex-col gap-8 xl:flex-row justify-center">
                {/* WeatherCard renders as soon as current weather is ready */}
                {weather.isLoading ? (
                    <WeatherCardSkeleton />
                ) : weather.error || !weather.data ? (
                    <WeatherError onRetry={() => weather.refetch()} />
                ) : (
                    <WeatherCard
                        data={weather.data}
                        hourly={forecast.data?.list ?? []}
                    />
                )}

                {/* ForecastTabs manages its own loading/error state independently */}
                <div className="xl:w-2/5">
                    {forecast.isLoading ? (
                        <ForecastSkeleton />
                    ) : forecast.error || !forecast.data ? (
                        <ForecastError onRetry={() => forecast.refetch()} />
                    ) : (
                        <ForecastTabs
                            forecast={forecast.data}
                            weatherData={weather.data!}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Skeletons ──────────────────────────────────────────────────────────────

function WeatherCardSkeleton() {
    return (
        <div className="flex-1 space-y-4 animate-pulse">
            <div className="h-10 rounded-lg bg-white/20 w-3/4" />
            <div className="h-24 rounded-lg bg-white/20 w-1/2 mx-auto" />
            <div className="grid grid-cols-2 gap-3">
                <div className="h-14 rounded-lg bg-white/20" />
                <div className="h-14 rounded-lg bg-white/20" />
                <div className="h-14 rounded-lg bg-white/20" />
                <div className="h-14 rounded-lg bg-white/20" />
            </div>
            <div className="flex gap-3 overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="shrink-0 w-20 h-20 rounded-lg bg-white/20"
                    />
                ))}
            </div>
        </div>
    );
}

function ForecastSkeleton() {
    return (
        <div className="mt-4 space-y-2 animate-pulse">
            <div className="flex gap-2 mb-3">
                <div className="flex-1 h-8 rounded-full bg-white/20" />
                <div className="flex-1 h-8 rounded-full bg-white/20" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-11 rounded-lg bg-white/20" />
            ))}
        </div>
    );
}

// ── Error states ───────────────────────────────────────────────────────────

function WeatherError({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 py-8 text-center">
            <span className="text-4xl">⚠️</span>
            <p className="text-sm font-medium opacity-90">
                Couldn't load current weather.
                <br />
                Check your connection and try again.
            </p>
            <button
                onClick={onRetry}
                className="px-4 py-1.5 rounded-full bg-white/25 border border-white/40 text-sm font-semibold hover:bg-white/35 transition"
            >
                Retry
            </button>
        </div>
    );
}

function ForecastError({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="mt-4 flex flex-col items-center justify-center gap-3 py-8 text-center">
            <span className="text-3xl">⚠️</span>
            <p className="text-sm font-medium opacity-90">
                Couldn't load forecast.
            </p>
            <button
                onClick={onRetry}
                className="px-4 py-1.5 rounded-full bg-white/25 border border-white/40 text-sm font-semibold hover:bg-white/35 transition"
            >
                Retry
            </button>
        </div>
    );
}

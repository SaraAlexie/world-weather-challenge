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
    // Fallback to 0 is safe — the null check below prevents rendering until valid coords exist.
    const weather = useWeather(lat ?? 0, lon ?? 0, unit);
    const forecast = useForecast(lat ?? 0, lon ?? 0, unit);

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

    if (weather.isLoading || forecast.isLoading) {
        return <p>Loading weather...</p>;
    }

    if (weather.error || forecast.error) {
        return <p>Error loading weather.</p>;
    }

    if (!weather.data || !forecast.data) return null;

    const { dt, sys, weather: weatherArr } = weather.data;
    const description = weatherArr?.[0]?.description;
    const isDay = isDaytime(dt, sys.sunrise, sys.sunset);
    const theme = getWeatherTheme(description, isDay);

    return (
        <div
            className="weather-panel-bg"
            style={{
                background: theme.gradient,
                color: theme.textColor,
            }}
        >
            {/* SEARCH HEADER — icon anchored to top right, expands left */}
            <div className="relative z-100 w-full max-w-5xl mx-auto px-4 pt-6">
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
            <div className="w-full max-w-5xl mx-auto glass-card rounded-lg p-4 mt-6 flex flex-col gap-32 xl:flex-row justify-center">
                <WeatherCard data={weather.data} hourly={forecast.data.list} />

                <div className="xl:w-2/5">
                    <ForecastTabs
                        forecast={forecast.data}
                        weatherData={weather.data}
                    />
                </div>
            </div>
        </div>
    );
}

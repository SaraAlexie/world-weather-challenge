"use client";

import { useState, useRef, useEffect } from "react";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { useWeather, useForecast } from "../../hooks/WeatherHooks";
import WeatherCard from "../../components/ui/WeatherCard";
import SearchLocation from "../location/SearchLocation";
import { isDaytime } from "../../utils/isDaytime";
import { getWeatherTheme } from "../../styles/weatherThemes";
import ForecastTabs from "./ForecastTabs";
import { FiSearch } from "react-icons/fi";

export default function WeatherPanel() {
    const { location, unit } = useWeatherContext();
    const { lat, lon } = location;

    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(e.target as Node)
            ) {
                setSearchOpen(false);
            }
        }

        if (searchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchOpen]);

    // Close on ESC
    useEffect(() => {
        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setSearchOpen(false);
            }
        }

        if (searchOpen) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
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

    const weather = useWeather(lat, lon, unit);
    const forecast = useForecast(lat, lon, unit);

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
            {/* EXPANDABLE SEARCH HEADER */}
            <div className="w-full max-w-5xl mx-auto px-4 pt-6">
                <div
                    ref={searchRef}
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        searchOpen ? "w-full" : "w-32"
                    }`}
                >
                    {!searchOpen ? (
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="flex items-center gap-2 text-sm font-medium opacity-90 hover:opacity-100 transition"
                        >
                            <FiSearch />
                            Search
                        </button>
                    ) : (
                        <div className="animate-fadeIn">
                            <SearchLocation autoFocus />
                        </div>
                    )}
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

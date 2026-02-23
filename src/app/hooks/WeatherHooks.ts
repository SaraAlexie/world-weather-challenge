import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../services/WeatherClient";
import { fetchForecast } from "../services/ForecastClient";
import type { ForecastResponse } from "../types/forecast";
import type { Unit } from "../types/units";

/**
 * Fetches current weather data (temperature, humidity, etc.)
 * Accepts null coords — query is disabled until a real location is set.
 */
export function useWeather(
    lat: number | null,
    lon: number | null,
    unit: Unit
) {
    return useQuery({
        queryKey: ["weather", lat, lon, unit],
        queryFn: () => fetchWeather(lat!, lon!, unit),
        enabled: lat !== null && lon !== null,
        staleTime: 1000 * 60 * 60, // 60 minutes
    });
}

/**
 * Fetches forecast data (5-day / 3-hour intervals).
 * Accepts null coords — query is disabled until a real location is set.
 */
export function useForecast(
    lat: number | null,
    lon: number | null,
    unit: Unit
) {
    return useQuery<ForecastResponse>({
        queryKey: ["forecast", lat, lon, unit],
        queryFn: () => fetchForecast(lat!, lon!, unit),
        enabled: lat !== null && lon !== null,
        staleTime: 1000 * 60 * 10, // 10 minutes — forecast updates more frequently
    });
}
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../features/weather/WeatherClient";
import { fetchForecast } from "../features/weather/ForecastClient";
import type { ForecastResponse } from "../types/forecast";

/**
 * Fetches current weather data (temperature, humidity, etc.)
 */
export function useWeather(
  lat: number,
  lon: number,
  unit: "metric" | "imperial"
) {
  return useQuery({
    queryKey: ["weather", lat, lon, unit],
    queryFn: () => fetchWeather(lat, lon, unit),
    enabled: lat !== 0 && lon !== 0, // guard initial call
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
}

/**
 * Fetches forecast data (hourly + 7-day)
 */

export function useForecast(
  lat: number,
  lon: number,
  unit: "metric" | "imperial"
) {
  return useQuery<ForecastResponse>({
    queryKey: ["forecast", lat, lon, unit],
    queryFn: () => fetchForecast(lat, lon, unit),
    enabled: lat !== 0 && lon !== 0,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

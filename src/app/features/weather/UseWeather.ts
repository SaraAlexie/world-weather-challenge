import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "./WeatherClient";


export function useWeather(
  lat: number,
  lon: number, unit: "metric" | "imperial"
) {
  return useQuery({
    queryKey: ["weather", lat, lon, unit],
    queryFn: () => fetchWeather(lat, lon, unit),
    enabled: lat !== null && lon !== null, // guards initial call
    staleTime: 1000 * 60 * 5, // 5 minutes, how long data is fresh before refetch
  });
}
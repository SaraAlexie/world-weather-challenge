import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "./WeatherClient";


export function useWeather(
  lat: number,
  lon: number,
) {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather(lat, lon),
    enabled: lat !== null && lon !== null, // guards initial call
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

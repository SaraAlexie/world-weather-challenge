import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "./WeatherClient";

export default function useWeather(lat: number, lon: number) {
    return useQuery({
        queryKey: ["weather", lat, lon],
        queryFn: () => fetchWeather(lat, lon)
    });
}

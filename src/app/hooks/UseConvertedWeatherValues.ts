import { WeatherData } from "../types/weather";

type Unit = "metric" | "imperial";

export interface ConvertedWeatherValues {
    windSpeed: string;
    windUnit: string;
    windBar: number;
    visibility: string;
    visibilityUnit: string;
}

export function useConvertedWeatherValues(
    data: WeatherData,
    unit: Unit,
): ConvertedWeatherValues {
    const apiWind = data.wind.speed;

    // Normalize wind speed to m/s for consistent bar calculation
    const windSpeedMs = unit === "metric" ? apiWind : apiWind / 2.23694;

    const windSpeed =
        unit === "metric"
            ? windSpeedMs.toFixed(1)
            : apiWind.toFixed(1);

    const windUnit = unit === "metric" ? "m/s" : "mph";
    const windBar = (windSpeedMs / 15) * 100;

    // API always returns visibility in meters
    const visibility =
        unit === "metric"
            ? (data.visibility / 1000).toFixed(1)
            : (data.visibility / 1609.34).toFixed(1);

    const visibilityUnit = unit === "metric" ? "km" : "mi";

    return { windSpeed, windUnit, windBar, visibility, visibilityUnit };
}
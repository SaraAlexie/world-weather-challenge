"use client";
import { WeatherData } from "../../types/weather";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { WiWindDeg, WiBarometer, WiDaySunny } from "react-icons/wi";
import MetricCard from "../../components/ui/MetricCard";

export default function WeatherDetails({ data }: { data: WeatherData }) {
    const { unit } = useWeatherContext();

    const humidity = data.main.humidity;

    // WIND — uses m/s internally for the bar (always stable)
    const apiWind = data.wind.speed; // m/s (metric) OR mph (imperial)

    // Convert to m/s for internal logic
    const windSpeedMs =
        unit === "metric"
            ? apiWind // already m/s
            : apiWind / 2.23694; // mph → m/s

    // Displayed wind speed
    const windSpeed =
        unit === "metric"
            ? windSpeedMs.toFixed(1) // m/s
            : apiWind.toFixed(1); // mph (raw API value)

    const windUnit = unit === "metric" ? "m/s" : "mph";

    // Wind bar (0–15 m/s range)
    const windBar = (windSpeedMs / 15) * 100;

    // VISIBILITY — API always returns meters
    const visibility =
        unit === "metric"
            ? (data.visibility / 1000).toFixed(1) // km
            : (data.visibility / 1609.34).toFixed(1); // miles

    const visibilityUnit = unit === "metric" ? "km" : "mi";

    const cloudiness = data.clouds.all;
    const pressure = data.main.pressure;

    return (
        <div className="space-y-4 mt-6 px-2">
            <h3 className="text-sm font-semibold px-1">Detailed Conditions</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Humidity */}
                <MetricCard
                    icon="💧"
                    label="Humidity"
                    value={humidity.toString()}
                    unit="%"
                    bar={humidity}
                />

                {/* Wind */}
                <MetricCard
                    icon={<WiWindDeg size={24} />}
                    label="Wind"
                    value={windSpeed}
                    unit={windUnit}
                    bar={windBar}
                />

                {/* Pressure */}
                <MetricCard
                    icon={<WiBarometer size={24} />}
                    label="Pressure"
                    value={pressure.toString()}
                    unit="hPa"
                    bar={(pressure / 1050) * 100}
                />

                {/* Visibility */}
                <MetricCard
                    icon={<WiDaySunny size={24} />}
                    label="Visibility"
                    value={visibility}
                    unit={visibilityUnit}
                    bar={(data.visibility / 10000) * 100}
                />

                {/* Cloud Coverage */}
                <MetricCard
                    icon="☁️"
                    label="Cloudiness"
                    value={cloudiness.toString()}
                    unit="%"
                    bar={cloudiness}
                />

                {/* Temperature Range */}
                <MetricCard
                    icon="🌡️"
                    label="Temp Range"
                    value={`${Math.round(data.main.temp_min)}–${Math.round(
                        data.main.temp_max,
                    )}`}
                    unit={`°${unit === "metric" ? "C" : "F"}`}
                />
            </div>
        </div>
    );
}

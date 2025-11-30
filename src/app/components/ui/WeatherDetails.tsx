"use client";
import { WeatherData } from "../../types/weather";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { WiWindDeg, WiBarometer, WiDaySunny } from "react-icons/wi";

interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    unit?: string;
    bar?: number;
}

function MetricCard({ icon, label, value, unit, bar }: MetricCardProps) {
    return (
        <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/20 backdrop-blur border border-white/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <div className="flex items-center gap-2">
                    <div className="text-xl sm:text-2xl">{icon}</div>
                    <span className="text-xs font-medium opacity-80">
                        {label}
                    </span>
                </div>
                <span className="text-lg sm:text-xl font-semibold">
                    {value}
                    {unit && ` ${unit}`}
                </span>
            </div>

            {bar !== undefined && (
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-linear-to-r from-cyan-300 to-blue-500 rounded-full transition-all"
                        style={{ width: `${Math.min(bar, 100)}%` }}
                    />
                </div>
            )}
        </div>
    );
}

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

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
                        data.main.temp_max
                    )}`}
                    unit={`°${unit === "metric" ? "C" : "F"}`}
                />
            </div>
        </div>
    );
}

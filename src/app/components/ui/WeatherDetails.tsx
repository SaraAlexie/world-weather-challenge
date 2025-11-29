"use client";
import { WeatherData } from "../../types/weather";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { WiWindDeg, WiBarometer, WiDaySunny } from "react-icons/wi";

interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    unit?: string;
    bar?: number; // 0-100 for visual bar
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
                        className="h-full bg-gradient-to-r from-cyan-300 to-blue-500 rounded-full transition-all"
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
    const windSpeedMs = data.wind.speed;
    // Convert wind speed based on unit system (metric = km/h, imperial = mph)
    // Display in proper units: km/h for metric, mph for imperial
    const windSpeed =
        unit === "metric"
            ? (windSpeedMs * 3.6).toFixed(1)
            : (windSpeedMs * 2.237).toFixed(1);
    const windUnit = unit === "metric" ? "km/h" : "mph";
    // Wind bar always based on m/s to stay consistent
    const windBar = (windSpeedMs / 15) * 100;
    const pressureHpa = data.main.pressure;
    // Convert visibility based on unit system (metric = km, imperial = miles)
    const visibility =
        unit === "metric"
            ? (data.visibility / 1000).toFixed(1)
            : (data.visibility / 1609.34).toFixed(1);
    const visibilityUnit = unit === "metric" ? "km" : "mi";
    const cloudiness = data.clouds.all;

    return (
        <div className="space-y-3 mt-4">
            <h3 className="text-sm font-semibold px-1">Detailed Conditions</h3>

            <div className="grid grid-cols-2 gap-3">
                {/* Humidity */}
                <MetricCard
                    icon="💧"
                    label="Humidity"
                    value={humidity.toString()}
                    unit="%"
                    bar={humidity}
                />

                {/* Wind Speed */}
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
                    value={pressureHpa.toString()}
                    unit="hPa"
                    bar={(pressureHpa / 1050) * 100} // normalize 1050 hPa as max
                />

                {/* Visibility */}
                <MetricCard
                    icon={<WiDaySunny size={24} />}
                    label="Visibility"
                    value={visibility}
                    unit={visibilityUnit}
                    bar={(data.visibility / 10000) * 100} // normalize 10000m (10km) as max (independent of display unit)
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
                    unit="°"
                />
            </div>
        </div>
    );
}

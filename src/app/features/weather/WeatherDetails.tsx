"use client";

import { WeatherData } from "../../types/weather";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { WiWindDeg, WiBarometer, WiDaySunny } from "react-icons/wi";
import MetricCard from "../../components/ui/MetricCard";
import { useConvertedWeatherValues } from "../../hooks/UseConvertedWeatherValues";

export default function WeatherDetails({ data }: { data: WeatherData }) {
    const { unit } = useWeatherContext();
    const { windSpeed, windUnit, windBar, visibility, visibilityUnit } =
        useConvertedWeatherValues(data, unit);

    const { humidity, pressure, temp_min, temp_max } = data.main;
    const cloudiness = data.clouds.all;
    const tempUnit = `°${unit === "metric" ? "C" : "F"}`;

    return (
        <div className="space-y-4 mt-6 px-2">
            <h3 className="text-sm font-semibold px-1">Detailed Conditions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MetricCard
                    icon="💧"
                    label="Humidity"
                    value={humidity.toString()}
                    unit="%"
                    bar={humidity}
                />
                <MetricCard
                    icon={<WiWindDeg size={24} />}
                    label="Wind"
                    value={windSpeed}
                    unit={windUnit}
                    bar={windBar}
                />
                <MetricCard
                    icon={<WiBarometer size={24} />}
                    label="Pressure"
                    value={pressure.toString()}
                    unit="hPa"
                    bar={(pressure / 1050) * 100}
                />
                <MetricCard
                    icon={<WiDaySunny size={24} />}
                    label="Visibility"
                    value={visibility}
                    unit={visibilityUnit}
                    bar={(data.visibility / 10000) * 100}
                />
                <MetricCard
                    icon="☁️"
                    label="Cloudiness"
                    value={cloudiness.toString()}
                    unit="%"
                    bar={cloudiness}
                />
                <MetricCard
                    icon="🌡️"
                    label="Temp Range"
                    value={`${Math.round(temp_min)}–${Math.round(temp_max)}`}
                    unit={tempUnit}
                />
            </div>
        </div>
    );
}

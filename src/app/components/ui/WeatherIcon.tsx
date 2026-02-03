"use client";

interface Props {
    description?: string;
    icon?: string;
    size?: number;
}

export default function WeatherIcon({ description, icon, size = 64 }: Props) {
    if (!icon) {
        return (
            <div
                className="flex items-center justify-center"
                style={{ width: size, height: size }}
            >
                <img src="/favicon.ico" alt="Weather icon fallback" />
            </div>
        );
    }

    return (
        <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description ?? "Weather icon"}
            width={size}
            height={size}
            className="select-none"
        />
    );
}

export interface WeatherTheme {
    gradient: string;
    textColor: string;
    accent: string;
    muted: string;
}

type WeatherGroup =
    | "clear"
    | "partlyCloudy"
    | "cloudy"
    | "lightRain"
    | "heavyRain"
    | "thunder"
    | "snow"
    | "fog";

/**
 * Normalize OpenWeather descriptions into human-friendly groups
 */
function getWeatherGroup(description?: string): WeatherGroup {
    const d = (description || "").toLowerCase();

    if (d.includes("clear")) return "clear";

    if (d.includes("few clouds") || d.includes("scattered clouds"))
        return "partlyCloudy";

    if (d.includes("broken clouds") || d.includes("overcast"))
        return "cloudy";

    if (d.includes("drizzle") || d.includes("light rain") || d.includes("shower"))
        return "lightRain";

    if (d.includes("heavy rain") || d.includes("extreme rain"))
        return "heavyRain";

    if (d.includes("thunder")) return "thunder";

    if (d.includes("snow") || d.includes("sleet"))
        return "snow";

    if (
        d.includes("mist") ||
        d.includes("fog") ||
        d.includes("haze") ||
        d.includes("smoke")
    )
        return "fog";

    return "clear";
}

/**
 * Base themes (day)
 */
const dayThemes: Record<WeatherGroup, WeatherTheme> = {
    clear: {
        gradient: "linear-gradient(135deg, #38bdf8, #fef9c3)",
        textColor: "#0f172a",
        accent: "#0284c7",
        muted: "#334155",
    },
    partlyCloudy: {
        gradient: "linear-gradient(135deg, #60a5fa, #e5e7eb)",
        textColor: "#0f172a",
        accent: "#2563eb",
        muted: "#475569",
    },
    cloudy: {
        gradient: "linear-gradient(135deg, #94a3b8, #cbd5f5)",
        textColor: "#0f172a",
        accent: "#475569",
        muted: "#334155",
    },
    lightRain: {
        gradient: "linear-gradient(135deg, #7dd3fc, #94a3b8)",
        textColor: "#0f172a",
        accent: "#0284c7",
        muted: "#475569",
    },
    heavyRain: {
        gradient: "linear-gradient(135deg, #1e3a8a, #334155)",
        textColor: "#e5e7eb",
        accent: "#38bdf8",
        muted: "#cbd5e1",
    },
    thunder: {
        gradient: "linear-gradient(135deg, #0f172a, #4c1d95)",
        textColor: "#e5e7eb",
        accent: "#facc15",
        muted: "#cbd5e1",
    },
    snow: {
        gradient: "linear-gradient(135deg, #e0f2fe, #f8fafc)",
        textColor: "#0f172a",
        accent: "#38bdf8",
        muted: "#475569",
    },
    fog: {
        gradient: "linear-gradient(135deg, #cbd5e1, #e5e7eb)",
        textColor: "#0f172a",
        accent: "#64748b",
        muted: "#475569",
    },
};

/**
 * Night overlay: darker, calmer, less contrast
 */
function applyNightOverlay(theme: WeatherTheme): WeatherTheme {
    return {
        ...theme,
        gradient: `linear-gradient(135deg, rgba(15,23,42,0.85), rgba(15,23,42,0.65)), ${theme.gradient}`,
        textColor: "#e5e7eb",
        muted: "#cbd5e1",
    };
}

/**
 * Public API
 */
export function getWeatherTheme(
    description?: string,
    isDay: boolean = true
): WeatherTheme {
    const group = getWeatherGroup(description);
    const baseTheme = dayThemes[group];

    return isDay ? baseTheme : applyNightOverlay(baseTheme);
}

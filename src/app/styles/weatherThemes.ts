export type WeatherTheme = {
    gradient: string;
    textColor?: string;
};

export function getWeatherTheme(main: string | undefined): WeatherTheme {
    // map main weather description to a pleasant gradient
    switch ((main || "").toLowerCase()) {
        case "clear":
            return {
                gradient: "linear-gradient(135deg,#FFD54A 0%,#FF8A65 100%)",
                textColor: "#111827",
            };
        case "clouds":
            return {
                gradient: "linear-gradient(135deg,#90A4AE 0%,#CFD8DC 100%)",
                textColor: "#0f172a",
            };
        case "rain":
        case "drizzle":
            return {
                gradient: "linear-gradient(135deg,#4FC3F7 0%,#0288D1 100%)",
                textColor: "#FFFFFF",
            };
        case "thunderstorm":
            return {
                gradient: "linear-gradient(135deg,#7F00FF 0%,#E100FF 100%)",
                textColor: "#FFFFFF",
            };
        case "snow":
            return {
                gradient: "linear-gradient(135deg,#E0F7FA 0%,#B2EBF2 100%)",
                textColor: "#0f172a",
            };
        case "mist":
        case "haze":
        case "fog":
            return {
                gradient: "linear-gradient(135deg,#B0BEC5 0%,#78909C 100%)",
                textColor: "#FFFFFF",
            };
        default:
            return {
                gradient: "linear-gradient(135deg,#F9FAFB 0%,#E6EEF8 100%)",
                textColor: "#0f172a",
            };
    }
}

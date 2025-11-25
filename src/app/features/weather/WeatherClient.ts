const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// metric is default unit for temp
export async function fetchWeather(lat: number, lon: number, unit: "metric" | "imperial" = "metric") {
    
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    return response.json();
}

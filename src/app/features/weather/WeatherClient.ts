const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";


export async function fetchWeather(lat: number, lon: number) {
    
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    return response.json();
}

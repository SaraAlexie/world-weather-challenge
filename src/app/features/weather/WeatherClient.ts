// metric is default unit for temp
export async function fetchWeather(lat: number, lon: number, unit: "metric" | "imperial" = "metric") {
    
    const url = `/api/weather?lat=${lat}&lon=${lon}&unit=${unit}`;
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    return response.json();
}

import type { ForecastResponse, DailyForecast } from "../types/forecast";

export function buildDailyFromList(forecast: ForecastResponse): DailyForecast[] {
  const days: Record<string, DailyForecast> = {};

  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const key = date.toISOString().split("T")[0]; // yyyy-mm-dd

    if (!days[key]) {
      days[key] = {
        dt: item.dt,
        temp: {
          min: item.main.temp,
          max: item.main.temp,
        },
        weather: item.weather,
      };
    } else {
      days[key].temp.min = Math.min(days[key].temp.min, item.main.temp);
      days[key].temp.max = Math.max(days[key].temp.max, item.main.temp);
    }
  });

  return Object.values(days).slice(0, 7);
}

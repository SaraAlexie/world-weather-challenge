export interface HourlyForecast {
  dt: number;
  temp: number;
  weather: { main: string; description: string; icon: string }[];
}

export interface DailyForecast {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: { main: string; description: string; icon: string }[];
}

export interface ForecastResponse {
  current: {
    dt: number;
    temp: number;
    weather: { main: string; description: string; icon: string }[];
  };
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

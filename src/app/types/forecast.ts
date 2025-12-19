export interface HourlyForecast {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
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
  list: HourlyForecast[];
  city: {
    name: string;
    country: string;
    timezone: number;
  };
}


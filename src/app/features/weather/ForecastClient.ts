import { ForecastResponse } from "../../types/forecast";

export async function fetchForecast(
  lat: number,
  lon: number,
  unit: "metric" | "imperial"
): Promise<ForecastResponse> {
  const response = await fetch(
    `/api/forecast?lat=${lat}&lon=${lon}&unit=${unit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }

  return response.json();
}

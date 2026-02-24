import { ForecastResponse } from "../types/forecast";
import { Unit } from "../types/units";

export async function fetchForecast(
  lat: number,
  lon: number,
  unit: Unit
): Promise<ForecastResponse> {
  const response = await fetch(
    `/api/forecast?lat=${lat}&lon=${lon}&unit=${unit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }

  return response.json();
}

export function isDaytime(
  current: number,
  sunrise: number,
  sunset: number
): boolean {
  return current >= sunrise && current < sunset;
}

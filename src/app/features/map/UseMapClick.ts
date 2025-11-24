import { useWeatherContext } from "../../providers/WeatherContextProvider";
import type { LeafletMouseEvent } from "leaflet";

export function useMapClick() {
  const { setLocation } = useWeatherContext();

  function onMapClick(event: LeafletMouseEvent) {
    setLocation({
      lat: event.latlng.lat,
      lon: event.latlng.lng,
    });
  }

  return { onMapClick };
}

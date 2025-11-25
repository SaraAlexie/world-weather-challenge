import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { useMapMarkerContext } from "../../providers/MapMarkerContextProvider";
import type { LeafletMouseEvent } from "leaflet";

export function useMapClick() {
  const { setLocation } = useWeatherContext();
  const { setMarkerPosition } = useMapMarkerContext();

  function onMapClick(event: LeafletMouseEvent) {
    setLocation({
      lat: event.latlng.lat,
      lon: event.latlng.lng,
    });
    setMarkerPosition([event.latlng.lat, event.latlng.lng]);
  }

  return { onMapClick };
}

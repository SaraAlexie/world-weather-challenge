import { Marker } from "react-leaflet";
import { useMapMarkerContext } from "../../providers/MapMarkerContextProvider";

export default function MapMarker() {
    const { markerPosition } = useMapMarkerContext();
    if (!markerPosition) return null;

    return <Marker position={markerPosition} />;
}

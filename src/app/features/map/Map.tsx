"use client";

import dynamic from "next/dynamic";
import { useMapClick } from "./UseMapClick";

// load the real map component only on the client (no SSR)
const MapInner = dynamic(() => import("./MapInner"), { ssr: false });

export default function Map() {
    const { onMapClick } = useMapClick();
    return <MapInner onClick={onMapClick} />;
}

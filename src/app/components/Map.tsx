"use client";

import dynamic from "next/dynamic";

// Load the real map component only on the client (no SSR)
const MapInner = dynamic(() => import("./MapInner"), {
    ssr: false,
});

export default function Map() {
    return <MapInner />;
}

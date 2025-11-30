"use client";

import { useState } from "react";
import { FiMap, FiX } from "react-icons/fi";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapPanel() {
    const [showMap, setShowMap] = useState(false);

    return (
        <section className="mt-4">
            {/* Toggle only shown on mobile */}
            <div className="md:hidden flex justify-center">
                <button
                    onClick={() => setShowMap((prev) => !prev)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition"
                >
                    {showMap ? <FiX /> : <FiMap />}
                    {showMap ? "Hide Map" : "Show Map"}
                </button>
            </div>

            {/* Collapsible map on mobile */}
            {showMap && (
                <div className="mt-4 md:hidden h-[400px] rounded overflow-hidden">
                    <Map />
                </div>
            )}

            {/* Always visible on desktop */}
            <div className="hidden md:block mt-4 h-[500px] xl:h-[700px] rounded overflow-hidden">
                <Map />
            </div>
        </section>
    );
}

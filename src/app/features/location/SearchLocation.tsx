import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { useMapMarkerContext } from "../../providers/MapMarkerContextProvider";

const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/geo/1.0/direct?q=";

// warns in development if API key is missing
if (!API_KEY) {
    console.warn("OpenWeather API key is missing.");
}

// shape of location data from OpenWeather Geocoding API
export interface GeoLocation {
    name: string;
    lat: number;
    lon: number;
    state?: string;
    country?: string;
}

// fetch location data from OpenWeather Geocoding API
// limit parameter controls number of results returned
// returns an array of GeoLocation objects
// throws error if fetch fails
// returns empty array if query is empty
export async function fetchLocation(
    query: string,
    limit = 5
): Promise<GeoLocation[]> {
    if (!query) return [];

    const url = `${BASE_URL}${encodeURIComponent(
        query
    )}&limit=${limit}&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch location data: ${response.statusText}`
        );
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
}

// custom hook to use location search
// uses react-query to fetch and cache location data
// only enabled if query is non-empty
export function useLocation(query: string) {
    return useQuery<GeoLocation[]>({
        queryKey: ["location", query],
        queryFn: () => fetchLocation(query, 5),
        staleTime: 1000 * 60 * 60,
        enabled: !!query,
    });
}

// assembles the name using optional state and country, removes empty values
function formatLocationName(loc: GeoLocation): string {
    const parts = [loc.name, loc.state, loc.country && `(${loc.country})`];
    return parts.filter(Boolean).join(", ").trim();
}

export default function SearchLocation() {
    // local state to store the input query
    const [query, setQuery] = useState("");
    // extracts context functions for updating weather and map state
    const { setLocation } = useWeatherContext();
    const { setMarkerPosition } = useMapMarkerContext();
    // executes the geolocation query based on the current input query
    const { data, isLoading, error } = useLocation(query);

    // guard against null/undefined location
    // update weather context and map marker position
    // fills the input with the selected location name
    const handleSelectLocation = (loc: GeoLocation) => {
        if (!loc) return;

        setLocation({ lat: loc.lat, lon: loc.lon });
        setMarkerPosition([loc.lat, loc.lon]);

        setQuery(formatLocationName(loc));
    };

    // determines if there are results to display
    // only true if query is non-empty and data has results
    const hasResults = query && data && data.length > 0;

    return (
        <div>
            <form
                onSubmit={(e) => e.preventDefault()} // prevent page reload on submit
                className="search-location mt-2"
            >
                <label htmlFor="location-search" />
                <div className="flex gap-2">
                    <input
                        id="location-search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter city or place name"
                        aria-label="Search location"
                        className="w-full rounded border px-3 py-2"
                    />
                    <button
                        type="submit"
                        className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>
            </form>

            {query && (
                <>
                    {isLoading && (
                        <p className="mt-2 text-sm text-gray-600">
                            Searching...
                        </p>
                    )}
                    {error && (
                        <p className="mt-2 text-sm text-red-600">
                            Error searching location.
                        </p>
                    )}
                    {data && data.length === 0 && (
                        <p className="mt-2 text-sm">No results found.</p>
                    )}
                </>
            )}

            {hasResults && ( // display results only if there are any
                <ul className="mt-3 border rounded divide-y">
                    {data!.map((loc) => (
                        <li
                            //safest composite key as name+lat+lon+state+country will almost never duplicate
                            key={`${loc.name}-${loc.lat}-${loc.lon}-${
                                loc.state ?? ""
                            }-${loc.country ?? ""}`}
                            onClick={() => handleSelectLocation(loc)}
                            className="px-3 py-2 cursor-pointer hover:bg-blue-50 text-sm"
                        >
                            {formatLocationName(loc)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

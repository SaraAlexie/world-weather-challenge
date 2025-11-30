import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { useMapMarkerContext } from "../../providers/MapMarkerContextProvider";
import { useDebounce } from "../../hooks/UseDebounce";
import { FiSearch, FiLoader, FiX } from "react-icons/fi";

// shape of location data from OpenWeather Geocoding API
export interface GeoLocation {
    name: string;
    lat: number;
    lon: number;
    state?: string;
    country?: string;
}

// fetch location data from backend API
// limit parameter controls number of results returned
// returns an array of GeoLocation objects
// throws error if fetch fails
// returns empty array if query is empty
export async function fetchLocation(
    query: string,
    limit = 5
): Promise<GeoLocation[]> {
    if (!query) return [];

    const url = `/api/location?q=${encodeURIComponent(query)}&limit=${limit}`;
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
    const [showSearch, setShowSearch] = useState(false);
    // debounced version of the query to limit API calls when typing
    const debouncedQuery = useDebounce(query, 500);
    // extracts context functions for updating weather and map state
    const { setLocation } = useWeatherContext();
    const { setMarkerPosition } = useMapMarkerContext();
    // executes the geolocation query based on the current input query
    const { data, isLoading, error } = useLocation(debouncedQuery);

    // guard against null/undefined location
    // update weather context and map marker position
    // fills the input with the selected location name
    const handleSelectLocation = (loc: GeoLocation) => {
        if (!loc) return;

        setLocation({ lat: loc.lat, lon: loc.lon });
        setMarkerPosition([loc.lat, loc.lon]);

        setQuery(formatLocationName(loc));
        setShowSearch(false);
    };

    // determines if there are results to display
    // only true if query is non-empty and data has results
    const hasResults = query && data && data.length > 0;
    hasResults && console.log("Search results:", data);

    return (
        <div className="relative w-full">
            {/* Toggle Button on Mobile */}
            <div className="lg:hidden flex justify-end mb-2">
                <button
                    onClick={() => setShowSearch((prev) => !prev)}
                    className="p-2 rounded-full bg-white/70 backdrop-blur text-gray-700 hover:bg-white shadow"
                    aria-label="Toggle Search"
                >
                    {showSearch ? <FiX size={20} /> : <FiSearch size={20} />}
                </button>
            </div>

            {/* Full Search UI */}
            <div
                className={`transition-all ${
                    showSearch ? "block" : "hidden"
                } lg:block`}
            >
                <div className="w-full max-w-sm bg-white/90 backdrop-blur rounded-lg p-3 shadow-md">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="search-location mt-2"
                    >
                        <label htmlFor="location-search" className="sr-only">
                            Search location
                        </label>
                        <div className="flex gap-2">
                            <div className="w-full search-input-wrapper">
                                <span className="search-input-icon text-gray-500">
                                    {isLoading ? (
                                        <FiLoader className="animate-spin" />
                                    ) : (
                                        <FiSearch />
                                    )}
                                </span>
                                <input
                                    id="location-search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Enter city or place name"
                                    aria-label="Search location"
                                    className="w-full rounded border border-gray-400 px-3 py-2 search-input-field placeholder-gray-500 text-gray-800 bg-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
                                aria-label="Search"
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
                                <p className="mt-2 text-black text-sm">
                                    No results found.
                                </p>
                            )}
                        </>
                    )}

                    {hasResults && (
                        <ul className="mt-3 border rounded divide-y search-results-bg shadow-lg fade-in overflow-hidden">
                            {data!.map((loc) => (
                                <li
                                    key={`${loc.name}-${loc.lat}-${loc.lon}-${
                                        loc.state ?? ""
                                    }-${loc.country ?? ""}`}
                                    onClick={() => handleSelectLocation(loc)}
                                    className="px-3 py-2 cursor-pointer hover:bg-blue-50 text-sm flex items-center gap-2"
                                >
                                    <FiSearch className="text-gray-500" />
                                    <span className="truncate">
                                        {formatLocationName(loc)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

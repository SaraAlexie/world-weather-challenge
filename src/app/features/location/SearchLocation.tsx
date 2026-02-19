import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWeatherContext } from "../../providers/WeatherContextProvider";
import { useMapMarkerContext } from "../../providers/MapMarkerContextProvider";
import { useDebounce } from "../../hooks/UseDebounce";
import { FiSearch, FiLoader } from "react-icons/fi";

// shape of location data from OpenWeather Geocoding API
export interface GeoLocation {
    name: string;
    lat: number;
    lon: number;
    state?: string;
    country?: string;
}

export async function fetchLocation(
    query: string,
    limit = 5,
): Promise<GeoLocation[]> {
    if (!query) return [];

    const url = `/api/location?q=${encodeURIComponent(query)}&limit=${limit}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch location data: ${response.statusText}`,
        );
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
}

export function useLocation(query: string) {
    return useQuery<GeoLocation[]>({
        queryKey: ["location", query],
        queryFn: () => fetchLocation(query, 5),
        staleTime: 1000 * 60 * 60,
        enabled: !!query,
    });
}

function formatLocationName(loc: GeoLocation): string {
    const parts = [loc.name, loc.state, loc.country && `(${loc.country})`];
    return parts.filter(Boolean).join(", ").trim();
}

export default function SearchLocation({ autoFocus }: { autoFocus?: boolean }) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);
    const { setLocation } = useWeatherContext();
    const { setMarkerPosition } = useMapMarkerContext();
    const { data, isLoading, error } = useLocation(debouncedQuery);

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const resultsRef = useRef<HTMLUListElement>(null);

    const hasResults = !!(query && data && data.length > 0);

    const handleSelectLocation = (loc: GeoLocation) => {
        if (!loc) return;
        setLocation({ lat: loc.lat, lon: loc.lon });
        setMarkerPosition([loc.lat, loc.lon]);
        setQuery(formatLocationName(loc));
        setSelectedIndex(-1);
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!hasResults || !data) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % data.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + data.length) % data.length);
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            e.preventDefault();
            handleSelectLocation(data[selectedIndex]);
        }
    };

    useEffect(() => {
        if (resultsRef.current && selectedIndex >= 0) {
            const activeItem = resultsRef.current.children[
                selectedIndex
            ] as HTMLElement;
            if (activeItem) activeItem.scrollIntoView({ block: "nearest" });
        }
    }, [selectedIndex]);

    return (
        <div className="relative w-full">
            {/* Input row */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/20 backdrop-blur border border-white/30 focus-within:bg-white/30 focus-within:border-white/50 transition">
                <span className="text-current opacity-60 shrink-0">
                    {isLoading ? (
                        <FiLoader size={15} className="animate-spin" />
                    ) : (
                        <FiSearch size={15} />
                    )}
                </span>
                <input
                    id="location-search"
                    value={query}
                    autoFocus={autoFocus}
                    onChange={handleQueryChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search location..."
                    aria-label="Search location"
                    className="w-full bg-transparent text-sm text-current placeholder-current/50 outline-none"
                />
            </div>

            {/* Status messages */}
            {query && (
                <div className="mt-1 px-1">
                    {error && (
                        <p className="text-xs opacity-70">
                            Could not fetch results.
                        </p>
                    )}
                    {data && data.length === 0 && !isLoading && (
                        <p className="text-xs opacity-70">No results found.</p>
                    )}
                </div>
            )}

            {/* Results dropdown */}
            {hasResults && data && (
                <ul
                    ref={resultsRef}
                    className="absolute z-100 mt-2 w-full rounded-xl bg-white/90 backdrop-blur shadow-lg overflow-hidden border border-white/40 divide-y divide-gray-100"
                >
                    {data.map((loc, idx) => (
                        <li
                            key={`${loc.name}-${loc.lat}-${loc.lon}-${loc.state ?? ""}-${loc.country ?? ""}`}
                            onClick={() => handleSelectLocation(loc)}
                            className={`px-4 py-2.5 cursor-pointer text-sm text-gray-800 flex items-center gap-2 transition-colors ${
                                idx === selectedIndex
                                    ? "bg-blue-50"
                                    : "hover:bg-gray-50"
                            }`}
                        >
                            <FiSearch
                                size={13}
                                className="text-gray-400 shrink-0"
                            />
                            <span className="truncate">
                                {formatLocationName(loc)}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

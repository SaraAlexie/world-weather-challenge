"use client";

import { useWeatherContext } from "../../providers/WeatherContextProvider";
import {
    useLocationSearch,
    type LocationResult,
} from "../../services/location";
import { FiMapPin, FiSearch, FiLoader } from "react-icons/fi";
import { useRef, useState } from "react";

interface SearchLocationProps {
    autoFocus?: boolean;
}

export default function SearchLocation({
    autoFocus = false,
}: SearchLocationProps) {
    const { setLocation } = useWeatherContext();
    const { query, setQuery, results, isLoading, error } =
        useLocationSearch(500);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const resultsRef = useRef<HTMLUListElement>(null);

    function handleSelectLocation(location: LocationResult) {
        setLocation({
            lat: location.lat,
            lon: location.lon,
        });
        setQuery("");
        setSelectedIndex(-1);
    }

    function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
        setSelectedIndex(-1);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev < results.length - 1 ? prev + 1 : prev,
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            e.preventDefault();
            handleSelectLocation(results[selectedIndex]);
        }
    }

    function formatLocationName(loc: LocationResult): string {
        const parts = [loc.name, loc.state, loc.country].filter(Boolean);
        return parts.join(", ");
    }

    const hasResults = results.length > 0;

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
                    {!isLoading && hasResults === false && (
                        <p className="text-xs opacity-70">No results found.</p>
                    )}
                </div>
            )}

            {/* Results dropdown */}
            {hasResults && (
                <ul
                    ref={resultsRef}
                    className="absolute z-100 mt-2 w-full rounded-xl bg-white/90 backdrop-blur shadow-lg overflow-hidden border border-white/40 divide-y divide-gray-100"
                >
                    {results.map((loc, idx) => (
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

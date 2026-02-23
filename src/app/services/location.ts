import { useEffect, useState } from "react";

export interface LocationResult {
    name: string;
    lat: number;
    lon: number;
    country?: string;
    state?: string;
}

/**
 * Fetches location coordinates from the location API
 */
export async function fetchLocationCoordinates(
    query: string
): Promise<LocationResult[]> {
    if (!query.trim()) {
        return [];
    }

    try {
        const response = await fetch(
            `/api/location?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error(`Location API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch location:", error);
        return [];
    }
}

/**
 * Custom hook for location search with debouncing
 */
export function useLocationSearch(debounceDelay: number = 500) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<LocationResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setError(null);
            return;
        }

        const timer = setTimeout(async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchLocationCoordinates(query);
                setResults(data);

                if (data.length === 0) {
                    setError("No locations found");
                }
            } catch (err) {
                setError("Failed to search locations");
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, debounceDelay);

        return () => clearTimeout(timer);
    }, [query, debounceDelay]);

    return {
        query,
        setQuery,
        results,
        isLoading,
        error,
    };
}
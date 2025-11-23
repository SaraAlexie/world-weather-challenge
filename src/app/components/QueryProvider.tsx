"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

// Use interface to tell it has to be something React can render
interface Props {
    children: React.ReactNode;
}

// Accepts children as props as it is a wrapped component
export default function QueryProvider({ children }: Props) {
    // Define query client inside state to make sure data is not shared between different
    // users and requests, while creating the query client once every component lifecycle
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

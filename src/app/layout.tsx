import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import { WeatherContextProvider } from "./providers/WeatherContextProvider";

export const metadata: Metadata = {
    title: "World Weather App",
    description: `Most awesomely accurate weather app`,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <QueryProvider>
                    <WeatherContextProvider>{children}</WeatherContextProvider>
                </QueryProvider>
            </body>
        </html>
    );
}

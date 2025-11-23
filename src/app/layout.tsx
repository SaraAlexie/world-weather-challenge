import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./components/QueryProvider";

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
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}

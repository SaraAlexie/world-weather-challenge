"use client";

export default function SplitLayout({
    map,
    panel,
}: {
    map: React.ReactNode;
    panel: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            {/* Map section */}
            <div className="w-full md:w-2/3 h-1/2 md:h-full overflow-hidden">
                {map}
            </div>

            {/* Panel section */}
            <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-auto bg-gray-50 border-t md:border-t-0 md:border-l p-4">
                {panel}
            </div>
        </div>
    );
}

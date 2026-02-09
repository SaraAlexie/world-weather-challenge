"use client";

interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    unit?: string;
    bar?: number;
}

export default function MetricCard({
    icon,
    label,
    value,
    unit,
    bar,
}: MetricCardProps) {
    return (
        <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/20 backdrop-blur border border-white/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <div className="flex items-center gap-2">
                    <div className="text-xl sm:text-2xl">{icon}</div>
                    <span className="text-xs font-medium opacity-80">
                        {label}
                    </span>
                </div>
                <span className="text-lg sm:text-xl font-semibold">
                    {value}
                    {unit && ` ${unit}`}
                </span>
            </div>

            {bar !== undefined && (
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-linear-to-r from-cyan-300 to-blue-500 rounded-full transition-all"
                        style={{ width: `${Math.min(bar, 100)}%` }}
                    />
                </div>
            )}
        </div>
    );
}

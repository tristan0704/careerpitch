import type { ReactNode } from "react";

export function LoadingState({
    label,
    children,
    className = "",
    compact = false,
}: {
    label?: string;
    children?: ReactNode;
    className?: string;
    compact?: boolean;
}) {
    const spacingClass = compact ? "gap-2 px-4 py-3" : "gap-3 p-6";

    return (
        <div
            className={`flex items-center ${spacingClass} rounded-xl bg-gray-900/50 text-sm text-gray-300 outline outline-1 outline-white/10 ${className}`.trim()}
        >
            <span
                aria-hidden="true"
                className="size-4 shrink-0 animate-spin rounded-full border-2 border-white/15 border-t-indigo-300"
            />
            <span>{children ?? label}</span>
        </div>
    );
}

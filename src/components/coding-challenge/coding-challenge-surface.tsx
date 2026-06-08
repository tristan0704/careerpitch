"use client";

import type { ReactNode } from "react";

export function clampPercent(value: number) {
    return Math.max(0, Math.min(100, value));
}

export function CodingChallengeSurface({
    children,
    className = "",
    compact = false,
}: {
    children: ReactNode;
    className?: string;
    compact?: boolean;
}) {
    return (
        <section
            className={`rounded-xl bg-gray-900/50 ${compact ? "p-4" : "p-6"} outline outline-1 outline-white/10 ${className}`.trim()}
        >
            {children}
        </section>
    );
}

export function CodingChallengePanel({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`rounded-xl bg-gray-900/80 p-4 outline outline-1 outline-white/10 ${className}`.trim()}
        >
            {children}
        </div>
    );
}

export function CodingChallengeBadge({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <span
            className={`inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 outline outline-1 outline-white/10 ${className}`.trim()}
        >
            {children}
        </span>
    );
}

export function CodingChallengeSectionHeading({
    eyebrow,
    title,
    description,
    badge,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    badge?: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
                {eyebrow ? (
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
                        {eyebrow}
                    </p>
                ) : null}
                <h2 className="text-lg font-bold tracking-tight text-white md:text-xl">
                    {title}
                </h2>
                {description ? (
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                        {description}
                    </p>
                ) : null}
            </div>
            {badge ? <div className="shrink-0">{badge}</div> : null}
        </div>
    );
}

export function CodingChallengeProgressBar({
    value,
    className = "bg-indigo-400",
    trackClassName = "bg-gray-800",
}: {
    value: number;
    className?: string;
    trackClassName?: string;
}) {
    return (
        <div className={`h-2 rounded-full ${trackClassName}`.trim()}>
            <div
                className={`h-2 rounded-full ${className}`.trim()}
                style={{ width: `${clampPercent(value)}%` }}
            />
        </div>
    );
}

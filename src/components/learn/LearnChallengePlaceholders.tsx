"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { readApiErrorMessage } from "@/lib/api-error";

type ChallengePlaceholder = {
    title: string;
    description: string;
    status: string;
    startEndpoint?: string;
};

type LearnChallengePlaceholdersProps = {
    items: readonly ChallengePlaceholder[];
    startErrorLabel: string;
    startPendingLabel: string;
    startReadyLabel: string;
    title: string;
};

export function LearnChallengePlaceholders({
    items,
    startErrorLabel,
    startPendingLabel,
    startReadyLabel,
    title,
}: LearnChallengePlaceholdersProps) {
    const router = useRouter();
    const [startingEndpoint, setStartingEndpoint] = useState<string | null>(null);
    const [error, setError] = useState("");

    async function startChallenge(startEndpoint: string) {
        setStartingEndpoint(startEndpoint);
        setError("");

        try {
            const response = await fetch(startEndpoint, {
                method: "POST",
                cache: "no-store",
            });
            const data = (await response.json().catch(() => null)) as
                | { href?: string; error?: unknown; errorMessage?: string }
                | null;

            if (!response.ok || !data?.href) {
                throw new Error(readApiErrorMessage(data, startErrorLabel));
            }

            router.push(data.href);
        } catch (startError) {
            setError(
                startError instanceof Error
                    ? startError.message
                    : startErrorLabel
            );
        } finally {
            setStartingEndpoint(null);
        }
    }

    return (
        <section className="mt-10">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">
                        Roadmap
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
                </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item, index) => (
                    <article
                        key={item.title}
                        className="rounded-xl bg-gray-800/50 p-5 outline outline-1 outline-white/10"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-sm font-semibold text-indigo-200 outline outline-1 outline-indigo-300/20">
                                {index + 1}
                            </div>
                            {item.startEndpoint ? (
                                <button
                                    type="button"
                                    onClick={() => void startChallenge(item.startEndpoint!)}
                                    disabled={startingEndpoint !== null}
                                    className="rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {startingEndpoint === item.startEndpoint
                                        ? startPendingLabel
                                        : startReadyLabel}
                                </button>
                            ) : (
                                <p className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-300 outline outline-1 outline-white/10">
                                    {item.status}
                                </p>
                            )}
                        </div>

                        <p className="mt-5 text-base font-semibold text-white">
                            {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-gray-400">
                            {item.description}
                        </p>
                    </article>
                ))}
            </div>

            {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        </section>
    );
}

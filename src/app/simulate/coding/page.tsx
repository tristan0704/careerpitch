"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function CodingPageContent() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token") ?? ""
    const role = searchParams.get("role") ?? "Backend Developer"
    const company = searchParams.get("company") ?? ""

    const nextHref = `/simulate/analysis?${new URLSearchParams({
        token,
        role,
        ...(company ? { company } : {}),
    }).toString()}`

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                <header className="mb-6 flex items-center justify-between rounded-[28px] border bg-white p-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Step 3</p>
                        <h1 className="text-xl font-semibold">Coding Challenge</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={`/simulate/interview?${new URLSearchParams({
                                token,
                                role,
                                ...(company ? { company } : {}),
                            }).toString()}`}
                            className="rounded-full border px-4 py-2 text-sm"
                        >
                            Zurueck
                        </Link>
                        <Link href={nextHref} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                            Weiter zur Analyse
                        </Link>
                    </div>
                </header>

                <section className="rounded-[28px] border bg-white p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">Placeholder</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight">Leere Coding-Challenge-Seite</h2>
                    <p className="mt-4 max-w-2xl text-sm text-slate-700">
                        Hier kommt spaeter der technische Teil fuer {role}
                        {company ? ` bei ${company}` : ""}: kleine Aufgaben, Bugfinding oder ein einfacher Case.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                            Aufgabenstellung kommt hier hinein
                        </div>
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                            Editor / Antwortfeld kommt spaeter
                        </div>
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                            Bewertung / Feedback kommt spaeter
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default function CodingPage() {
    return (
        <Suspense fallback={<main className="min-h-screen bg-slate-50" />}>
            <CodingPageContent />
        </Suspense>
    )
}

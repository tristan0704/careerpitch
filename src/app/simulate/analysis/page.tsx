"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const analysisBullets = [
    "Starke Motivation fuer die Rolle sichtbar",
    "Projektkommunikation wirkt solide, aber noch ausbaubar",
    "Technische Tiefe muss spaeter im Coding-Step validiert werden",
    "Readiness Score und echte Skill-Gaps folgen im naechsten Ausbau",
]

function AnalysisPageContent() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token") ?? ""
    const role = searchParams.get("role") ?? "Backend Developer"
    const company = searchParams.get("company") ?? ""

    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_45%,#f8fafc_100%)] text-slate-900">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                <header className="mb-6 flex items-center justify-between rounded-[28px] border bg-white p-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Step 4</p>
                        <h1 className="text-xl font-semibold">Final Analysis</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={`/simulate/coding?${new URLSearchParams({
                                token,
                                role,
                                ...(company ? { company } : {}),
                            }).toString()}`}
                            className="rounded-full border px-4 py-2 text-sm"
                        >
                            Zurueck
                        </Link>
                        <Link href="/simulate/new" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                            Neue Simulation
                        </Link>
                    </div>
                </header>

                <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                    <aside className="rounded-[28px] border bg-[#111827] p-6 text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">Simulation Context</p>
                        <div className="mt-5 space-y-3 text-sm">
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                <p className="text-xs uppercase tracking-wide text-slate-400">Rolle</p>
                                <p className="mt-1">{role}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                <p className="text-xs uppercase tracking-wide text-slate-400">Firma</p>
                                <p className="mt-1">{company || "Nicht gesetzt"}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                <p className="text-xs uppercase tracking-wide text-slate-400">Simulation Token</p>
                                <p className="mt-1 break-all">{token || "Noch kein Token"}</p>
                            </div>
                        </div>
                    </aside>

                    <div className="rounded-[28px] border bg-white p-6 sm:p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">Template</p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                            Vorlaeufiges Readiness-Fazit fuer {role}
                            {company ? ` bei ${company}` : ""}
                        </h2>
                        <p className="mt-4 text-sm leading-6 text-slate-700">
                            Diese Seite ist bewusst noch ein statisches Template. Spaeter kommen hier Recruiter-Perspektive,
                            Fachperspektive, finale Entscheidung und konkrete Verbesserungen hinein.
                        </p>

                        <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">
                            <p className="text-sm font-semibold text-slate-900">Vorlaeufige Gesamtbewertung</p>
                            <p className="mt-2 text-sm text-slate-700">
                                Solider erster Durchlauf. Die Bewerbung wirkt grundsaetzlich plausibel, aber die finale Aussage
                                ist fuer den MVP noch bewusst als Platzhalter umgesetzt.
                            </p>
                        </div>

                        <div className="mt-6 space-y-3">
                            {analysisBullets.map((bullet) => (
                                <div key={bullet} className="rounded-2xl border px-4 py-3 text-sm text-slate-800">
                                    {bullet}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default function AnalysisPage() {
    return (
        <Suspense fallback={<main className="min-h-screen bg-slate-50" />}>
            <AnalysisPageContent />
        </Suspense>
    )
}

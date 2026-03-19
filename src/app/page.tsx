"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const roles = [
    "Backend Developer",
    "Frontend Developer",
    "Fullstack-Praktikant",
    "Data / AI",
]

export default function RootPage() {
    const router = useRouter()
    const [selectedRole, setSelectedRole] = useState(roles[0])

    function handleStart() {
        router.push(`/simulate/interview/voice?${new URLSearchParams({ role: selectedRole }).toString()}`)
    }

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-8 sm:px-6">
                <section className="w-full rounded-[28px] border bg-white p-8 shadow-sm sm:p-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">CareerPitch Lab</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Rolle waehlen</h1>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-700">
                        Isolierter Testaufbau nur fuer Live Voice und Video Landmarking. Alles andere ist aus dem Flow entfernt.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {roles.map((role) => (
                            <button
                                key={role}
                                type="button"
                                onClick={() => setSelectedRole(role)}
                                className={`rounded-2xl border px-5 py-5 text-left transition ${
                                    selectedRole === role
                                        ? "border-slate-900 bg-slate-900 text-white"
                                        : "border-slate-200 bg-slate-50 text-slate-900"
                                }`}
                            >
                                <span className="block text-sm font-semibold">{role}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleStart}
                        className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                    >
                        Live Voice + Video starten
                    </button>
                </section>
            </div>
        </main>
    )
}

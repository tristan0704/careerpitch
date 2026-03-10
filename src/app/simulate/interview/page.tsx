"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

type Message = {
    role: "user" | "assistant"
    content: string
}

function InterviewPageContent() {
    const searchParams = useSearchParams()
    const role = searchParams.get("role") ?? "Backend Developer"
    const openingQuestion = `Willkommen. Warum willst du als ${role} arbeiten?`

    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: openingQuestion,
        },
    ])
    const [answer, setAnswer] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function sendAnswer() {
        const nextAnswer = answer.trim()
        if (!nextAnswer || loading) return

        setMessages((prev) => [...prev, { role: "user", content: nextAnswer }])
        setAnswer("")
        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/simulate/interview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    role,
                    answer: nextAnswer,
                }),
            })
            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Interview-Anfrage fehlgeschlagen.")
                return
            }

            setMessages((prev) => [...prev, { role: "assistant", content: data.answer }])
        } catch {
            setError("Server nicht erreichbar.")
        } finally {
            setLoading(false)
        }
    }

    const nextHref = `/simulate/interview-feedback?${new URLSearchParams({ role }).toString()}`

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
                <header className="mb-6 flex items-center justify-between rounded-[28px] border bg-white p-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Step 4</p>
                        <h1 className="text-xl font-semibold">Interview</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/simulate/screening?${new URLSearchParams({ role, screening: "passed" }).toString()}`} className="rounded-full border px-4 py-2 text-sm">
                            Zurueck
                        </Link>
                        <Link href={nextHref} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                            Weiter zum Feedback
                        </Link>
                    </div>
                </header>

                <section className="rounded-[28px] border bg-white p-6">
                    <p className="mb-4 text-sm text-slate-700">{role}</p>
                    <div>
                        <div className="h-[420px] overflow-y-auto rounded-3xl border bg-slate-50 p-4">
                            <div className="space-y-3">
                                {messages.map((message, index) => (
                                    <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div
                                            className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm ${
                                                message.role === "user" ? "bg-slate-900 text-white" : "border bg-white text-slate-900"
                                            }`}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="rounded-2xl border bg-white px-4 py-3 text-sm text-slate-600">
                                            Interviewer antwortet...
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                rows={4}
                                placeholder="Deine Antwort eingeben..."
                                className="w-full rounded-3xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-500"
                            />
                            <div className="mt-3 flex items-center justify-between">
                                {error ? <p className="text-sm text-red-600">{error}</p> : <span className="text-xs text-slate-500">Der Interviewer stellt die Fragen, du gibst Antworten.</span>}
                                <button
                                    onClick={sendAnswer}
                                    disabled={loading}
                                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                                >
                                    Senden
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default function InterviewPage() {
    return (
        <Suspense fallback={<main className="min-h-screen bg-slate-50" />}>
            <InterviewPageContent />
        </Suspense>
    )
}

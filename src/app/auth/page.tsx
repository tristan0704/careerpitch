"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

type AuthUser = {
    id: string
    email: string
    name?: string | null
}

function AuthPageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const mode = useMemo(() => (searchParams.get("mode") === "register" ? "register" : "login"), [searchParams])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        async function redirectIfLoggedIn() {
            try {
                const res = await fetch("/api/auth/me")
                if (!res.ok) return
                const data = (await res.json()) as { user: AuthUser | null }
                if (!data.user) return
                router.push("/simulate/new")
            } catch {}
        }

        redirectIfLoggedIn()
    }, [router])

    async function submit() {
        if (!email.trim() || !password.trim()) {
            setError("Please enter email and password.")
            return
        }

        setLoading(true)
        setError("")

        try {
            const res = await fetch(`/api/auth/${mode}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    name: mode === "register" ? name : undefined,
                }),
            })

            const data = await res.json()
            if (!res.ok) {
                setError(data.error || "Authentication failed.")
                return
            }

            router.push("/simulate/new")
        } catch {
            setError("Server not reachable.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#45311b_0%,transparent_28%),linear-gradient(180deg,#111827_0%,#0f172a_52%,#020617_100%)] text-slate-100">
            <div className="mx-auto w-full max-w-md px-4 pb-16 pt-6 sm:px-6 md:pt-8">
                <header className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md md:px-5">
                    <Link href="/home" className="inline-flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-400 text-xs font-semibold text-slate-950">
                            CP
                        </span>
                        <span className="text-base font-semibold tracking-tight text-white">CareerPitch</span>
                    </Link>
                    <Link href="/home" className="rounded-full border border-white/15 px-3 py-2 text-sm text-slate-200 hover:bg-white/5">
                        Back
                    </Link>
                </header>

                <section className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
                        {mode === "login" ? "Login" : "Register"}
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                        {mode === "login" ? "Zurueck in deine Simulationen" : "Account fuer den Bewerbungs-Simulator"}
                    </h1>
                    <p className="mt-3 text-sm text-slate-300">
                        {mode === "login"
                            ? "Melde dich an und starte direkt mit einer neuen Bewerbungssimulation."
                            : "Registriere dich, um CV-Uploads, Interviews und spaetere Analysen zu speichern."}
                    </p>

                    <div className="mt-6 space-y-3">
                        {mode === "register" && (
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name (optional)"
                                className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:border-amber-300/70 focus:outline-none"
                            />
                        )}

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                            className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:border-amber-300/70 focus:outline-none"
                        />

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:border-amber-300/70 focus:outline-none"
                        />

                        <button
                            onClick={submit}
                            disabled={loading}
                            className="w-full rounded-2xl bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105 disabled:opacity-50"
                        >
                            {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
                        </button>

                        {error && <p className="text-sm text-rose-300">{error}</p>}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default function AuthPage() {
    return (
        <Suspense fallback={<main className="min-h-screen bg-slate-950" />}>
            <AuthPageContent />
        </Suspense>
    )
}

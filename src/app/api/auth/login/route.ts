import { prisma } from "@/lib/prisma"
import { createSession, setSessionCookie, verifyPassword } from "@/lib/auth"
import { enforceRateLimit } from "@/lib/securityRateLimit"

type LoginBody = {
    email?: string
    password?: string
}

export async function POST(req: Request) {
    const limited = enforceRateLimit(req, "auth-login", {
        windowMs: 60_000,
        max: 60,
    })
    if (limited) return limited

    const body = (await req.json()) as LoginBody
    const email = body.email?.trim().toLowerCase()
    const password = body.password?.trim()

    if (!email || !password) {
        return Response.json({ error: "Missing email or password" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const ok = await verifyPassword(password, user.passwordHash)
    if (!ok) {
        return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const session = await createSession(user.id)
    await setSessionCookie(session.token, session.expiresAt)

    return Response.json({
        user: { id: user.id, email: user.email, name: user.name },
    })
}

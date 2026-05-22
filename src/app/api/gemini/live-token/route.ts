import { createLiveInterviewToken } from "@/lib/voice-interview/server/live-token"
import { getCurrentApiIdentity } from "@/db-backend/auth/api-identity"
import { getProfileSnapshot } from "@/db-backend/profile/profile-service"
import { normalizeLanguage } from "@/lib/i18n/dictionaries"

export const runtime = "nodejs"

type LiveTokenBody = {
    role?: string
    questionPlan?: Array<{
        id?: unknown
        text?: unknown
        priority?: unknown
    }>
    callDurationSeconds?: unknown
}

function parseQuestionPlan(value: LiveTokenBody["questionPlan"]) {
    if (!Array.isArray(value)) {
        return undefined
    }

    const questions = value
        .map((question, index) => ({
            id:
                typeof question.id === "string" && question.id.trim()
                    ? question.id.trim()
                    : `planned-${index + 1}`,
            text: typeof question.text === "string" ? question.text.trim() : "",
            priority:
                typeof question.priority === "number" && Number.isFinite(question.priority)
                    ? question.priority
                    : (index + 1) * 10,
        }))
        .filter((question) => question.text.length > 0)

    return questions.length > 0 ? questions : undefined
}

function resolveSessionTtlMs(callDurationSeconds: unknown) {
    if (typeof callDurationSeconds !== "number" || !Number.isFinite(callDurationSeconds)) {
        return undefined
    }

    return Math.max(6 * 60 * 1000, (Math.ceil(callDurationSeconds) + 120) * 1000)
}

export async function POST(req: Request) {
    const apiKey = process.env.GEMINI_API_KEY?.trim()
    if (!apiKey) {
        return Response.json({ error: "GEMINI_API_KEY is not set" }, { status: 500 })
    }

    const body = (await req.json().catch(() => ({}))) as LiveTokenBody
    const role = body.role?.trim() || "Backend-Entwickler"

    try {
        const currentUser = await getCurrentApiIdentity()
        const profile = currentUser ? await getProfileSnapshot(currentUser.id) : null
        const token = await createLiveInterviewToken({
            apiKey,
            role,
            language: normalizeLanguage(profile?.language),
            questionPlan: parseQuestionPlan(body.questionPlan),
            sessionTtlMs: resolveSessionTtlMs(body.callDurationSeconds),
        })
        return Response.json(token)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Gemini token creation failed"
        return Response.json({ error: message }, { status: 502 })
    }
}

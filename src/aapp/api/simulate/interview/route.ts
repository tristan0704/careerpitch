import { callOpenAiChat } from "@/lib/openai"

type InterviewBody = {
    role?: string
    answer?: string
}

export async function POST(req: Request) {
    const body = (await req.json().catch(() => ({}))) as InterviewBody
    const role = body.role?.trim() || "Backend Developer"
    const answer = body.answer?.trim()

    if (!answer) {
        return Response.json({ error: "Missing answer" }, { status: 400 })
    }

    const prompt = [
        "You are an interviewer for junior and early-career candidates.",
        "The user is the candidate. Their message is their latest interview answer.",
        "Do not act like the candidate. Do not answer as if you are applying for the role.",
        "Keep the interview realistic, concise, and direct.",
        `The target role is: ${role}.`,
        "Reply as the interviewer in 2 to 5 sentences.",
        "Briefly react to the candidate's answer and then ask exactly one follow-up question.",
    ].join("\n")

    const ai = await callOpenAiChat({
        prompt,
        question: answer,
        timeoutMs: 20_000,
    })

    if (!ai.ok) {
        return Response.json({ error: "AI request failed" }, { status: 502 })
    }

    return Response.json({
        answer: ai.content,
    })
}

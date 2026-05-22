import { getCurrentApiIdentity } from "@/db-backend/auth/api-identity";
import { createApiMasterclassInterviewForUser } from "@/db-backend/learn-challenges/api-masterclass-service";

export const runtime = "nodejs";

export async function POST() {
    const currentUser = await getCurrentApiIdentity();

    if (!currentUser) {
        return Response.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    try {
        const interview = await createApiMasterclassInterviewForUser(currentUser.id);

        return Response.json({
            interview: {
                id: interview.id,
            },
            href: interview.href,
        });
    } catch (error) {
        console.error("[api/learn/challenges/api-masterclass/start]", error);

        return Response.json(
            { error: "API Masterclass konnte nicht gestartet werden." },
            { status: 500 }
        );
    }
}


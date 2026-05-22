import "server-only";

import { db } from "@/db-backend/prisma/client";
import { API_MASTERCLASS_INTERVIEW, API_MASTERCLASS_QUESTIONS } from "@/lib/learn-challenges/api-masterclass";

export async function createApiMasterclassInterviewForUser(userId: string) {
    const activeCv = await db.cvVersion.findFirst({
        where: {
            userId,
            isActive: true,
        },
        orderBy: {
            uploadedAt: "desc",
        },
        select: {
            id: true,
        },
    });

    const interview = await db.interview.create({
        data: {
            userId,
            cvVersionId: activeCv?.id ?? null,
            title: API_MASTERCLASS_INTERVIEW.title,
            role: API_MASTERCLASS_INTERVIEW.role,
            experience: API_MASTERCLASS_INTERVIEW.experience,
            companySize: API_MASTERCLASS_INTERVIEW.companySize,
            interviewMode: API_MASTERCLASS_INTERVIEW.interviewMode,
            interviewFlow: API_MASTERCLASS_INTERVIEW.flow,
            currentStep: API_MASTERCLASS_INTERVIEW.initialStep,
            status: "in_progress",
            plannedQuestions: {
                create: API_MASTERCLASS_QUESTIONS.map((question, index) => ({
                    sequence: index + 1,
                    questionKey: question.id,
                    text: question.text,
                    priority: question.priority,
                })),
            },
        },
        select: {
            id: true,
        },
    });

    return {
        id: interview.id,
        href: `/interviews/${interview.id}`,
    };
}


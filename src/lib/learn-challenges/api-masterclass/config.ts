import type { InterviewQuestion } from "@/lib/questionpool";

export const API_MASTERCLASS_FLOW = "apiMasterclass" as const;
export const API_MASTERCLASS_TEMPLATE_ID = "api-masterclass-voice";
export const API_MASTERCLASS_CALL_DURATION_SECONDS = 600;

export const API_MASTERCLASS_INTERVIEW = {
    flow: API_MASTERCLASS_FLOW,
    templateId: API_MASTERCLASS_TEMPLATE_ID,
    title: "API Masterclass Voice",
    role: "API Masterclass",
    experience: "Junior-Mid",
    companySize: "Learn Challenge",
    interviewMode: "voice" as const,
    initialStep: 2,
    callDurationSeconds: API_MASTERCLASS_CALL_DURATION_SECONDS,
};

export const API_MASTERCLASS_QUESTIONS: InterviewQuestion[] = [
    {
        id: "api-masterclass-rest-feature-design",
        text: "Du sollst eine kleine REST API für ein Produktfeature entwerfen. Welche Ressourcen, Endpunkte und Daten würdest du zuerst definieren?",
        priority: 10,
    },
    {
        id: "api-masterclass-endpoint-boundaries",
        text: "Wie entscheidest du, ob ein API-Endpunkt eher grob geschnitten oder in mehrere kleinere Ressourcen aufgeteilt werden sollte?",
        priority: 20,
    },
    {
        id: "api-masterclass-validation-errors",
        text: "Ein Client sendet unvollständige oder ungültige Daten. Wie validierst du den Request und wie sollte eine hilfreiche Fehlerantwort aussehen?",
        priority: 30,
    },
    {
        id: "api-masterclass-auth-authorization",
        text: "Erkläre den Unterschied zwischen Authentifizierung und Autorisierung an einem geschützten API-Endpunkt.",
        priority: 40,
    },
    {
        id: "api-masterclass-pagination-filtering-sorting",
        text: "Wie würdest du Pagination, Filter und Sortierung für eine Listen-API gestalten, damit sie für Clients stabil und gut nutzbar bleibt?",
        priority: 50,
    },
    {
        id: "api-masterclass-versioning",
        text: "Wann würdest du eine API versionieren, und wie gehst du mit breaking changes gegenüber bestehenden Clients um?",
        priority: 60,
    },
    {
        id: "api-masterclass-idempotency",
        text: "Ein Client schickt denselben Create-Request wegen eines Timeouts zweimal. Wie machst du den Ablauf retry-sicher?",
        priority: 70,
    },
    {
        id: "api-masterclass-production-debugging",
        text: "Eine API schlägt in Produktion nur sporadisch fehl. Welche Signale prüfst du zuerst, und wie grenzt du die Ursache ein?",
        priority: 80,
    },
    {
        id: "api-masterclass-rate-limits-timeouts-logging",
        text: "Welche Rolle spielen Rate Limits, Timeouts und strukturiertes Logging in einer API, die von mehreren Clients genutzt wird?",
        priority: 90,
    },
    {
        id: "api-masterclass-api-success-monitoring",
        text: "Woran würdest du erkennen, ob eine API für ihre Clients wirklich gut funktioniert, und welche Metriken oder Feedbacksignale waeren dir wichtig?",
        priority: 100,
    },
];


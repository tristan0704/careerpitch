import { API_MASTERCLASS_CALL_DURATION_SECONDS, API_MASTERCLASS_FLOW } from "@/lib/learn-challenges/api-masterclass";

export { API_MASTERCLASS_FLOW };

export type InterviewFlow = "standard" | typeof API_MASTERCLASS_FLOW;

export function getCallDurationSecondsForFlow(interviewFlow: InterviewFlow | null | undefined) {
    if (interviewFlow === API_MASTERCLASS_FLOW) {
        return API_MASTERCLASS_CALL_DURATION_SECONDS;
    }

    return undefined;
}

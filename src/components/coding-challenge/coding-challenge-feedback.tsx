"use client";

import { useEffect, useRef, useState } from "react";

import {
    CodingChallengeBadge,
    CodingChallengePanel,
    CodingChallengeProgressBar,
    CodingChallengeSectionHeading,
    CodingChallengeSurface,
} from "@/components/coding-challenge/coding-challenge-surface";
import { readApiErrorMessage } from "@/lib/api-error";
import { LANGUAGE_LABELS } from "@/lib/coding-challenge/labels";
import type {
    CodingChallengeDraft,
    CodingChallengeEvaluation,
} from "@/lib/coding-challenge/types";
import { useI18n } from "@/lib/i18n/context";
import { useInterviewSession } from "@/lib/interview-session/context";

// Dateiübersicht:
// Diese Auswertungsansicht lädt nur die Coding-Domäne. Ein In-flight-Guard
// verhindert doppelte Detail-GETs beim Mounten, damit nicht mehrere identische
// Reads mit voller Task- und Evaluation-Payload entstehen.

function getScoreTone(
    score: number,
    labels: {
        scoreStrong: string;
        scoreSolid: string;
        scoreWeak: string;
    }
) {
    if (score >= 75) {
        return {
            badge: "bg-green-500/20 text-green-300",
            bar: "bg-green-400",
            label: labels.scoreStrong,
        };
    }

    if (score >= 50) {
        return {
            badge: "bg-yellow-500/20 text-yellow-300",
            bar: "bg-yellow-400",
            label: labels.scoreSolid,
        };
    }

    return {
        badge: "bg-red-500/20 text-red-300",
        bar: "bg-red-400",
        label: labels.scoreWeak,
    };
}

function ScoreCard({
    title,
    value,
    feedback,
    toneLabels,
}: {
    title: string;
    value: number;
    feedback: string;
    toneLabels: Parameters<typeof getScoreTone>[1];
}) {
    const tone = getScoreTone(value, toneLabels);

    return (
        <CodingChallengePanel>
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-gray-200">{title}</p>
                <span className={`rounded-full px-3 py-1 text-xs ${tone.badge}`}>
                    {value}%
                </span>
            </div>

            <div className="mt-3">
                <CodingChallengeProgressBar value={value} className={tone.bar} />
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-300">{feedback}</p>
        </CodingChallengePanel>
    );
}

function ListCard({
    title,
    items,
    emptyLabel,
}: {
    title: string;
    items: string[];
    emptyLabel: string;
}) {
    return (
        <CodingChallengePanel>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
                {title}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-200">
                {items.length > 0 ? (
                    items.map((item) => <li key={item}>{item}</li>)
                ) : (
                    <li className="text-gray-500">{emptyLabel}</li>
                )}
            </ul>
        </CodingChallengePanel>
    );
}

export default function CodingChallengeFeedback() {
    const { dictionary, language } = useI18n();
    const session = useInterviewSession();
    const interviewId = session.interviewId;
    const [draft, setDraft] = useState<CodingChallengeDraft | null>(null);
    const [evaluation, setEvaluation] = useState<CodingChallengeEvaluation | null>(
        null
    );
    const [error, setError] = useState("");
    const hydratePromiseRef = useRef<{
        key: string;
        promise: Promise<CodingChallengeDraft>;
    } | null>(null);

    useEffect(() => {
        let cancelled = false;
        const hydrateKey = `${interviewId}:${language}`;

        async function hydrateFeedback() {
            try {
                const requestPromise =
                    hydratePromiseRef.current?.key === hydrateKey
                        ? hydratePromiseRef.current
                        : {
                              key: hydrateKey,
                              promise: (async () => {
                                  const searchParams = new URLSearchParams();
                                  searchParams.set("language", language);
                                  const response = await fetch(
                                      `/api/interviews/${interviewId}/coding?${searchParams.toString()}`,
                                      {
                                          method: "GET",
                                          cache: "no-store",
                                      }
                                  );
                                  const data = (await response.json().catch(() => null)) as
                                      | {
                                            codingChallenge?: CodingChallengeDraft | null;
                                            error?: unknown;
                                            errorMessage?: string;
                                        }
                                      | null;

                                  if (!response.ok || !data?.codingChallenge) {
                                      throw new Error(
                                          readApiErrorMessage(
                                              data,
                                              "Coding-Challenge konnte nicht geladen werden."
                                          )
                                      );
                                  }

                                  return data.codingChallenge;
                              })(),
                          };
                hydratePromiseRef.current = requestPromise;
                const codingChallenge = await requestPromise.promise;

                if (!cancelled) {
                    setDraft(codingChallenge);
                    setEvaluation(codingChallenge.evaluation ?? null);
                    setError("");
                }
            } catch (loadError) {
                if (!cancelled) {
                    setError(
                        loadError instanceof Error
                            ? loadError.message
                            : "Coding-Challenge konnte nicht geladen werden."
                    );
                }
            } finally {
                if (hydratePromiseRef.current?.key === hydrateKey) {
                    hydratePromiseRef.current = null;
                }
            }
        }

        void hydrateFeedback();

        return () => {
            cancelled = true;
        };
    }, [interviewId, language]);

    if (error) {
        return (
            <CodingChallengeSurface className="text-sm text-red-300">
                {error}
            </CodingChallengeSurface>
        );
    }

    if (!evaluation) {
        return (
            <CodingChallengeSurface className="text-sm text-gray-300">
                {dictionary.coding.submitFirst}
            </CodingChallengeSurface>
        );
    }

    const task = draft?.task;
    const overallTone = getScoreTone(evaluation.overallScore, dictionary.common);

    return (
        <div className="space-y-6">
            <CodingChallengeSurface className="!p-0 overflow-hidden">
                <div className="flex flex-col items-stretch md:flex-row">
                    <div className="min-w-0 flex-1 space-y-5 p-6 md:p-8">
                        <div className="flex flex-wrap items-center gap-2">
                            {task ? (
                                <CodingChallengeBadge className="bg-indigo-500/10 text-indigo-300 outline-indigo-300/20">
                                    {task.role}
                                </CodingChallengeBadge>
                            ) : null}
                            {task ? (
                                <CodingChallengeBadge>
                                    {dictionary.coding.difficulty[task.difficulty]}
                                </CodingChallengeBadge>
                            ) : null}
                            {task ? (
                                <CodingChallengeBadge>
                                    {LANGUAGE_LABELS[task.language]}
                                </CodingChallengeBadge>
                            ) : null}
                            <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                    evaluation.passedLikely
                                        ? "bg-green-500/20 text-green-300"
                                        : "bg-yellow-500/20 text-yellow-300"
                                }`}
                            >
                                {evaluation.passedLikely
                                    ? dictionary.coding.likelyMatch
                                    : dictionary.coding.needsWork}
                            </span>
                        </div>

                        <CodingChallengeSectionHeading
                            title={task?.name ?? dictionary.coding.feedbackTitle}
                            description={evaluation.summary}
                        />
                    </div>

                    <div className="flex shrink-0 flex-col justify-center border-t border-white/5 bg-white/[0.02] p-6 md:w-[250px] md:border-l md:border-t-0 md:p-8">
                        <div className="flex items-center justify-between gap-3">
                            <p className="text-sm text-gray-400">
                                {dictionary.coding.overallScore}
                            </p>
                            <span className={`rounded-full px-3 py-1 text-xs ${overallTone.badge}`}>
                                {overallTone.label}
                            </span>
                        </div>
                        <p className="mt-3 text-4xl font-bold tracking-tight text-white">
                            {evaluation.overallScore}%
                        </p>
                        <div className="mt-4">
                            <CodingChallengeProgressBar
                                value={evaluation.overallScore}
                                className={overallTone.bar}
                            />
                        </div>
                    </div>
                </div>
            </CodingChallengeSurface>

            <div className="grid gap-4 lg:grid-cols-3">
                <ScoreCard
                    title={dictionary.coding.correctness}
                    value={evaluation.correctness.score}
                    feedback={evaluation.correctness.feedback}
                    toneLabels={dictionary.common}
                />
                <ScoreCard
                    title={dictionary.coding.codeQuality}
                    value={evaluation.codeQuality.score}
                    feedback={evaluation.codeQuality.feedback}
                    toneLabels={dictionary.common}
                />
                <ScoreCard
                    title={dictionary.coding.problemSolving}
                    value={evaluation.problemSolving.score}
                    feedback={evaluation.problemSolving.feedback}
                    toneLabels={dictionary.common}
                />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <ListCard
                    title={dictionary.coding.strengths}
                    items={evaluation.strengths}
                    emptyLabel={dictionary.coding.emptyList}
                />
                <ListCard
                    title={dictionary.coding.risks}
                    items={evaluation.issues}
                    emptyLabel={dictionary.coding.emptyList}
                />
                <ListCard
                    title={dictionary.coding.improvements}
                    items={evaluation.improvements}
                    emptyLabel={dictionary.coding.emptyList}
                />
            </div>
        </div>
    );
}

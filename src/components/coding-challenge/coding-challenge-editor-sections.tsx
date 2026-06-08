import type { ReactNode } from "react";
import Editor from "@monaco-editor/react";

import {
    CodingChallengeBadge,
    CodingChallengePanel,
    CodingChallengeSectionHeading,
    CodingChallengeSurface,
} from "@/components/coding-challenge/coding-challenge-surface";
import { LoadingState } from "@/components/ui/LoadingState";
import { LANGUAGE_LABELS } from "@/lib/coding-challenge/labels";
import type {
    CodingChallengeLanguage,
    PublicCodingChallengeTask,
} from "@/lib/coding-challenge/types";
import { useI18n } from "@/lib/i18n/context";

function TaskPanel({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <CodingChallengePanel>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
                {title}
            </p>
            {children}
        </CodingChallengePanel>
    );
}

export function CodingChallengeLoadingState() {
    const { dictionary } = useI18n();

    return (
        <LoadingState label={dictionary.coding.loadingChallenge} />
    );
}

export function CodingChallengeErrorState({
    message,
}: {
    message: string;
}) {
    return (
        <CodingChallengeSurface className="bg-red-500/10 text-sm text-red-100 outline-red-500/30">
            {message}
        </CodingChallengeSurface>
    );
}

export function CodingChallengeSubmitState({
    message,
    tone = "neutral",
}: {
    message: string;
    tone?: "neutral" | "error" | "success";
}) {
    if (tone === "neutral") {
        return <LoadingState label={message} compact />;
    }

    const toneClassName =
        tone === "error"
            ? "bg-red-500/10 text-red-100 outline-red-500/30"
            : "bg-emerald-500/10 text-emerald-100 outline-emerald-500/30";

    return (
        <div className={`rounded-xl p-4 text-sm outline outline-1 ${toneClassName}`}>
            {message}
        </div>
    );
}

export function CodingChallengeHeader({
    task,
    isRefreshing,
    isSubmitting,
    onNewTask,
    onResetCode,
    onSubmit,
}: {
    task: PublicCodingChallengeTask;
    isRefreshing: boolean;
    isSubmitting: boolean;
    onNewTask: () => void;
    onResetCode: () => void;
    onSubmit: () => void;
}) {
    const { dictionary } = useI18n();
    const labels = dictionary.coding;

    return (
        <CodingChallengeSurface>
            <CodingChallengeSectionHeading
                eyebrow="Coding-Challenge"
                title={task.name}
                description={task.description}
                badge={
                    <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
                        <CodingChallengeBadge className="bg-indigo-500/10 text-indigo-300 outline-indigo-300/20">
                            {task.role}
                        </CodingChallengeBadge>
                        <CodingChallengeBadge>
                            {dictionary.coding.difficulty[task.difficulty]}
                        </CodingChallengeBadge>
                        <CodingChallengeBadge>
                            {LANGUAGE_LABELS[task.language]}
                        </CodingChallengeBadge>
                        <CodingChallengeBadge>
                            {task.estimatedMinutes} min
                        </CodingChallengeBadge>
                    </div>
                }
            />

            <div className="mt-5 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={onNewTask}
                    disabled={isRefreshing}
                    className="rounded-md bg-white/5 px-4 py-2.5 text-sm font-medium text-white outline outline-1 outline-white/10 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isRefreshing ? labels.loadingNewTask : labels.newTask}
                </button>
                <button
                    type="button"
                    onClick={onResetCode}
                    className="rounded-md bg-white/5 px-4 py-2.5 text-sm font-medium text-white outline outline-1 outline-white/10 transition hover:bg-white/10"
                >
                    {labels.resetCode}
                </button>
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? labels.submittingSolution : labels.submitSolution}
                </button>
            </div>
        </CodingChallengeSurface>
    );
}

export function CodingChallengeSidebar({
    task,
}: {
    task: PublicCodingChallengeTask;
}) {
    const { dictionary } = useI18n();
    const labels = dictionary.coding;

    return (
        <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
            <TaskPanel title={labels.taskSection}>
                <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-200">
                    {task.statement}
                </p>
            </TaskPanel>

            <TaskPanel title={labels.requirementsSection}>
                <ul className="mt-3 space-y-2 text-sm text-gray-200">
                    {task.requirements.map((requirement) => (
                        <li key={requirement}>{requirement}</li>
                    ))}
                </ul>
            </TaskPanel>

            {task.examples.length > 0 ? (
                <TaskPanel title={labels.examplesSection}>
                    <ul className="mt-3 space-y-2 text-sm text-gray-200">
                        {task.examples.map((example) => (
                            <li key={example}>{example}</li>
                        ))}
                    </ul>
                </TaskPanel>
            ) : null}

            {task.evaluationFocus.length > 0 ? (
                <TaskPanel title={labels.evaluationFocusSection}>
                    <ul className="mt-3 space-y-2 text-sm text-gray-200">
                        {task.evaluationFocus.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </TaskPanel>
            ) : null}
        </aside>
    );
}

export function CodingChallengeWorkspace({
    language,
    code,
    lineCount,
    characterCount,
    onCodeChange,
}: {
    language: CodingChallengeLanguage;
    code: string;
    lineCount: number;
    characterCount: number;
    onCodeChange: (value: string | undefined) => void;
}) {
    const { dictionary } = useI18n();
    const labels = dictionary.coding;

    return (
        <CodingChallengeSurface className="flex min-h-0 flex-col overflow-hidden !p-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <p className="text-sm font-semibold text-white">{labels.editorTitle}</p>

                <div className="flex flex-wrap items-center gap-2">
                    <CodingChallengeBadge>{LANGUAGE_LABELS[language]}</CodingChallengeBadge>
                    <CodingChallengeBadge>{lineCount} Zeilen</CodingChallengeBadge>
                    <CodingChallengeBadge>{characterCount} Zeichen</CodingChallengeBadge>
                </div>
            </div>

            <div className="h-[clamp(420px,58vh,620px)] min-h-0 bg-gray-950/70">
                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    theme="vs-dark"
                    onChange={onCodeChange}
                    options={{
                        automaticLayout: true,
                        fontFamily: "JetBrains Mono, Consolas, monospace",
                        fontSize: 14,
                        lineHeight: 22,
                        minimap: { enabled: false },
                        padding: { top: 16, bottom: 16 },
                        scrollBeyondLastLine: false,
                        tabSize: 4,
                        wordWrap: "on",
                    }}
                />
            </div>
        </CodingChallengeSurface>
    );
}

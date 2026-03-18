export default function Features() {
  return (
    <div id="features" className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold text-indigo-400">
            Smarter vorbereiten
          </h2>

          <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Alles für dein perfektes Interview
          </p>

          <p className="mt-6 text-lg text-gray-300">
            Bereite dich realistisch auf technische Interviews vor – von CV Analyse
            bis hin zu Coding Challenges und detailliertem Feedback.
          </p>
        </div>

        {/* Grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16">

            {/* 1 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold text-white">
                <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                <img
                  src="/icons/file-solid-full.svg"
                  className="h-5 w-5 brightness-0 invert"
                />
                                </div>
                CV hochladen & analysieren
              </dt>
              <dd className="mt-2 text-base text-gray-400">
                Lade deinen Lebenslauf hoch und erhalte direkt Feedback zu Inhalt,
                Struktur und Optimierungsmöglichkeiten.
              </dd>
            </div>

            {/* 2 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold text-white">
                <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                <img
                  src="/icons/microphone-solid-full.svg"
                  className="h-5 w-5 brightness-0 invert"
                />
                </div>
                Realistische Interviews
              </dt>
              <dd className="mt-2 text-base text-gray-400">
                Simuliere echte Bewerbungsgespräche mit typischen Fragen aus
                Tech-Interviews.
              </dd>
            </div>

            {/* 3 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold text-white">
                <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                <img
                  src="/icons/code-solid-full.svg"
                  className="h-5 w-5 brightness-0 invert"
                />
                </div>
                Coding Challenges
              </dt>
              <dd className="mt-2 text-base text-gray-400">
                Teste dein technisches Können mit praxisnahen Aufgaben und
                verbessere deine Problemlösungsfähigkeiten.
              </dd>
            </div>

            {/* 4 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold text-white">
                <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                <img
                  src="/icons/comment-solid-full.svg"
                  className="h-5 w-5 brightness-0 invert"
                />
                </div>
                Detailliertes Feedback
              </dt>
              <dd className="mt-2 text-base text-gray-400">
                Erhalte eine klare Analyse deiner Performance und konkrete Tipps
                zur Verbesserung.
              </dd>
            </div>

          </dl>
        </div>
      </div>
    </div>
  );
}
const learningStates = [
  {
    label: "Study Progress",
    value: "72%",
    status: "On Track",
  },
  {
    label: "Topic Mastery",
    value: "64%",
    status: "Improving",
  },
  {
    label: "Weekly Consistency",
    value: "86%",
    status: "Excellent",
  },
];

function AdaptiveLearning() {
  return (
    <section
      id="adaptive-learning"
      className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute left-[-200px] top-1/3 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
              Adaptive Intelligence
            </p>

            <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Your study plan
              <span className="block text-gray-400">
                evolves with you.
              </span>
            </h2>

            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              Everyone learns differently. PrepWise continuously uses your
              progress, quiz performance, and mastery levels to understand
              where you need more attention.
            </p>

            {/* Points */}
            <div className="mt-9 space-y-5">

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  ✦
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Detects your weak areas
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 leading-6">
                    AI identifies topics where your understanding needs
                    improvement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  ↻
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Adjusts your schedule
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 leading-6">
                    Missed a task or need more revision? Your upcoming plan
                    can adapt accordingly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                  ↑
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Improves your mastery
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 leading-6">
                    Focus your time where it creates the biggest learning
                    impact.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-0 bg-purple-600/10 blur-3xl" />

            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">

              {/* Header */}
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs text-gray-500">
                    AI Learning Engine
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-white">
                    Your learning status
                  </h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                  <span className="text-xs text-green-400">
                    Active
                  </span>
                </div>

              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-6">

                {learningStates.map((state) => (
                  <div
                    key={state.label}
                    className="p-4 rounded-2xl border border-white/10 bg-white/[0.03]"
                  >
                    <p className="text-[11px] text-gray-500 leading-4">
                      {state.label}
                    </p>

                    <p className="mt-3 text-xl font-bold text-white">
                      {state.value}
                    </p>

                    <p className="mt-1 text-[10px] text-purple-400">
                      {state.status}
                    </p>
                  </div>
                ))}

              </div>

              {/* Learning Flow */}
              <div className="mt-5 p-5 rounded-2xl border border-white/10 bg-black/20">

                <p className="text-xs text-gray-500">
                  Adaptive Learning Loop
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-5">

                  <div className="px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                    Study
                  </div>

                  <span className="text-gray-600">→</span>

                  <div className="px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
                    Quiz
                  </div>

                  <span className="text-gray-600">→</span>

                  <div className="px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
                    Evaluate
                  </div>

                  <span className="text-gray-600">→</span>

                  <div className="px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-xs text-green-300">
                    Adapt
                  </div>

                </div>

                {/* AI Message */}
                <div className="mt-5 p-4 rounded-xl bg-purple-500/[0.06] border border-purple-500/15">

                  <div className="flex gap-3">

                    <span className="text-purple-400">
                      ✦
                    </span>

                    <div>
                      <p className="text-xs font-medium text-white">
                        AI detected a learning gap
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-gray-500">
                        Extra revision has been added to your upcoming
                        schedule for this topic.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {/* Bottom Progress */}
              <div className="mt-5">

                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">
                    Overall Mastery
                  </span>

                  <span className="text-white font-medium">
                    76%
                  </span>
                </div>

                <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AdaptiveLearning;
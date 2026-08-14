const subjects = [
  {
    name: "Data Structures",
    progress: 88,
  },
  {
    name: "Machine Learning",
    progress: 76,
  },
  {
    name: "Database Systems",
    progress: 68,
  },
  {
    name: "Computer Networks",
    progress: 54,
  },
];

function AnalyticsPreview() {
  return (
    <section
      id="analytics"
      className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute right-[-200px] top-1/3 w-[450px] h-[450px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
            Progress Analytics
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Know exactly where
            <span className="block text-gray-400">
              you stand.
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Turn your daily learning activity into meaningful insights.
            Track progress, topic mastery, consistency, and exam readiness
            from one dashboard.
          </p>
        </div>

        {/* Analytics Dashboard */}
        <div className="relative mt-16">

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-3 gap-5">

            {/* Progress Card */}
            <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 lg:p-7">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Overall Progress
                  </p>

                  <p className="mt-2 text-4xl font-bold text-white">
                    78%
                  </p>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="text-xs text-green-400">
                    +12% this week
                  </span>
                </div>

              </div>

              {/* Fake Chart */}
              <div className="mt-8 h-48 flex items-end gap-3">

                {[35, 48, 42, 60, 55, 72, 68, 82, 78, 90, 84, 96].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 h-full flex items-end"
                    >
                      <div
                        style={{ height: `${height}%` }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-purple-500/30 to-purple-400/80 hover:from-purple-500/50 transition"
                      />
                    </div>
                  )
                )}

              </div>

              {/* Chart Labels */}
              <div className="flex justify-between mt-3 text-[11px] text-gray-600">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

            </div>

            {/* Exam Readiness */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">

              <p className="text-sm text-gray-500">
                Exam Readiness
              </p>

              <div className="mt-7 flex items-center justify-center">

                <div className="relative w-40 h-40 rounded-full border-[10px] border-white/5 border-t-blue-400 border-r-purple-400 rotate-[-25deg] flex items-center justify-center">

                  <div className="rotate-[25deg] text-center">
                    <p className="text-4xl font-bold text-white">
                      86%
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Ready
                    </p>
                  </div>

                </div>

              </div>

              <div className="mt-7 text-center">

                <p className="text-sm text-green-400">
                  You're on track 🎯
                </p>

                <p className="text-xs text-gray-600 mt-2">
                  Keep your current study consistency.
                </p>

              </div>

            </div>

            {/* Subject Mastery */}
            <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 lg:p-7">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Topic Mastery
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-white">
                    Subject Performance
                  </h3>
                </div>

                <span className="text-xs text-purple-400">
                  View details →
                </span>

              </div>

              <div className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-6">

                {subjects.map((subject) => (
                  <div key={subject.name}>

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-gray-400">
                        {subject.name}
                      </span>

                      <span className="text-xs text-white">
                        {subject.progress}%
                      </span>

                    </div>

                    <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">

                      <div
                        style={{ width: `${subject.progress}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      />

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* Consistency */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">

              <p className="text-sm text-gray-500">
                Study Consistency
              </p>

              <p className="mt-2 text-4xl font-bold text-white">
                12
                <span className="text-base font-normal text-gray-500">
                  {" "}days
                </span>
              </p>

              <p className="mt-2 text-xs text-green-400">
                🔥 Current streak
              </p>

              <div className="grid grid-cols-7 gap-2 mt-7">

                {Array.from({ length: 21 }).map((_, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-md ${
                      index < 16
                        ? "bg-purple-500/70"
                        : index < 18
                        ? "bg-purple-500/30"
                        : "bg-white/5"
                    }`}
                  />
                ))}

              </div>

              <p className="mt-4 text-xs text-gray-600">
                Keep learning consistently.
              </p>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default AnalyticsPreview;
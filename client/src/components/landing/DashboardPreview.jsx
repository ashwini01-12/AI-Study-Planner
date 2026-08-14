function DashboardPreview() {
  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl" />

      {/* Dashboard Card */}
      <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-400">
              Good morning 👋
            </p>

            <h2 className="text-xl font-semibold text-white mt-1">
              Today's Study Plan
            </h2>
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold text-white">
            R
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-5">

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                Today's Progress
              </p>

              <p className="text-3xl font-bold text-white mt-1">
                82%
              </p>
            </div>

            <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-400 flex items-center justify-center text-xs text-white">
              82%
            </div>
          </div>

          <div className="mt-5 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[82%] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
          </div>

        </div>

        {/* Tasks */}
        <div className="mt-5 space-y-3">

          {/* Completed Task */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">

            <div className="w-9 h-9 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center">
              ✓
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                Data Structures
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Arrays & Linked Lists
              </p>
            </div>

            <span className="text-xs text-green-400">
              Completed
            </span>

          </div>

          {/* Active Task */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">

            <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              ◉
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                Machine Learning
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Decision Trees
              </p>
            </div>

            <span className="text-xs text-purple-400">
              45 min
            </span>

          </div>

          {/* Quiz */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">

            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              ?
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                AI Quiz
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Test your mastery
              </p>
            </div>

            <span className="text-xs text-blue-400">
              10 Qs
            </span>

          </div>

        </div>

        {/* AI Recommendation */}
        <div className="mt-5 p-4 rounded-2xl border border-purple-500/20 bg-purple-500/[0.06]">

          <div className="flex gap-3">

            <div className="text-purple-400 text-lg">
              ✦
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                AI Recommendation
              </p>

              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                You're progressing well. Focus on Machine Learning
                today to stay on track with your goal.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default DashboardPreview;
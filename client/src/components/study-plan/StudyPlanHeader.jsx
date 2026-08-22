function StudyPlanHeader({
  goals = [],
  selectedGoalId,
  onGoalChange,
  onGenerate,
  generating = false,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

      {/* Heading */}
      <div>
        <p className="text-sm font-medium text-purple-400">
          Your Personalized Plan
        </p>

        <h1 className="mt-2 text-3xl lg:text-4xl font-bold text-white">
          Study Plan
        </h1>

        <p className="mt-3 max-w-2xl text-sm lg:text-base text-gray-500 leading-6">
          Generate and follow an AI-powered study schedule based on your
          goal, syllabus, available time, and target date.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

        {/* Goal Selector */}
        <div className="w-full sm:w-64">
          <label
            htmlFor="study-goal"
            className="block text-xs text-gray-600 mb-2"
          >
            Active Goal
          </label>

          <select
            id="study-goal"
            value={selectedGoalId}
            onChange={(e) => onGoalChange(e.target.value)}
            disabled={generating || goals.length === 0}
            className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-gray-300 outline-none focus:border-purple-500/50 transition disabled:opacity-50"
          >
            <option value="">
              Select a goal
            </option>

            {goals.map((goal) => (
              <option key={goal._id} value={goal._id}>
                {goal.title}
              </option>
            ))}
          </select>
        </div>

        {/* Generate Button */}
        <div className="sm:self-end">
          <button
            type="button"
            onClick={onGenerate}
            disabled={!selectedGoalId || generating}
            className="w-full h-12 px-5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {generating
              ? "Generating..."
              : "✨ Generate Study Plan"}
          </button>
        </div>

      </div>

    </div>
  );
}

export default StudyPlanHeader;
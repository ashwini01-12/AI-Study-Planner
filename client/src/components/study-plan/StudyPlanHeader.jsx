function StudyPlanHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      {/* Heading */}
      <div>
        <p className="text-sm font-medium text-purple-400">
          Your Personalized Plan
        </p>

        <h1 className="mt-2 text-3xl lg:text-4xl font-bold text-white">
          Study Plan
        </h1>

        <p className="mt-3 max-w-2xl text-sm lg:text-base text-gray-500 leading-6">
          Follow your personalized schedule, complete daily tasks,
          and stay on track toward your learning goal.
        </p>
      </div>

      {/* Goal Selector */}
      <div className="w-full lg:w-auto">
        <label
          htmlFor="study-goal"
          className="block text-xs text-gray-600 mb-2"
        >
          Active Goal
        </label>

        <select
          id="study-goal"
          defaultValue="ml"
          className="w-full lg:w-56 h-12 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-gray-300 outline-none focus:border-purple-500/50 transition"
        >
          <option value="ml">
            Machine Learning Exam
          </option>

          <option value="java">
            Java DSA
          </option>
        </select>
      </div>

    </div>
  );
}

export default StudyPlanHeader;
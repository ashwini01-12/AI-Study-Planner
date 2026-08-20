function GoalsHeader({ onCreateGoal }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
      
      {/* Heading */}
      <div>
        <p className="text-sm text-purple-400 font-medium">
          Your Learning Journey
        </p>

        <h1 className="mt-2 text-3xl lg:text-4xl font-bold text-white">
          My Goals
        </h1>

        <p className="mt-3 max-w-2xl text-sm lg:text-base text-gray-500 leading-6">
          Define what you want to achieve and let PrepWise help you
          turn your goals into an actionable study plan.
        </p>
      </div>

      {/* Create Goal */}
      <button
        type="button"
        onClick={onCreateGoal}
        className="w-fit shrink-0 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition"
      >
        + Create Goal
      </button>

    </div>
  );
}

export default GoalsHeader;
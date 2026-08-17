function AIRecommendation() {
  return (
    <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.05] p-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            ✦
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-purple-400">
              AI Assistant
            </p>

            <h3 className="mt-1 text-lg font-semibold text-white">
              Smart Recommendation
            </h3>
          </div>

        </div>

        <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[11px] text-green-400">
          Active
        </span>
      </div>

      {/* Recommendation */}
      <div className="mt-6">

        <p className="text-sm leading-6 text-gray-300">
          Your recent quiz performance shows that
          <span className="text-white font-medium"> Machine Learning </span>
          needs a little more revision.
        </p>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          PrepWise recommends adding an extra revision session before
          moving to the next topic.
        </p>

      </div>

      {/* Recommendation Details */}
      <div className="mt-6 p-4 rounded-xl bg-black/20 border border-white/5">

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Recommended action
          </span>

          <span className="text-xs text-purple-400">
            +30 min
          </span>
        </div>

        <p className="mt-2 text-sm font-medium text-white">
          Revise Decision Trees
        </p>

        <p className="mt-1 text-xs text-gray-600">
          Focus on splitting criteria and overfitting.
        </p>

      </div>

      {/* Action */}
      <button
        type="button"
        className="w-full mt-5 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-300 hover:bg-purple-500/20 transition"
      >
        View Updated Plan →
      </button>

    </div>
  );
}

export default AIRecommendation;
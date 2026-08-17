function ProgressCard({ progress = 78 }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Study Progress
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {progress}%
          </h3>

          <p className="mt-2 text-xs text-green-400">
            +12% this week
          </p>
        </div>

        {/* Circular Progress */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(#a855f7 ${progress * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
          }}
        >
          <div className="w-12 h-12 rounded-full bg-[#0b0b16] flex items-center justify-center">
            <span className="text-xs font-semibold text-white">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">
            Weekly goal
          </span>

          <span className="text-gray-400">
            6 / 8 hours
          </span>
        </div>

        <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressCard;
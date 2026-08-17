const tasks = [
  {
    id: 1,
    subject: "Data Structures",
    topic: "Arrays & Linked Lists",
    duration: "45 min",
    status: "completed",
  },
  {
    id: 2,
    subject: "Machine Learning",
    topic: "Decision Trees",
    duration: "60 min",
    status: "current",
  },
  {
    id: 3,
    subject: "DBMS",
    topic: "Normalization",
    duration: "40 min",
    status: "pending",
  },
  {
    id: 4,
    subject: "AI Quiz",
    topic: "Test your mastery",
    duration: "10 Qs",
    status: "pending",
  },
];

function TodayTasks() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Your Schedule
          </p>

          <h3 className="mt-1 text-xl font-semibold text-white">
            Today's Tasks
          </h3>
        </div>

        <span className="text-xs text-purple-400">
          2 / 4 completed
        </span>
      </div>

      {/* Tasks */}
      <div className="mt-6 space-y-3">

        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition"
          >
            {/* Status */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                task.status === "completed"
                  ? "bg-green-500/10 text-green-400"
                  : task.status === "current"
                  ? "bg-purple-500/10 text-purple-400"
                  : "bg-white/[0.04] text-gray-500"
              }`}
            >
              {task.status === "completed"
                ? "✓"
                : task.status === "current"
                ? "◉"
                : "○"}
            </div>

            {/* Task Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">
                {task.subject}
              </p>

              <p className="mt-1 text-xs text-gray-500 truncate">
                {task.topic}
              </p>
            </div>

            {/* Duration */}
            <span className="hidden sm:block text-xs text-gray-500">
              {task.duration}
            </span>

            {/* Action */}
            {task.status === "completed" ? (
              <span className="text-xs text-green-400">
                Done
              </span>
            ) : (
              <button
                type="button"
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                  task.status === "current"
                    ? "bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20"
                    : "bg-white/[0.04] text-gray-400 border border-white/10 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {task.status === "current" ? "Continue" : "Start"}
              </button>
            )}
          </div>
        ))}

      </div>

      {/* Footer */}
      <button
        type="button"
        className="w-full mt-5 py-3 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition"
      >
        View Full Study Plan →
      </button>

    </div>
  );
}

export default TodayTasks;
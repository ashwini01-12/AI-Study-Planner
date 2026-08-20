function StudyTask({ task, onToggle }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          task.completed
            ? "bg-green-500/10 text-green-400"
            : task.type === "Quiz"
            ? "bg-blue-500/10 text-blue-400"
            : "bg-purple-500/10 text-purple-400"
        }`}
      >
        {task.completed ? "✓" : task.type === "Quiz" ? "?" : "◉"}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            task.completed
              ? "text-gray-500 line-through"
              : "text-white"
          }`}
        >
          {task.title}
        </p>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-gray-600">
            {task.subject}
          </span>

          {task.topic && (
            <>
              <span className="text-xs text-gray-600">•</span>

              <span className="text-xs text-gray-600">
                {task.topic}
              </span>
            </>
          )}

          <span className="text-xs text-gray-600">•</span>

          <span className="text-xs text-gray-600">
            {task.duration} min
          </span>
        </div>
      </div>

      {task.completed ? (
        <span className="text-xs text-green-400">
          Completed
        </span>
      ) : (
        <button
          type="button"
          onClick={() => onToggle(task._id)}
          className="px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-xs text-gray-400 hover:text-white hover:bg-white/[0.06] transition"
        >
          Complete
        </button>
      )}
    </div>
  );
}

export default StudyTask;
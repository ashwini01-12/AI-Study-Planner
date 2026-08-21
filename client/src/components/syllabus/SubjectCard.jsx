function SubjectCard({ subject, onToggleTopic, onDeleteSubject }) {
  const topics = subject.topics || [];

  const completedTopics = topics.filter(
    (topic) => topic.completed
  ).length;

  const totalTopics = topics.length;

  const progress =
    totalTopics === 0
      ? 0
      : Math.round((completedTopics / totalTopics) * 100);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] hover:border-purple-500/20 transition">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-purple-400">
            Subject
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            {subject.name}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-white">
            {progress}%
          </p>

          <p className="text-[11px] text-gray-600">
            {completedTopics}/{totalTopics} completed
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-5">
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Topics */}
      <div className="mt-6 space-y-2">
        {topics.length === 0 ? (
          <p className="text-sm text-gray-600 text-center py-4">
            No topics added yet.
          </p>
        ) : (
          topics.map((topic) => (
            <button
              key={topic._id}
              type="button"
              onClick={() =>
                onToggleTopic(
                  subject._id,
                  topic._id,
                  topic.completed
                )
              }
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition text-left"
            >
              {/* Checkbox */}
              <span
                className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 text-xs transition ${
                  topic.completed
                    ? "bg-purple-500/20 border-purple-500/30 text-purple-300"
                    : "bg-white/[0.03] border-white/10 text-gray-600"
                }`}
              >
                {topic.completed ? "✓" : ""}
              </span>

              {/* Topic */}
              <span
                className={`text-sm ${
                  topic.completed
                    ? "text-gray-500 line-through"
                    : "text-gray-300"
                }`}
              >
                {topic.name}
              </span>
            </button>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between gap-3">
        
        <div>
          <span className="text-xs text-gray-600">
            {totalTopics} topic{totalTopics !== 1 ? "s" : ""}
          </span>

          <p
            className={`mt-1 text-xs ${
              progress === 100
                ? "text-green-400"
                : "text-purple-400"
            }`}
          >
            {progress === 100
              ? "Completed ✓"
              : "In Progress"}
          </p>
        </div>

        {/* Delete Subject */}
        <button
          type="button"
          onClick={() => onDeleteSubject(subject._id)}
          className="px-3 py-2 rounded-lg border border-red-500/10 bg-red-500/[0.03] text-xs text-red-400 hover:bg-red-500/10 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default SubjectCard;
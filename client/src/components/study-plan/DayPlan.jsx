import StudyTask from "./StudyTask";

function DayPlan({ day, onToggleTask, onStartTask }) {
  const completedTasks = day.tasks.filter(
    (task) => task.completed
  ).length;

  const totalTasks = day.tasks.length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      {/* Day Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-white">
              {day.day}
            </h2>

            <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-300">
              {day.date}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Focus: {day.focus}
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-sm font-semibold text-white">
            {completedTasks}/{totalTasks}
          </p>

          <p className="text-xs text-gray-600">
            tasks completed
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="mt-5 space-y-3">
        {day.tasks.map((task) => (
          <StudyTask
            key={task._id}
            task={task}
            onToggle={onToggleTask}
          />
        ))}
      </div>

    </div>
  );
}

export default DayPlan;
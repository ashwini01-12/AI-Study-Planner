import { useNavigate } from "react-router-dom";

function GoalCard({ goal, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] hover:border-purple-500/20 transition">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-purple-400">
            Learning Goal
          </p>

          <h3 className="mt-3 text-xl font-semibold text-white">
            {goal.title}
          </h3>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[11px] text-green-400">
          {goal.status}
        </span>

      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-gray-500">
        {goal.description || "No description added."}
      </p>

      {/* Progress */}
      <div className="mt-6">

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">
            Progress
          </span>

          <span className="text-white font-medium">
            {goal.progress}%
          </span>
        </div>

        <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            style={{ width: `${goal.progress}%` }}
          />
        </div>

      </div>

      {/* Goal Info */}
      <div className="mt-6 pt-5 border-t border-white/5 space-y-3">

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">
            Target Date
          </span>

          <span className="text-xs text-gray-300">
            {goal.examDate}
          </span>
        </div>

        {goal.dailyStudyHours && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">
              Daily Study
            </span>

            <span className="text-xs text-gray-300">
              {goal.dailyStudyHours} hrs/day
            </span>
          </div>
        )}

      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-5">

        <button
          type="button"
          onClick={() => onEdit(goal)}
          className="py-3 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(goal.id)}
          className="py-3 rounded-xl border border-red-500/10 bg-red-500/[0.03] text-sm text-red-400 hover:bg-red-500/10 transition"
        >
          Delete
        </button>

      </div>


      {/* Manage Syllabus */}
      <button
        type="button"
        onClick={() => navigate(`/goals/${goal._id}/syllabus`)}
        className="w-full mt-5 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300 hover:bg-purple-500/20 transition"
      >
        Manage Syllabus →
      </button>

    </div>
  );
}

export default GoalCard;
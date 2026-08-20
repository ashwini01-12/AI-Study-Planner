import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios.js";

function TodayTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completingTask, setCompletingTask] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/plans/today");

        const plan = response.data.plan;

        setTasks(plan?.tasks || []);
      } catch (error) {
        console.error("GET TODAY TASKS ERROR:", error);
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
          return;
        }

        if (error.response?.status === 404) {
          setTasks([]);
          setError("No study plan for today.");
        } else {
          setError(
            error.response?.data?.message ||
              "Failed to load today's tasks."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodayTasks();
  }, [navigate]);

  const handleCompleteTask = async (taskId) => {
    try {
      setCompletingTask(taskId);
      setError("");

      await api.patch(`/plans/tasks/${taskId}/complete`);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? {
                ...task,
                completed: true,
              }
            : task
        )
      );
    } catch (error) {
      console.error("COMPLETE TASK ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);

      setError(
        error.response?.data?.message ||
          "Failed to complete the task."
      );
    } finally {
      setCompletingTask(null);
    }
  };

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm text-gray-500">
          Loading today's tasks...
        </p>
      </div>
    );
  }

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
          {completedCount} / {tasks.length} completed
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!error && tasks.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-white/10 p-8 text-center">
          <p className="text-sm text-gray-500">
            No tasks planned for today.
          </p>
        </div>
      )}

      {/* Tasks */}
      {tasks.length > 0 && (
        <div className="mt-6 space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="group flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition"
            >
              {/* Status */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  task.completed
                    ? "bg-green-500/10 text-green-400"
                    : task.type === "Quiz"
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-purple-500/10 text-purple-400"
                }`}
              >
                {task.completed
                  ? "✓"
                  : task.type === "Quiz"
                  ? "?"
                  : "◉"}
              </div>

              {/* Task Info */}
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

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-600">
                    {task.subject}
                  </span>

                  {task.topic && (
                    <>
                      <span className="text-xs text-gray-700">
                        •
                      </span>

                      <span className="text-xs text-gray-600">
                        {task.topic}
                      </span>
                    </>
                  )}

                  <span className="text-xs text-gray-700">
                    •
                  </span>

                  <span className="text-xs text-gray-600">
                    {task.duration} min
                  </span>
                </div>
              </div>

              {/* Action */}
              {task.completed ? (
                <span className="text-xs text-green-400">
                  Done
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCompleteTask(task._id)}
                  disabled={completingTask === task._id}
                  className="px-3 py-2 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {completingTask === task._id
                    ? "Saving..."
                    : "Complete"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <button
        type="button"
        onClick={() => navigate("/study-plan")}
        className="w-full mt-5 py-3 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition"
      >
        View Full Study Plan →
      </button>
    </div>
  );
}

export default TodayTasks;
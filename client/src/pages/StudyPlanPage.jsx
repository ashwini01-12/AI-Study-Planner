import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar.jsx";
import Topbar from "../components/dashboard/Topbar.jsx";

import StudyPlanHeader from "../components/study-plan/StudyPlanHeader.jsx";
import StudyPlanSummary from "../components/study-plan/StudyPlanSummary.jsx";
import DayPlan from "../components/study-plan/DayPlan.jsx";

import api from "../api/axios.js";

function StudyPlanPage() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completingTask, setCompletingTask] = useState(null);

  useEffect(() => {
    const fetchTodayPlan = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/plans/today");

        console.log("TODAY PLAN:", response.data);

        setPlan(response.data.plan);
      } catch (error) {
        console.error("GET TODAY PLAN ERROR:", error);
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);

        if (error.response?.status === 404) {
          setError("No study plan has been generated for today yet.");
        } else {
          setError(
            error.response?.data?.message ||
              "Failed to load your study plan."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodayPlan();
  }, []);

  const handleCompleteTask = async (taskId) => {
    try {
      setCompletingTask(taskId);
      setError("");

      const response = await api.patch(
        `/plans/tasks/${taskId}/complete`
      );

      console.log("TASK COMPLETED:", response.data);

      setPlan((prevPlan) => {
        if (!prevPlan) return prevPlan;

        return {
          ...prevPlan,
          tasks: prevPlan.tasks.map((task) =>
            task._id === taskId
              ? {
                  ...task,
                  completed: true,
                }
              : task
          ),
        };
      });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070711] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto rounded-full border-2 border-purple-500/20 border-t-purple-400 animate-spin" />

          <p className="mt-4 text-sm text-gray-500">
            Loading your study plan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      <Sidebar />

      <main className="lg:ml-64 min-h-screen">
        <Topbar />

        <div className="p-6 lg:p-8">
          <StudyPlanHeader />

          {error && (
            <div className="mt-6 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-sm text-red-400">
              {error}
            </div>
          )}

          {!plan ? (
            <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-12 text-center">
              <p className="text-white font-medium">
                No study plan for today
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Your personalized daily plan will appear here once it is
                generated.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-8">
                <StudyPlanSummary plan={[plan]} />
              </div>

              <div className="mt-8">
                <DayPlan
                  day={{
                    id: plan._id,
                    day: new Date(plan.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    }),
                    date: new Date(plan.date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    }),
                    focus:
                      plan.goalId?.title || "Today's Study Plan",
                    tasks: plan.tasks,
                  }}
                  onToggleTask={handleCompleteTask}
                  onStartTask={() => {}}
                  completingTask={completingTask}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default StudyPlanPage;
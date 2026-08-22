import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar.jsx";
import Topbar from "../components/dashboard/Topbar.jsx";

import StudyPlanHeader from "../components/study-plan/StudyPlanHeader.jsx";
import StudyPlanSummary from "../components/study-plan/StudyPlanSummary.jsx";
import DayPlan from "../components/study-plan/DayPlan.jsx";

import api from "../api/axios.js";

function StudyPlanPage() {
  const [goals, setGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState("");

  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch goals + current week's plans
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [goalsResponse, plansResponse] = await Promise.all([
          api.get("/goals"),
          api.get("/plans/weekly"),
        ]);

        const fetchedGoals = goalsResponse.data.goals || [];

        setGoals(fetchedGoals);

        if (fetchedGoals.length > 0) {
          setSelectedGoalId(fetchedGoals[0]._id);
        }

        setPlans(plansResponse.data.plans || []);
      } catch (error) {
        console.error("STUDY PLAN LOAD ERROR:", error);
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login", { replace: true });
          return;
        }

        setError(
          error.response?.data?.message ||
            "Failed to load study plan data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Generate AI study plan
  const handleGeneratePlan = async () => {
    if (!selectedGoalId) {
      setError("Please select a goal first.");
      return;
    }

    try {
      setGenerating(true);
      setError("");

      const response = await api.post("/plans/generate", {
        goalId: selectedGoalId,
      });

      console.log("GENERATED PLAN:", response.data);

      // Backend returns 7 newly generated plans
      const generatedPlans = response.data.plans || [];

      setPlans(generatedPlans);
    } catch (error) {
      console.error("GENERATE PLAN ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);

      setError(
        error.response?.data?.message ||
          "Failed to generate study plan."
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleTask = async (dayId, taskId) => {
    const task = plans
      .find((plan) => plan._id === dayId)
      ?.tasks.find((item) => item._id === taskId);

    if (!task || task.completed) {
      return;
    }

    try {
      await api.patch(`/plans/tasks/${taskId}/complete`);

      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan._id === dayId
            ? {
                ...plan,
                tasks: plan.tasks.map((item) =>
                  item._id === taskId
                    ? {
                        ...item,
                        completed: true,
                      }
                    : item
                ),
              }
            : plan
        )
      );
    } catch (error) {
      console.error("COMPLETE TASK ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to complete task."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070711] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto rounded-full border-2 border-purple-500/20 border-t-purple-400 animate-spin" />

          <p className="mt-4 text-sm text-gray-500">
            Loading study plan...
          </p>
        </div>
      </div>
    );
  }

  const selectedPlans = plans.filter(
    (plan) =>
      !selectedGoalId ||
      plan.goalId?._id === selectedGoalId ||
      plan.goalId === selectedGoalId
  );

  const summaryPlan = selectedPlans.map((plan) => ({
    id: plan._id,
    tasks: plan.tasks,
  }));

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      <Sidebar />

      <main className="lg:ml-64 min-h-screen">
        <Topbar />

        <div className="p-6 lg:p-8">

          <StudyPlanHeader
            goals={goals}
            selectedGoalId={selectedGoalId}
            onGoalChange={setSelectedGoalId}
            onGenerate={handleGeneratePlan}
            generating={generating}
          />

          {/* Error */}
          {error && (
            <div className="mt-6 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Summary */}
          {selectedPlans.length > 0 && (
            <div className="mt-8">
              <StudyPlanSummary plan={summaryPlan} />
            </div>
          )}

          {/* No Plan */}
          {selectedPlans.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-12 text-center">
              <p className="text-white font-medium">
                No study plan generated yet
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Select a goal and generate your personalized 7-day
                study plan with AI.
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-5">

              {selectedPlans.map((plan) => (
                <DayPlan
                  key={plan._id}
                  day={{
                    id: plan._id,
                    day: new Date(plan.date).toLocaleDateString(
                      "en-US",
                      { weekday: "long" }
                    ),
                    date: new Date(plan.date).toLocaleDateString(
                      "en-US",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    ),
                    focus:
                      plan.goalId?.title ||
                      "Personalized Study Plan",
                    tasks: plan.tasks,
                  }}
                  onToggleTask={handleToggleTask}
                  onStartTask={() => {}}
                />
              ))}

            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default StudyPlanPage;
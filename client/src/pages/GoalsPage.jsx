import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar.jsx";
import Topbar from "../components/dashboard/Topbar.jsx";

import GoalCard from "../components/goals/GoalCard.jsx";
import GoalForm from "../components/goals/GoalForm.jsx";
import GoalsHeader from "../components/goals/GoalsHeader.jsx";

import api from "../api/axios.js";

function GoalsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [goals, setGoals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch goals
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/goals");

        console.log("GET GOALS:", response.data);

        setGoals(response.data.goals || []);
      } catch (error) {
        console.error("GET GOALS ERROR:", error);
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);

        setError(
          error.response?.data?.message ||
            "Failed to load your goals."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  // Create goal
  const handleCreateGoal = async (goalData) => {
    try {
      setSaving(true);
      setError("");

      const response = await api.post("/goals", goalData);

      console.log("CREATE GOAL:", response.data);

      const newGoal = response.data.goal;

      setGoals((prev) => [newGoal, ...prev]);

      setShowForm(false);
    } catch (error) {
      console.error("CREATE GOAL ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);

      setError(
        error.response?.data?.message ||
          "Failed to create goal."
      );
    } finally {
      setSaving(false);
    }
  };

  // Temporary edit handler
  // Backend does not have update API yet
  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);

    setError(
      "Edit mode is currently UI-only. Backend update API is not available yet."
    );
  };

  // Temporary delete handler
  // Backend does not have delete API yet
  const handleDeleteGoal = () => {
    setError(
      "Delete is currently unavailable because the backend delete API is not ready yet."
    );
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingGoal(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      <Sidebar />

      <main className="lg:ml-64 min-h-screen">
        <Topbar />

        <div className="p-6 lg:p-8">

          {/* Header */}
          <GoalsHeader
            onCreateGoal={() => {
              setEditingGoal(null);
              setError("");
              setShowForm(true);
            }}
          />

          {/* Error */}
          {error && (
            <div className="mt-6 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          {showForm && (
            <div className="mt-8">
              <GoalForm
                editingGoal={editingGoal}
                onSubmit={
                  editingGoal
                    ? handleEditGoal
                    : handleCreateGoal
                }
                onCancel={handleFormCancel}
                loading={saving}
              />
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="mt-16 flex justify-center">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto rounded-full border-2 border-purple-500/20 border-t-purple-400 animate-spin" />

                <p className="mt-4 text-sm text-gray-500">
                  Loading your goals...
                </p>
              </div>
            </div>
          ) : goals.length > 0 ? (
            <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {goals.map((goal) => (
                <GoalCard
                  key={goal._id}
                  goal={{
                    ...goal,
                    id: goal._id,
                    progress: 0,
                    status: "Active",
                    examDate: goal.deadline,
                  }}
                  onEdit={handleEditGoal}
                  onDelete={handleDeleteGoal}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-12 text-center">

              <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xl">
                +
              </div>

              <p className="mt-5 text-white font-medium">
                No goals yet
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Create your first learning goal to start building your study plan.
              </p>

              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-5 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-semibold text-white"
              >
                Create Your First Goal →
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default GoalsPage;
import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar.jsx";
import Topbar from "../components/dashboard/Topbar.jsx";

import GoalCard from "../components/goals/GoalCard.jsx";
import GoalForm from "../components/goals/GoalForm.jsx";
import GoalsHeader from "../components/goals/GoalsHeader.jsx";

import api from "../api/axios.js";

function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch goals
  const fetchGoals = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/goals");

      setGoals(response.data.goals || []);
    } catch (error) {
      console.error("GET GOALS ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }

      setError(
        error.response?.data?.message ||
          "Failed to load your goals."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Create / Update
  const handleSubmitGoal = async (goalData) => {
    try {
      setSaving(true);
      setError("");

      if (editingGoal) {
        const response = await api.patch(
          `/goals/${editingGoal._id}`,
          goalData
        );

        const updatedGoal = response.data.goal;

        setGoals((prev) =>
          prev.map((goal) =>
            goal._id === updatedGoal._id
              ? updatedGoal
              : goal
          )
        );
      } else {
        const response = await api.post("/goals", goalData);

        const newGoal = response.data.goal;

        setGoals((prev) => [newGoal, ...prev]);
      }

      setShowForm(false);
      setEditingGoal(null);
    } catch (error) {
      console.error("SAVE GOAL ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);

      setError(
        error.response?.data?.message ||
          "Failed to save goal."
      );
    } finally {
      setSaving(false);
    }
  };

  // Edit
  const handleEditGoal = (goal) => {
    setError("");
    setEditingGoal(goal);
    setShowForm(true);
  };

  // Delete
  const handleDeleteGoal = async (goalId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(goalId);
      setError("");

      await api.delete(`/goals/${goalId}`);

      setGoals((prev) =>
        prev.filter((goal) => goal._id !== goalId)
      );
    } catch (error) {
      console.error("DELETE GOAL ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);

      setError(
        error.response?.data?.message ||
          "Failed to delete goal."
      );
    } finally {
      setDeletingId(null);
    }
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
                onSubmit={handleSubmitGoal}
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
                  deleting={deletingId === goal._id}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-12 text-center">
              <p className="text-white font-medium">
                No goals yet
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Create your first learning goal to get started.
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
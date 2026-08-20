import { useEffect, useState } from "react";

function GoalForm({
  editingGoal,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    title: "",
    deadline: "",
    dailyStudyHours: "",
    level: "beginner",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        title: editingGoal.title || "",
        deadline: editingGoal.deadline
          ? editingGoal.deadline.split("T")[0]
          : "",
        dailyStudyHours: editingGoal.dailyStudyHours || "",
        level: editingGoal.level || "beginner",
      });
    } else {
      setFormData({
        title: "",
        deadline: "",
        dailyStudyHours: "",
        level: "beginner",
      });
    }

    setError("");
  }, [editingGoal]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!formData.title.trim()) {
      setError("Please enter a goal title.");
      return;
    }

    if (!formData.deadline) {
      setError("Please select a deadline.");
      return;
    }

    const selectedDate = new Date(formData.deadline);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError("Deadline must be a future date.");
      return;
    }

    if (!formData.dailyStudyHours) {
      setError("Please enter your daily study hours.");
      return;
    }

    const hours = Number(formData.dailyStudyHours);

    if (Number.isNaN(hours) || hours < 1 || hours > 24) {
      setError("Daily study hours must be between 1 and 24.");
      return;
    }

    const goalData = {
      title: formData.title.trim(),
      deadline: formData.deadline,
      dailyStudyHours: hours,
      level: formData.level,
      subjects: editingGoal?.subjects || [],
      weakAreas: editingGoal?.weakAreas || [],
    };

    if (editingGoal) {
      onSubmit({
        ...editingGoal,
        ...goalData,
      });
    } else {
      onSubmit(goalData);
    }
  };

  return (
    <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-8">
      {/* Header */}
      <div>
        <p className="text-sm text-purple-400 font-medium">
          {editingGoal ? "Edit Goal" : "New Goal"}
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          {editingGoal
            ? "Update your learning goal"
            : "Create a learning goal"}
        </h2>

        <p className="mt-2 text-sm text-gray-500 leading-6">
          {editingGoal
            ? "Update your goal details and keep your study plan aligned."
            : "Set your target so PrepWise can build a personalized study plan."}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mt-6 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        {/* Goal Title */}
        <div>
          <label
            htmlFor="goal-title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Goal Title
          </label>

          <input
            id="goal-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Prepare for Machine Learning Exam"
            disabled={loading}
            className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Deadline */}
        <div>
          <label
            htmlFor="goal-deadline"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Target / Exam Date
          </label>

          <input
            id="goal-deadline"
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            disabled={loading}
            className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-gray-300 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Study Hours + Level */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Daily Hours */}
          <div>
            <label
              htmlFor="daily-study-hours"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Daily Study Hours
            </label>

            <input
              id="daily-study-hours"
              type="number"
              name="dailyStudyHours"
              value={formData.dailyStudyHours}
              onChange={handleChange}
              min="1"
              max="24"
              step="1"
              placeholder="e.g. 3"
              disabled={loading}
              className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Level */}
          <div>
            <label
              htmlFor="goal-level"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Current Level
            </label>

            <select
              id="goal-level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              disabled={loading}
              className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-gray-300 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-xl border border-purple-500/10 bg-purple-500/[0.04] p-4">
          <p className="text-xs leading-5 text-gray-500">
            After creating the goal, you can add subjects and topics through
            the Syllabus module.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-3 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading
              ? editingGoal
                ? "Updating Goal..."
                : "Creating Goal..."
              : editingGoal
              ? "Update Goal →"
              : "Create Goal →"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GoalForm;
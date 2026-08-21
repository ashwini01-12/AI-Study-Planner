import { useState } from "react";

function SyllabusForm({ onSubmit, onCancel, loading = false }) {
  const [subjectName, setSubjectName] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");

  // Add Topic
  const handleAddTopic = () => {
    const topic = topicInput.trim();

    if (!topic) {
      setError("Please enter a topic.");
      return;
    }

    // Prevent duplicate topics
    if (
      topics.some(
        (item) =>
          item.name.toLowerCase() === topic.toLowerCase()
      )
    ) {
      setError("This topic has already been added.");
      return;
    }

    setTopics((prev) => [
      ...prev,
      {
        name: topic,
      },
    ]);

    setTopicInput("");
    setError("");
  };

  // Remove Topic
  const handleRemoveTopic = (indexToRemove) => {
    setTopics((prev) =>
      prev.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (!subjectName.trim()) {
      setError("Please enter a subject name.");
      return;
    }

    if (topics.length === 0) {
      setError("Please add at least one topic.");
      return;
    }

    setError("");

    onSubmit({
      name: subjectName.trim(),
      topics,
    });
  };

  return (
    <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-8">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-purple-400">
          New Subject
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Add a subject
        </h2>

        <p className="mt-2 text-sm text-gray-500 leading-6">
          Add the subject and break it down into the topics
          you want to study.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-sm text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-6"
      >

        {/* Subject */}
        <div>
          <label
            htmlFor="subject-name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Subject Name
          </label>

          <input
            id="subject-name"
            type="text"
            value={subjectName}
            disabled={loading}
            onChange={(e) => {
              setSubjectName(e.target.value);

              if (error) {
                setError("");
              }
            }}
            placeholder="e.g. Machine Learning"
            className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition disabled:opacity-50"
          />
        </div>

        {/* Topic Input */}
        <div>
          <label
            htmlFor="topic-input"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Add Topics
          </label>

          <div className="flex gap-3">
            <input
              id="topic-input"
              type="text"
              value={topicInput}
              disabled={loading}
              onChange={(e) => {
                setTopicInput(e.target.value);

                if (error) {
                  setError("");
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTopic();
                }
              }}
              placeholder="e.g. Decision Trees"
              className="flex-1 h-12 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition disabled:opacity-50"
            />

            <button
              type="button"
              onClick={handleAddTopic}
              disabled={loading}
              className="px-5 h-12 rounded-xl border border-purple-500/20 bg-purple-500/10 text-sm font-medium text-purple-300 hover:bg-purple-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </div>

        {/* Topics Preview */}
        {topics.length > 0 && (
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-300">
                Topics Added
              </p>

              <span className="text-xs text-gray-600">
                {topics.length} topic
                {topics.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {topics.map((topic, index) => (
                <div
                  key={`${topic.name}-${index}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center text-xs shrink-0">
                      {index + 1}
                    </span>

                    <span className="text-sm text-gray-300 truncate">
                      {topic.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      handleRemoveTopic(index)
                    }
                    className="text-xs text-red-400 hover:text-red-300 transition disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">

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
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? "Adding Subject..." : "Add Subject →"}
          </button>

        </div>
      </form>
    </div>
  );
}

export default SyllabusForm;
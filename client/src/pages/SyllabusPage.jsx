import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar.jsx";
import Topbar from "../components/dashboard/Topbar.jsx";

import SyllabusHeader from "../components/syllabus/SyllabusHeader.jsx";
import SubjectCard from "../components/syllabus/SubjectCard.jsx";
import SyllabusForm from "../components/syllabus/SyllabusForm.jsx";

import api from "../api/axios.js";

function SyllabusPage() {
  const { goalId } = useParams();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch subjects
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/goals/${goalId}/subjects`
      );

      setSubjects(response.data.subjects || []);
    } catch (error) {
      console.error("GET SUBJECTS ERROR:", error);
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
          "Failed to load syllabus."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!goalId) {
      setError("No goal selected.");
      setLoading(false);
      return;
    }

    fetchSubjects();
  }, [goalId]);

  // Add Subject + Topics
  const handleAddSubject = async (subjectData) => {
    try {
      setSaving(true);
      setError("");

      // 1. Create subject
      const subjectResponse = await api.post(
        `/goals/${goalId}/subjects`,
        {
          name: subjectData.name,
        }
      );

      const newSubject = subjectResponse.data.subject;

      // 2. Add topics one by one
      let updatedSubject = newSubject;

      for (const topic of subjectData.topics) {
        const topicResponse = await api.post(
          `/goals/${goalId}/subjects/${newSubject._id}/topics`,
          {
            name: topic.name,
          }
        );

        updatedSubject = {
          ...updatedSubject,
          topics: [
            ...(updatedSubject.topics || []),
            topicResponse.data.topic,
          ],
        };
      }

      setSubjects((prev) => [
        ...prev,
        updatedSubject,
      ]);

      setShowForm(false);
    } catch (error) {
      console.error("ADD SUBJECT ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);

      setError(
        error.response?.data?.message ||
          "Failed to add subject."
      );
    } finally {
      setSaving(false);
    }
  };

  // Toggle topic completion
  const handleToggleTopic = async (
    subjectId,
    topicId,
    completed
  ) => {
    try {
      setError("");

      const response = await api.patch(
        `/goals/${goalId}/subjects/${subjectId}/topics/${topicId}`,
        {
          completed: !completed,
        }
      );

      const updatedTopic = response.data.topic;

      setSubjects((prev) =>
        prev.map((subject) =>
          subject._id === subjectId
            ? {
                ...subject,
                topics: subject.topics.map((topic) =>
                  topic._id === topicId
                    ? updatedTopic
                    : topic
                ),
              }
            : subject
        )
      );
    } catch (error) {
      console.error("UPDATE TOPIC ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update topic."
      );
    }
  };

  // Delete subject
  const handleDeleteSubject = async (subjectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(
        `/goals/${goalId}/subjects/${subjectId}`
      );

      setSubjects((prev) =>
        prev.filter((subject) => subject._id !== subjectId)
      );
    } catch (error) {
      console.error("DELETE SUBJECT ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete subject."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      <Sidebar />

      <main className="lg:ml-64 min-h-screen">
        <Topbar />

        <div className="p-6 lg:p-8">
          <SyllabusHeader
            onAddSubject={() => {
              setError("");
              setShowForm(true);
            }}
          />

          {error && (
            <div className="mt-6 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-sm text-red-400">
              {error}
            </div>
          )}

          {showForm && (
            <div className="mt-8">
              <SyllabusForm
                onSubmit={handleAddSubject}
                onCancel={() => setShowForm(false)}
                loading={saving}
              />
            </div>
          )}

          {loading ? (
            <div className="mt-16 flex justify-center">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto rounded-full border-2 border-purple-500/20 border-t-purple-400 animate-spin" />

                <p className="mt-4 text-sm text-gray-500">
                  Loading your syllabus...
                </p>
              </div>
            </div>
          ) : subjects.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-12 text-center">
              <p className="text-white font-medium">
                No subjects yet
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Add your first subject and start building your syllabus.
              </p>

              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-5 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-semibold"
              >
                Add First Subject →
              </button>
            </div>
          ) : (
            <div className="mt-10 grid lg:grid-cols-2 gap-5">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject._id}
                  subject={subject}
                  onToggleTopic={handleToggleTopic}
                  onDeleteSubject={handleDeleteSubject}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SyllabusPage;
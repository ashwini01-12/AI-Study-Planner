import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar.jsx";
import Topbar from "../components/dashboard/Topbar.jsx";
import SyllabusHeader from "../components/syllabus/SyllabusHeader.jsx";
import SubjectCard from "../components/syllabus/SubjectCard.jsx";
import SyllabusForm from "../components/syllabus/SyllabusForm.jsx";

function SyllabusPage() {
  const [showForm, setShowForm] = useState(false);

  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Machine Learning",
      topics: [
        { id: 1, name: "Linear Regression", completed: true },
        { id: 2, name: "Logistic Regression", completed: true },
        { id: 3, name: "Decision Trees", completed: false },
        { id: 4, name: "SVM", completed: false },
      ],
    },
    {
      id: 2,
      name: "Deep Learning",
      topics: [
        { id: 5, name: "Neural Networks", completed: true },
        { id: 6, name: "CNN", completed: false },
        { id: 7, name: "RNN", completed: false },
      ],
    },
  ]);

  const handleAddSubject = (subject) => {
    setSubjects((prev) => [
      ...prev,
      {
        ...subject,
        id: Date.now(),
        topics: subject.topics.map((topic, index) => ({
          ...topic,
          id: Date.now() + index,
          completed: false,
        })),
      },
    ]);

    setShowForm(false);
  };

  const handleToggleTopic = (subjectId, topicId) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              topics: subject.topics.map((topic) =>
                topic.id === topicId
                  ? {
                      ...topic,
                      completed: !topic.completed,
                    }
                  : topic
              ),
            }
          : subject
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#070711] text-white">

      <Sidebar />

      <main className="lg:ml-64 min-h-screen">

        <Topbar />

        <div className="p-6 lg:p-8">

          <SyllabusHeader
            onAddSubject={() => setShowForm(true)}
          />

          {showForm && (
            <div className="mt-8">
              <SyllabusForm
                onSubmit={handleAddSubject}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}

          <div className="mt-10 grid lg:grid-cols-2 gap-5">

            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onToggleTopic={handleToggleTopic}
              />
            ))}

          </div>

        </div>

      </main>

    </div>
  );
}

export default SyllabusPage;
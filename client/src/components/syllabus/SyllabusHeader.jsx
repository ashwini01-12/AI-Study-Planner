function SyllabusHeader({ onAddSubject }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

      {/* Heading */}
      <div>
        <p className="text-sm font-medium text-purple-400">
          Organize Your Learning
        </p>

        <h1 className="mt-2 text-3xl lg:text-4xl font-bold text-white">
          My Syllabus
        </h1>

        <p className="mt-3 max-w-2xl text-sm lg:text-base text-gray-500 leading-6">
          Break your goal into subjects and topics so PrepWise can
          build a more focused study plan for you.
        </p>
      </div>

      {/* Add Subject */}
      <button
        type="button"
        onClick={onAddSubject}
        className="w-fit shrink-0 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition"
      >
        + Add Subject
      </button>

    </div>
  );
}

export default SyllabusHeader;
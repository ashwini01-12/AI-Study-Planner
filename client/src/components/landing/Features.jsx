const features = [
  {
    number: "01",
    icon: "✦",
    title: "Personalized AI Planning",
    description:
      "Get a study plan generated around your goals, syllabus, available time, and learning priorities.",
  },
  {
    number: "02",
    icon: "◎",
    title: "Goal & Syllabus Management",
    description:
      "Define what you want to achieve and organize your complete syllabus into manageable learning goals.",
  },
  {
    number: "03",
    icon: "◈",
    title: "AI Quiz & Evaluation",
    description:
      "Test your understanding with AI-generated quizzes and discover the topics that need more attention.",
  },
  {
    number: "04",
    icon: "↻",
    title: "Adaptive Rescheduling",
    description:
      "Missed a task or struggling with a topic? PrepWise dynamically adjusts your upcoming study plan.",
  },
  {
    number: "05",
    icon: "↗",
    title: "Progress Analytics",
    description:
      "Understand your study consistency, task completion, topic mastery, and overall learning progress.",
  },
  {
    number: "06",
    icon: "◉",
    title: "Exam Readiness",
    description:
      "Track your preparation level and identify what still needs to be mastered before your exam.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="relative py-24 lg:py-32 border-t border-white/5"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
            Powerful Features
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Everything you need to
            <span className="block text-gray-400">
              study with purpose.
            </span>
          </h2>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            PrepWise brings planning, learning, evaluation, adaptation,
            and analytics together into one intelligent study system.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">

          {features.map((feature) => (
            <div
              key={feature.number}
              className="group relative p-7 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Number */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {feature.number}
                </span>

                <div className="w-11 h-11 rounded-xl border border-purple-500/20 bg-purple-500/10 flex items-center justify-center text-purple-400 text-lg group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="mt-7 text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {feature.description}
              </p>

              {/* Bottom Accent */}
              <div className="mt-7 h-px w-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500" />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;
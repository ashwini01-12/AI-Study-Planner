const steps = [
  {
    number: "01",
    title: "Set Your Goal",
    description:
      "Create your goal, add your syllabus, exam date, and available study time.",
    tag: "Goal + Syllabus",
  },
  {
    number: "02",
    title: "Generate Your AI Plan",
    description:
      "PrepWise analyzes your requirements and creates a personalized study roadmap.",
    tag: "AI Planning",
  },
  {
    number: "03",
    title: "Study & Complete Tasks",
    description:
      "Follow your daily dashboard and complete the tasks planned specifically for you.",
    tag: "Daily Dashboard",
  },
  {
    number: "04",
    title: "Quiz & Evaluate",
    description:
      "Take AI-generated quizzes to test your understanding and identify weak areas.",
    tag: "AI Evaluation",
  },
  {
    number: "05",
    title: "Adapt & Improve",
    description:
      "Your progress and mastery influence the next plan, allowing PrepWise to reschedule intelligently.",
    tag: "Adaptive Learning",
  },
  {
    number: "06",
    title: "Track Exam Readiness",
    description:
      "Use analytics to understand your progress, mastery, consistency, and exam readiness.",
    tag: "Analytics",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 right-[-200px] w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
            How It Works
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
            From your goals
            <span className="block text-gray-400">
              to exam readiness.
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            PrepWise creates a continuous learning loop that plans,
            evaluates, adapts, and helps you stay on track.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16">

          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute left-[28px] top-8 bottom-8 w-px bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-blue-500/50" />

          <div className="space-y-5">

            {steps.map((step) => (
              <div
                key={step.number}
                className="group relative flex gap-6 lg:gap-8 p-6 lg:p-7 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.05] hover:border-purple-500/25 transition-all duration-300"
              >

                {/* Step Number */}
                <div className="relative z-10 shrink-0 w-14 h-14 rounded-2xl border border-purple-500/25 bg-[#0b0b16] flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-400">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>

                    <span className="w-fit px-3 py-1 rounded-full text-xs text-purple-300 bg-purple-500/10 border border-purple-500/15">
                      {step.tag}
                    </span>

                  </div>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-500">
                    {step.description}
                  </p>

                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center text-gray-700 group-hover:text-purple-400 transition">
                  →
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-14 p-6 lg:p-8 rounded-2xl border border-purple-500/15 bg-purple-500/[0.04]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>
              <p className="text-purple-400 text-sm font-medium">
                The PrepWise Learning Loop
              </p>

              <p className="mt-2 text-gray-300">
                Plan → Learn → Evaluate → Adapt → Improve
              </p>
            </div>

            <div className="text-sm text-gray-500">
              Your plan evolves as you do.
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
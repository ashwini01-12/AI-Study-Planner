function Hero() {
    return (
        <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-[10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[140px]" />
                <div className="absolute top-40 right-[5%] w-96 h-96 bg-blue-600/15 rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT */}
                    <div>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-sm">
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                            AI-Powered Study Planning
                        </div>

                        {/* Heading */}
                        <h1 className="mt-7 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white">
                            Study Smarter.
                            <br />

                            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                                Let AI Plan
                            </span>

                            <br />

                            Your Success.
                        </h1>

                        {/* Description */}
                        <p className="mt-7 max-w-xl text-lg text-gray-400 leading-relaxed">
                            Turn your goals and syllabus into a personalized study plan
                            that adapts to your progress, mastery, and learning pace.
                        </p>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-9">

                            <button className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition">
                                Create My Plan →
                            </button>

                            <button className="px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition">
                                Explore Features
                            </button>

                        </div>

                        {/* Benefits */}
                        <div className="flex flex-wrap items-center gap-5 mt-9 text-sm text-gray-500">

                            <span>✓ Personalized</span>
                            <span>✓ Adaptive</span>
                            <span>✓ AI-Powered</span>

                        </div>

                    </div>

                    {/* RIGHT — Dashboard */}
                    <div className="relative">

                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl" />

                        <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 shadow-2xl">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">

                                <div>
                                    <p className="text-sm text-gray-400">
                                        Good morning 👋
                                    </p>

                                    <h2 className="text-xl font-semibold text-white mt-1">
                                        Today's Study Plan
                                    </h2>
                                </div>

                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold text-white">
                                    R
                                </div>

                            </div>

                            {/* Progress */}
                            <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-5">

                                <div className="flex justify-between items-center">

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Today's Progress
                                        </p>

                                        <p className="text-3xl font-bold text-white mt-1">
                                            82%
                                        </p>
                                    </div>

                                    <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-400 flex items-center justify-center text-xs text-white">
                                        82%
                                    </div>

                                </div>

                                <div className="mt-5 h-2 bg-white/10 rounded-full overflow-hidden">

                                    <div className="h-full w-[82%] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />

                                </div>

                            </div>

                            {/* Tasks */}
                            <div className="mt-5 space-y-3">

                                {/* Task 1 */}
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">

                                    <div className="w-9 h-9 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center">
                                        ✓
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">
                                            Data Structures
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Arrays & Linked Lists
                                        </p>
                                    </div>

                                    <span className="text-xs text-green-400">
                                        Completed
                                    </span>

                                </div>

                                {/* Task 2 */}
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">

                                    <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                                        ◉
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">
                                            Machine Learning
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Decision Trees
                                        </p>
                                    </div>

                                    <span className="text-xs text-purple-400">
                                        45 min
                                    </span>

                                </div>

                                {/* Task 3 */}
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">

                                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                        ?
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">
                                            AI Quiz
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Test your mastery
                                        </p>
                                    </div>

                                    <span className="text-xs text-blue-400">
                                        10 Qs
                                    </span>

                                </div>

                            </div>

                            {/* AI Recommendation */}
                            <div className="mt-5 p-4 rounded-2xl border border-purple-500/20 bg-purple-500/[0.06]">

                                <div className="flex gap-3">

                                    <div className="text-purple-400 text-lg">
                                        ✦
                                    </div>

                                    <div>

                                        <p className="text-sm font-medium text-white">
                                            AI Recommendation
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                            You're progressing well. Focus on Machine Learning
                                            today to stay on track with your goal.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;
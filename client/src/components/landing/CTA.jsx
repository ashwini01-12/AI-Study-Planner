import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/15 blur-[140px] rounded-full" />
        <div className="absolute left-[20%] top-1/2 w-[250px] h-[250px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-sm">
          <span className="text-purple-400">✦</span>
          Your smarter study journey starts here
        </div>

        {/* Heading */}
        <h2 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          Ready to study
          <span className="block bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
            smarter?
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
          Stop wondering what to study next. Let PrepWise create a
          personalized plan and adapt it as you learn.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-9">

          {/* Register */}
          <Link
            to="/register"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition"
          >
            Create My Study Plan →
          </Link>

          {/* Login */}
          <Link
            to="/login"
            className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition"
          >
            Login
          </Link>

        </div>

        {/* Trust Points */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-600">

          <span>✓ Personalized Planning</span>
          <span>✓ Adaptive Learning</span>
          <span>✓ Progress Analytics</span>

        </div>

      </div>
    </section>
  );
}

export default CTA;
function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-[#070711] text-white flex items-center justify-center px-6 py-12 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[140px]" />

      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">

          <a
            href="/"
            className="text-3xl font-extrabold tracking-tight text-white"
          >
            Prep<span className="text-purple-400">Wise</span>
          </a>

          <h1 className="mt-7 text-3xl font-bold">
            {title}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {subtitle}
          </p>

        </div>

        {/* Auth Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl">
          {children}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-600">
          © 2026 PrepWise. All rights reserved.
        </p>

      </div>

    </div>
  );
}

export default AuthLayout;
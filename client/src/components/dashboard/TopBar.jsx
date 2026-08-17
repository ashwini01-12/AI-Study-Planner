function Topbar({ user }) {
  return (
    <header className="h-20 border-b border-white/5 bg-[#070711]/80 backdrop-blur-xl flex items-center justify-between px-6 lg:px-8">

      {/* Left */}
      <div>
        <p className="text-sm text-gray-500">
          Good to see you back
        </p>

        <h2 className="text-lg font-semibold text-white">
          Your Study Dashboard
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <button
          type="button"
          className="relative w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.06] transition"
          aria-label="Notifications"
        >
          🔔

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-400" />
        </button>

        {/* Profile */}
        <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10">

          <div className="text-right">
            <p className="text-sm font-medium text-white">
              {user?.name || "Student"}
            </p>

            <p className="text-xs text-gray-500">
              {user?.email || ""}
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold text-white">
            {user?.name?.charAt(0)?.toUpperCase() || "S"}
          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;
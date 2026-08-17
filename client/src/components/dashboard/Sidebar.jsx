import { useLocation, useNavigate } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    icon: "⌂",
    path: "/dashboard",
  },
  {
    label: "My Goals",
    icon: "◎",
    path: "/goals",
  },
  {
    label: "Study Plan",
    icon: "◫",
    path: "/study-plan",
  },
  {
    label: "Quiz",
    icon: "?",
    path: "/quiz",
  },
  {
    label: "Analytics",
    icon: "↗",
    path: "/analytics",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 z-40 w-64 flex-col border-r border-white/5 bg-[#080812]">

      {/* Logo */}
      <div className="h-20 px-6 flex items-center border-b border-white/5">
        <button
          onClick={() => navigate("/dashboard")}
          className="relative text-2xl font-extrabold tracking-tight text-white"
        >
          <span className="absolute -inset-2 bg-purple-500/10 blur-xl rounded-full" />

          <span className="relative">
            Prep<span className="text-purple-400">Wise</span>
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-600">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition ${
                  isActive
                    ? "bg-purple-500/10 text-purple-300 border border-purple-500/15"
                    : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]"
                }`}
              >
                <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.03]">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition"
        >
          <span className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center">
            ↪
          </span>

          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios.js";
import Sidebar from "../components/dashboard/Sidebar.jsx";
import Topbar from "../components/dashboard/TopBar.jsx";
import ProgressCard from "../components/dashboard/ProgressCard.jsx";
import TodayTasks from "../components/dashboard/TodayTasks.jsx";
import AIRecommendation from "../components/dashboard/AIRecommendation.jsx";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");

        setUser(response.data.user);
      } catch (error) {
        console.error("Authentication failed:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070711] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto rounded-full border-2 border-purple-500/20 border-t-purple-400 animate-spin" />

          <p className="mt-4 text-sm text-gray-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070711] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">

        {/* Topbar */}
        <Topbar user={user} />

        <div className="p-6 lg:p-8">

          {/* Welcome */}
          <div>
            <p className="text-sm text-gray-500">
              Your learning workspace
            </p>

            <h1 className="mt-2 text-3xl lg:text-4xl font-bold">
              Welcome, {user?.name} 👋
            </h1>

            <p className="mt-2 text-gray-500">
              {user?.email}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-5">

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm text-gray-500">
                Study Progress
              </p>

              <p className="mt-3 text-3xl font-bold">
                78%
              </p>

              <p className="mt-2 text-xs text-green-400">
                +12% this week
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm text-gray-500">
                Tasks Completed
              </p>

              <p className="mt-3 text-3xl font-bold">
                3
              </p>

              <p className="mt-2 text-xs text-gray-600">
                Today
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm text-gray-500">
                Current Streak
              </p>

              <p className="mt-3 text-3xl font-bold">
                12
              </p>

              <p className="mt-2 text-xs text-orange-400">
                🔥 days
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm text-gray-500">
                Exam Readiness
              </p>

              <p className="mt-3 text-3xl font-bold">
                86%
              </p>

              <p className="mt-2 text-xs text-blue-400">
                On track
              </p>
            </div>

          </div>

          {/* Progress + Goal */}
          <div className="mt-5 grid lg:grid-cols-2 gap-5">

            <ProgressCard progress={78} />

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

              <p className="text-sm text-gray-500">
                Today's Goal
              </p>

              <p className="mt-2 text-3xl font-bold">
                3 / 5
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Tasks completed today
              </p>

              <div className="mt-5 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
              </div>

            </div>

          </div>

          {/* Tasks + AI Recommendation */}
          <div className="mt-5 grid xl:grid-cols-3 gap-5">

            <div className="xl:col-span-2">
              <TodayTasks />
            </div>

            <div>
              <AIRecommendation />
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
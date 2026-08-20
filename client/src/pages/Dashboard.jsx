import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios.js";

import Sidebar from "../components/dashboard/Sidebar.jsx";
import Topbar from "../components/dashboard/Topbar.jsx";
import ProgressCard from "../components/dashboard/ProgressCard.jsx";
import TodayTasks from "../components/dashboard/TodayTasks.jsx";
import AIRecommendation from "../components/dashboard/AIRecommendation.jsx";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [streak, setStreak] = useState(0);

  const [loading, setLoading] = useState(true);
  const [progressLoading, setProgressLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [userResponse, progressResponse, streakResponse] =
          await Promise.all([
            api.get("/auth/me"),
            api.get("/progress"),
            api.get("/progress/streak"),
          ]);

        setUser(userResponse.data.user);
        setProgress(progressResponse.data.progress);
        setStreak(streakResponse.data.streak || 0);
      } catch (error) {
        console.error("DASHBOARD ERROR:", error);
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login", { replace: true });
        }
      } finally {
        setLoading(false);
        setProgressLoading(false);
      }
    };

    fetchDashboardData();
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

  const completionRate = progress?.completionRate ?? 0;
  const completedTasks = progress?.completedTasks ?? 0;
  const pendingTasks = progress?.pendingTasks ?? 0;

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      <Sidebar />

      <main className="lg:ml-64 min-h-screen">
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

            {/* Study Progress */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm text-gray-500">
                Study Progress
              </p>

              <p className="mt-3 text-3xl font-bold">
                {progressLoading ? "..." : `${completionRate}%`}
              </p>

              <p className="mt-2 text-xs text-purple-400">
                Overall completion
              </p>
            </div>

            {/* Tasks Completed */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm text-gray-500">
                Tasks Completed
              </p>

              <p className="mt-3 text-3xl font-bold">
                {progressLoading ? "..." : completedTasks}
              </p>

              <p className="mt-2 text-xs text-gray-600">
                {pendingTasks} pending
              </p>
            </div>

            {/* Streak */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm text-gray-500">
                Current Streak
              </p>

              <p className="mt-3 text-3xl font-bold">
                {progressLoading ? "..." : streak}
              </p>

              <p className="mt-2 text-xs text-orange-400">
                🔥 consecutive days
              </p>
            </div>

            {/* Study Time */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm text-gray-500">
                Study Time
              </p>

              <p className="mt-3 text-3xl font-bold">
                {progressLoading
                  ? "..."
                  : `${Math.round(
                      (progress?.completedStudyMinutes || 0) / 60
                    )}h`}
              </p>

              <p className="mt-2 text-xs text-blue-400">
                Completed study time
              </p>
            </div>

          </div>

          {/* Progress + Goal */}
          <div className="mt-5 grid lg:grid-cols-2 gap-5">

            <ProgressCard progress={completionRate} />

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

              <p className="text-sm text-gray-500">
                Today's Goal
              </p>

              <p className="mt-2 text-3xl font-bold">
                {completedTasks}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Tasks completed across your plan
              </p>

              <div className="mt-5 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                />
              </div>

            </div>

          </div>

          {/* Tasks + AI */}
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
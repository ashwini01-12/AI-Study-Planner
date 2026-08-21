import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import GoogleSuccess from "./pages/GoogleSuccess.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import GoalsPage from "./pages/GoalsPage.jsx";
import SyllabusPage from "./pages/SyllabusPage.jsx";
import StudyPlanPage from "./pages/StudyPlanPage.jsx";


import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/google/success" element={<GoogleSuccess />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route
            path="/goals/:goalId/syllabus"
            element={<SyllabusPage />}
          />
          <Route path="/study-plan" element={<StudyPlanPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
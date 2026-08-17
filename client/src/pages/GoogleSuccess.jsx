import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function GoogleSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);

    navigate("/dashboard");
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-[#070711] flex items-center justify-center">
      <div className="text-center">
        <div className="text-purple-400 text-xl font-semibold">
          Signing you in...
        </div>

        <p className="mt-2 text-gray-500 text-sm">
          Please wait while we prepare your dashboard.
        </p>
      </div>
    </div>
  );
}

export default GoogleSuccess;
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [location.search, navigate]); // ✅ FIXED

  return (
    <h2 style={{ textAlign: "center", marginTop: "100px" }}>
      Logging you in...
    </h2>
  );
}

export default OAuthSuccess;

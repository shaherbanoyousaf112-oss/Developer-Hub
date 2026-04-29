import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    setLoading(false);
  }, []);

  if (loading) return null; // prevent flicker

  return token ? <Outlet /> : <Navigate to="/admin/admin-login" />;
};

export default ProtectedRoute;
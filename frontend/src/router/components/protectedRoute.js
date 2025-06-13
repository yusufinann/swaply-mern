import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";
import LoadingFallback from "./LoadingFallback";

// JWT token'ı decode eden yardımcı fonksiyon
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const ProtectedRoute = ({ children }) => {
  const { token, logout, loading: authContextLoading } = useAuth(); 

  if (authContextLoading) {
    return <LoadingFallback />; 
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const decoded = parseJwt(token);
  if (!decoded || decoded.exp * 1000 < Date.now()) {
    logout(); 
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
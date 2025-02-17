import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, role, requiredRole, ...rest }) => {
  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />; // Redirect to home or unauthorized page
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;

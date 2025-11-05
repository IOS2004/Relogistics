import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

const PrivateRoute = ({ children }) => {
  // TODO: Implement proper auth check
  const isAuthenticated = localStorage.getItem("token");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default PrivateRoute;

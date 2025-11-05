import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import LandingPage from "../pages/LandingPage.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import BrokerDashboard from "../pages/dashboard/BrokerDashboard.jsx";
import VehicleOwnerDashboard from "../pages/dashboard/VehicleOwnerDashboard.jsx";
import DriverDashboard from "../pages/dashboard/DriverDashboard.jsx";
import LoadsPage from "../pages/LoadsPage.jsx";
import LoadDetailsPage from "../pages/LoadDetailsPage.jsx";
import VehiclesPage from "../pages/VehiclesPage.jsx";
import TrackingPage from "../pages/TrackingPage.jsx";
import PaymentsPage from "../pages/PaymentsPage.jsx";
import ReportsPage from "../pages/ReportsPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import SettingsPage from "../pages/SettingsPage.jsx";
import PrivateRoute from "../components/auth/PrivateRoute";
import BottomNavigation from "../components/common/BottomNavigation.jsx";

const DashboardRouter = () => {
  const userRole = localStorage.getItem("userRole");
  
  switch (userRole?.toLowerCase()) {
    case "broker":
      return <BrokerDashboard />;
    case "vehicle owner":
      return <VehicleOwnerDashboard />;
    case "driver":
      return <DriverDashboard />;
    default:
      return <BrokerDashboard />;
  }
};

const AppRouter = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Box sx={{ pb: { xs: isAuthenticated ? "70px" : 0, sm: 0 } }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={<PrivateRoute><DashboardRouter /></PrivateRoute>}
          />

          {/* Role-specific dashboard routes */}
          <Route
            path="/broker/*"
            element={
              <PrivateRoute>
                <BrokerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/vehicle-owner/*"
            element={
              <PrivateRoute>
                <VehicleOwnerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/driver/*"
            element={
              <PrivateRoute>
                <DriverDashboard />
              </PrivateRoute>
            }
          />

          {/* Common protected routes */}
          <Route
            path="/loads"
            element={
              <PrivateRoute>
                <LoadsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/loads/:loadId"
            element={
              <PrivateRoute>
                <LoadDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/vehicles"
            element={
              <PrivateRoute>
                <VehiclesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tracking"
            element={
              <PrivateRoute>
                <TrackingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <PrivateRoute>
                <PaymentsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <ReportsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />

          {/* Redirect root to dashboard if authenticated, otherwise to login */}
          <Route
            path="/"
            element={
              localStorage.getItem("token") ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Mobile Bottom Navigation - Only shows on authenticated routes */}
        {isAuthenticated && <BottomNavigation />}
      </Box>
    </Router>
  );
};

export default AppRouter;

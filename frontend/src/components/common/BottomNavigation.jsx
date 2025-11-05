import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Paper,
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  LocalShipping as LoadsIcon,
  TrackChanges as TrackingIcon,
  DirectionsCar as VehiclesIcon,
  Person as ProfileIcon,
} from "@mui/icons-material";
import { useThemeMode } from "../../theme/ThemeProvider";
import { alpha } from "@mui/material/styles";

/**
 * Mobile Bottom Navigation Component
 * Provides easy access to main sections on mobile devices
 * Only visible on mobile screens (< 600px)
 */
const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  // Get current route
  const getCurrentRoute = () => {
    const path = location.pathname;
    if (path === "/dashboard") return 0;
    if (path.startsWith("/loads")) return 1;
    if (path.startsWith("/tracking")) return 2;
    if (path.startsWith("/vehicles")) return 3;
    if (path.startsWith("/profile")) return 4;
    return 0;
  };

  const handleChange = (event, newValue) => {
    const routes = [
      "/dashboard",
      "/loads",
      "/tracking",
      "/vehicles",
      "/profile",
    ];
    navigate(routes[newValue]);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: { xs: "block", sm: "none" }, // Only show on mobile
        background: isDark
          ? "linear-gradient(135deg, #1a1d29 0%, #0a0e1a 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
        borderTop: `1px solid ${alpha(isDark ? "#fff" : "#000", 0.1)}`,
        backdropFilter: "blur(10px)",
      }}
      elevation={8}
    >
      <MuiBottomNavigation
        value={getCurrentRoute()}
        onChange={handleChange}
        showLabels
        sx={{
          background: "transparent",
          height: 70,
          "& .MuiBottomNavigationAction-root": {
            minWidth: "auto",
            padding: "8px 12px",
            color: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
            transition: "all 0.3s ease",
            "&.Mui-selected": {
              color: isDark ? "#e63946" : "#1976d2",
              fontSize: "0.75rem",
            },
            "&:hover": {
              color: isDark ? "#ff4d5a" : "#1565c0",
            },
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: "0.65rem",
            fontWeight: 500,
            marginTop: "4px",
            "&.Mui-selected": {
              fontSize: "0.7rem",
              fontWeight: 600,
            },
          },
        }}
      >
        <BottomNavigationAction
          label="Dashboard"
          icon={<DashboardIcon />}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 24,
            },
          }}
        />
        <BottomNavigationAction
          label="Loads"
          icon={<LoadsIcon />}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 24,
            },
          }}
        />
        <BottomNavigationAction
          label="Tracking"
          icon={<TrackingIcon />}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 24,
            },
          }}
        />
        <BottomNavigationAction
          label="Vehicles"
          icon={<VehiclesIcon />}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 24,
            },
          }}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<ProfileIcon />}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 24,
            },
          }}
        />
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;

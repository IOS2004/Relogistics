import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Button,
  LinearProgress,
} from "@mui/material";
import {
  LocalShipping,
  Person,
  Edit,
  LocationOn,
  Speed,
  CheckCircle,
  Warning,
  Build,
} from "@mui/icons-material";
import { useThemeMode } from "../../theme/ThemeProvider";

const EnhancedVehicleCard = ({ vehicle, onEdit }) => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const getStatusConfig = (status) => {
    switch (status) {
      case "active":
        return {
          color: "#10b981",
          bgColor: isDark
            ? "rgba(16, 185, 129, 0.1)"
            : "rgba(16, 185, 129, 0.08)",
          icon: <CheckCircle />,
          label: "Active",
          progress: 75,
        };
      case "idle":
        return {
          color: "#f59e0b",
          bgColor: isDark
            ? "rgba(245, 158, 11, 0.1)"
            : "rgba(245, 158, 11, 0.08)",
          icon: <Warning />,
          label: "Idle",
          progress: 0,
        };
      case "maintenance":
        return {
          color: "#ef4444",
          bgColor: isDark
            ? "rgba(239, 68, 68, 0.1)"
            : "rgba(239, 68, 68, 0.08)",
          icon: <Build />,
          label: "Maintenance",
          progress: 100,
        };
      default:
        return {
          color: "#64748b",
          bgColor: isDark
            ? "rgba(100, 116, 139, 0.1)"
            : "rgba(100, 116, 139, 0.08)",
          icon: <CheckCircle />,
          label: status,
          progress: 0,
        };
    }
  };

  const statusConfig = getStatusConfig(vehicle.status);

  return (
    <Card
      sx={{
        background: isDark
          ? "linear-gradient(135deg, #1a1d29 0%, #0a0e1a 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        borderRadius: 3,
        boxShadow: isDark
          ? "0 8px 32px rgba(0, 0, 0, 0.4)"
          : "0 8px 32px rgba(0, 0, 0, 0.08)",
        border: `1px solid ${
          isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
        }`,
        height: "100%",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: isDark
            ? "0 16px 48px rgba(0, 0, 0, 0.6)"
            : "0 16px 48px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      {/* Status Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={statusConfig.progress}
        sx={{
          height: 4,
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.05)",
          "& .MuiLinearProgress-bar": {
            background: `linear-gradient(90deg, ${statusConfig.color} 0%, ${statusConfig.color}dd 100%)`,
          },
        }}
      />

      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}
          >
            <Avatar
              sx={{
                bgcolor: isDark
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(59, 130, 246, 0.08)",
                color: "#3b82f6",
                width: 48,
                height: 48,
              }}
            >
              <LocalShipping />
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" fontWeight={700} noWrap>
                {vehicle.number}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {vehicle.type}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Chip
              icon={statusConfig.icon}
              label={statusConfig.label}
              size="small"
              sx={{
                backgroundColor: statusConfig.bgColor,
                color: statusConfig.color,
                fontWeight: 600,
                fontSize: 11,
                height: 26,
                "& .MuiChip-icon": {
                  fontSize: 14,
                },
              }}
            />
            <IconButton size="small" onClick={() => onEdit?.(vehicle)}>
              <Edit fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Details Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: isDark
                ? "rgba(139, 92, 246, 0.05)"
                : "rgba(139, 92, 246, 0.05)",
              border: `1px solid ${
                isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.1)"
              }`,
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}
            >
              <Speed sx={{ fontSize: 14, color: "#8b5cf6" }} />
              <Typography variant="caption" color="text.secondary">
                Capacity
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={700} color="#8b5cf6">
              {vehicle.capacity} tons
            </Typography>
          </Box>

          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: isDark
                ? "rgba(16, 185, 129, 0.05)"
                : "rgba(16, 185, 129, 0.05)",
              border: `1px solid ${
                isDark ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.1)"
              }`,
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}
            >
              <LocationOn sx={{ fontSize: 14, color: "#10b981" }} />
              <Typography variant="caption" color="text.secondary">
                Trips
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={700} color="#10b981">
              {vehicle.tripsCompleted || 0}
            </Typography>
          </Box>
        </Box>

        {/* Driver Info */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.02)"
              : "rgba(0, 0, 0, 0.02)",
            border: `1px solid ${
              isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
            }`,
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor:
                  vehicle.driver === "Not Assigned"
                    ? isDark
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(239, 68, 68, 0.08)"
                    : isDark
                    ? "rgba(59, 130, 246, 0.1)"
                    : "rgba(59, 130, 246, 0.08)",
                color:
                  vehicle.driver === "Not Assigned" ? "#ef4444" : "#3b82f6",
              }}
            >
              <Person sx={{ fontSize: 20 }} />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block" }}
              >
                Driver
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {vehicle.driver}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<LocalShipping />}
            sx={{
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EnhancedVehicleCard;

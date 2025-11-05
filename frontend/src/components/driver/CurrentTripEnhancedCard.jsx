import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  LinearProgress,
  Avatar,
  Divider,
} from "@mui/material";
import {
  LocationOn,
  MyLocation,
  Navigation,
  Phone,
  AccessTime,
  LocalShipping,
  ArrowForward,
} from "@mui/icons-material";
import { useThemeMode } from "../../theme/ThemeProvider";

const CurrentTripEnhancedCard = ({ trip, onNavigate, onContact }) => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

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
        overflow: "hidden",
      }}
    >
      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={trip.progress || 65}
        sx={{
          height: 6,
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.05)",
          "& .MuiLinearProgress-bar": {
            background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
          },
        }}
      />

      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                bgcolor: isDark
                  ? "rgba(16, 185, 129, 0.1)"
                  : "rgba(16, 185, 129, 0.08)",
                color: "#10b981",
                width: 48,
                height: 48,
              }}
            >
              <LocalShipping />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Current Trip
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {trip.loadId || "Load #12345"}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={trip.status || "In Transit"}
            icon={<LocalShipping sx={{ fontSize: 14 }} />}
            sx={{
              backgroundColor: isDark
                ? "rgba(16, 185, 129, 0.1)"
                : "rgba(16, 185, 129, 0.08)",
              color: "#10b981",
              fontWeight: 600,
              height: 28,
            }}
          />
        </Box>

        {/* Route Display */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderRadius: 2,
              backgroundColor: isDark
                ? "rgba(59, 130, 246, 0.05)"
                : "rgba(59, 130, 246, 0.05)",
              border: `1px solid ${
                isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.1)"
              }`,
            }}
          >
            <MyLocation sx={{ color: "#3b82f6", fontSize: 20 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Pickup Location
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {trip.pickup || "Mumbai, Maharashtra"}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 1,
            }}
          >
            <ArrowForward
              sx={{ color: isDark ? "#64748b" : "#94a3b8", fontSize: 24 }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderRadius: 2,
              backgroundColor: isDark
                ? "rgba(239, 68, 68, 0.05)"
                : "rgba(239, 68, 68, 0.05)",
              border: `1px solid ${
                isDark ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0.1)"
              }`,
            }}
          >
            <LocationOn sx={{ color: "#ef4444", fontSize: 20 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Drop Location
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {trip.dropoff || "Pune, Maharashtra"}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Trip Details */}
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
                ? "rgba(255, 255, 255, 0.02)"
                : "rgba(0, 0, 0, 0.02)",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}
            >
              <LocalShipping sx={{ fontSize: 14, color: "#8b5cf6" }} />
              <Typography variant="caption" color="text.secondary">
                Vehicle
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight={600}>
              {trip.vehicle || "MH 01 AB 1234"}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.02)"
                : "rgba(0, 0, 0, 0.02)",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}
            >
              <AccessTime sx={{ fontSize: 14, color: "#f59e0b" }} />
              <Typography variant="caption" color="text.secondary">
                ETA
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight={600}>
              {trip.eta || "2 hours 30 mins"}
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Navigation />}
            onClick={onNavigate}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            }}
          >
            Navigate
          </Button>
          <Button
            variant="outlined"
            startIcon={<Phone />}
            onClick={onContact}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              minWidth: 120,
            }}
          >
            Contact
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentTripEnhancedCard;

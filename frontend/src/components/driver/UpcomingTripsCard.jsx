import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";
import {
  Schedule,
  LocationOn,
  ArrowForward,
  LocalShipping,
} from "@mui/icons-material";
import { useThemeMode } from "../../theme/ThemeProvider";

const UpcomingTripsCard = () => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const upcomingTrips = [
    {
      id: 1,
      loadId: "#12346",
      pickup: "Delhi",
      dropoff: "Jaipur",
      date: "Tomorrow, 8:00 AM",
      weight: "8 tons",
      color: "#3b82f6",
    },
    {
      id: 2,
      loadId: "#12347",
      pickup: "Mumbai",
      dropoff: "Ahmedabad",
      date: "Nov 12, 10:00 AM",
      weight: "10 tons",
      color: "#8b5cf6",
    },
    {
      id: 3,
      loadId: "#12348",
      pickup: "Bangalore",
      dropoff: "Chennai",
      date: "Nov 14, 9:00 AM",
      weight: "12 tons",
      color: "#10b981",
    },
  ];

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
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          sx={{
            mb: 3,
            background: isDark
              ? "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)"
              : "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Upcoming Trips
        </Typography>

        <Stack spacing={2}>
          {upcomingTrips.map((trip) => (
            <Box
              key={trip.id}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.02)"
                  : "rgba(0, 0, 0, 0.02)",
                border: `1px solid ${
                  isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)"
                }`,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.04)"
                    : "rgba(0, 0, 0, 0.04)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${trip.color}20`,
                      color: trip.color,
                      width: 32,
                      height: 32,
                    }}
                  >
                    <LocalShipping sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Typography variant="body2" fontWeight={600}>
                    Load {trip.loadId}
                  </Typography>
                </Box>
                <Chip
                  label={trip.weight}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: 11,
                    fontWeight: 600,
                    backgroundColor: isDark
                      ? "rgba(245, 158, 11, 0.1)"
                      : "rgba(245, 158, 11, 0.08)",
                    color: "#f59e0b",
                  }}
                />
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ minWidth: 60 }}
                >
                  From:
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {trip.pickup}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ minWidth: 60 }}
                >
                  To:
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {trip.dropoff}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1.5,
                  pt: 1.5,
                  borderTop: `1px solid ${
                    isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
                  }`,
                }}
              >
                <Schedule
                  sx={{ fontSize: 14, color: isDark ? "#94a3b8" : "#64748b" }}
                />
                <Typography variant="caption" color="text.secondary">
                  {trip.date}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: `1px solid ${
              isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
            }`,
            textAlign: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: isDark ? "#64748b" : "#94a3b8",
              fontWeight: 500,
            }}
          >
            3 trips scheduled
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UpcomingTripsCard;

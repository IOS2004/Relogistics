import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import {
  LocalShipping,
  CheckCircle,
  Schedule,
  TrendingUp,
  Person,
  Assignment,
} from "@mui/icons-material";
import { useThemeMode } from "../../theme/ThemeProvider";

const ActivityFeed = () => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const activities = [
    {
      id: 1,
      type: "load_posted",
      title: "New Load Posted",
      description: "Construction Materials - Mumbai to Pune",
      time: "5 min ago",
      icon: <Assignment />,
      color: "#3b82f6",
      bgColor: isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.08)",
    },
    {
      id: 2,
      type: "bid_accepted",
      title: "Bid Accepted",
      description: "Electronics Shipment - ₹15,000",
      time: "15 min ago",
      icon: <CheckCircle />,
      color: "#10b981",
      bgColor: isDark ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.08)",
    },
    {
      id: 3,
      type: "delivery_completed",
      title: "Delivery Completed",
      description: "Textile Products - Surat to Mumbai",
      time: "1 hour ago",
      icon: <LocalShipping />,
      color: "#8b5cf6",
      bgColor: isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.08)",
    },
    {
      id: 4,
      type: "driver_assigned",
      title: "Driver Assigned",
      description: "Rajesh Kumar - Load #1234",
      time: "2 hours ago",
      icon: <Person />,
      color: "#f59e0b",
      bgColor: isDark ? "rgba(245, 158, 11, 0.1)" : "rgba(245, 158, 11, 0.08)",
    },
    {
      id: 5,
      type: "revenue_milestone",
      title: "Revenue Milestone",
      description: "Reached ₹50,000 this month",
      time: "3 hours ago",
      icon: <TrendingUp />,
      color: "#ef4444",
      bgColor: isDark ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0.08)",
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
          Recent Activity
        </Typography>

        <Stack spacing={2.5}>
          {activities.map((activity) => (
            <Box
              key={activity.id}
              sx={{
                display: "flex",
                gap: 2,
                p: 1.5,
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
              {/* Icon Avatar */}
              <Avatar
                sx={{
                  bgcolor: activity.bgColor,
                  color: activity.color,
                  width: 44,
                  height: 44,
                  "& .MuiSvgIcon-root": {
                    fontSize: 22,
                  },
                }}
              >
                {activity.icon}
              </Avatar>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{
                      color: isDark ? "#e2e8f0" : "#1e293b",
                      lineHeight: 1.4,
                    }}
                  >
                    {activity.title}
                  </Typography>
                  <Chip
                    icon={<Schedule sx={{ fontSize: 14 }} />}
                    label={activity.time}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 600,
                      backgroundColor: isDark
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.05)",
                      color: isDark ? "#94a3b8" : "#64748b",
                      "& .MuiChip-icon": {
                        fontSize: 14,
                        marginLeft: "6px",
                      },
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDark ? "#94a3b8" : "#64748b",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {activity.description}
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
            Showing latest 5 activities
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;

import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, AccountBalance } from "@mui/icons-material";
import { useThemeMode } from "../../theme/ThemeProvider";

const DriverEarningsTracker = () => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const data = [
    { week: "Week 1", earnings: 12000 },
    { week: "Week 2", earnings: 15000 },
    { week: "Week 3", earnings: 18000 },
    { week: "Week 4", earnings: 22000 },
  ];

  const totalEarnings = data.reduce((sum, item) => sum + item.earnings, 0);
  const avgEarnings = totalEarnings / data.length;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Card
          sx={{
            backgroundColor: isDark
              ? "rgba(26, 29, 41, 0.98)"
              : "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${
              isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
            }`,
            boxShadow: isDark
              ? "0 8px 32px rgba(0, 0, 0, 0.4)"
              : "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
            <Typography variant="body2" fontWeight={600}>
              {payload[0].payload.week}
            </Typography>
            <Typography variant="h6" color="primary" fontWeight={700}>
              ₹{payload[0].value.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                background: isDark
                  ? "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)"
                  : "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Earnings
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              This month's performance
            </Typography>
          </Box>
          <Chip
            icon={<TrendingUp />}
            label="+38%"
            color="success"
            size="small"
            sx={{ fontWeight: 700 }}
          />
        </Box>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={
                isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
              }
            />
            <XAxis
              dataKey="week"
              tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 11 }}
              stroke={
                isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }
            />
            <YAxis
              tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 11 }}
              stroke={
                isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: "#10b981", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: `1px solid ${
              isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
            }`,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                mb: 0.5,
              }}
            >
              <AccountBalance
                sx={{ fontSize: 16, color: isDark ? "#94a3b8" : "#64748b" }}
              />
              <Typography variant="caption" color="text.secondary">
                Total
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={700} color="primary">
              ₹{totalEarnings.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                mb: 0.5,
              }}
            >
              <TrendingUp
                sx={{ fontSize: 16, color: isDark ? "#94a3b8" : "#64748b" }}
              />
              <Typography variant="caption" color="text.secondary">
                Average
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={700} color="success.main">
              ₹{avgEarnings.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DriverEarningsTracker;

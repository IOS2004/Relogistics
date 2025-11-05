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
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp } from "@mui/icons-material";
import { useThemeMode } from "../../theme/ThemeProvider";

const EarningsChart = () => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const data = [
    { month: "Apr", earnings: 125000, trips: 15 },
    { month: "May", earnings: 145000, trips: 18 },
    { month: "Jun", earnings: 138000, trips: 17 },
    { month: "Jul", earnings: 165000, trips: 21 },
    { month: "Aug", earnings: 178000, trips: 23 },
    { month: "Sep", earnings: 192000, trips: 25 },
    { month: "Oct", earnings: 205000, trips: 27 },
    { month: "Nov", earnings: 245000, trips: 32 },
  ];

  const totalEarnings = data.reduce((sum, item) => sum + item.earnings, 0);
  const avgEarnings = totalEarnings / data.length;
  const growth =
    ((data[data.length - 1].earnings - data[0].earnings) / data[0].earnings) *
    100;

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
            <Typography variant="body2" fontWeight={600} gutterBottom>
              {payload[0].payload.month}
            </Typography>
            <Typography variant="h6" color="primary" fontWeight={700}>
              ₹{(payload[0].value / 1000).toFixed(0)}k
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {payload[0].payload.trips} trips completed
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
              Monthly Earnings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Last 8 months performance
            </Typography>
          </Box>
          <Chip
            icon={<TrendingUp />}
            label={`+${growth.toFixed(1)}%`}
            color="success"
            size="small"
            sx={{ fontWeight: 700 }}
          />
        </Box>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isDark ? "#10b981" : "#3b82f6"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={isDark ? "#10b981" : "#3b82f6"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={
                isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
              }
            />
            <XAxis
              dataKey="month"
              tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12 }}
              stroke={
                isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }
            />
            <YAxis
              tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12 }}
              stroke={
                isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke={isDark ? "#10b981" : "#3b82f6"}
              strokeWidth={3}
              fill="url(#earningsGradient)"
            />
          </AreaChart>
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
            <Typography variant="caption" color="text.secondary">
              Total Earnings
            </Typography>
            <Typography variant="h6" fontWeight={700} color="primary">
              ₹{(totalEarnings / 1000).toFixed(0)}k
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary">
              Average/Month
            </Typography>
            <Typography variant="h6" fontWeight={700} color="success.main">
              ₹{(avgEarnings / 1000).toFixed(0)}k
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EarningsChart;

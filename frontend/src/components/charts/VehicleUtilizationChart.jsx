import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useThemeMode } from "../../theme/ThemeProvider";

const VehicleUtilizationChart = () => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const data = [
    { vehicle: "MH12AB1234", active: 18, idle: 6, maintenance: 6 },
    { vehicle: "MH14CD5678", active: 20, idle: 10, maintenance: 0 },
    { vehicle: "MH01EF9012", active: 15, idle: 8, maintenance: 7 },
    { vehicle: "GJ05GH3456", active: 22, idle: 5, maintenance: 3 },
    { vehicle: "DL08IJ7890", active: 16, idle: 12, maintenance: 2 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
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
            p: 1,
          }}
        >
          <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              {label}
            </Typography>
            {payload.map((entry, index) => (
              <Typography
                key={index}
                variant="caption"
                sx={{ display: "block", color: entry.color }}
              >
                {entry.name}: {entry.value} days
              </Typography>
            ))}
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
          Vehicle Utilization (Last 30 Days)
        </Typography>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={
                isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
              }
            />
            <XAxis
              dataKey="vehicle"
              tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 11 }}
              stroke={
                isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12 }}
              stroke={
                isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }
              label={{
                value: "Days",
                angle: -90,
                position: "insideLeft",
                style: { fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12 },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: "10px",
                fontSize: "12px",
                color: isDark ? "#94a3b8" : "#64748b",
              }}
            />
            <Bar
              dataKey="active"
              stackId="a"
              fill="#10b981"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="idle"
              stackId="a"
              fill="#f59e0b"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="maintenance"
              stackId="a"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 2 }}
        >
          Track how efficiently your fleet is being utilized
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VehicleUtilizationChart;

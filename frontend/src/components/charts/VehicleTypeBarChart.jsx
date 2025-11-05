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
  Cell,
} from "recharts";
import { useThemeMode } from "../../theme/ThemeProvider";
import { useIsMobile } from "../../hooks/useMediaQuery";

const VehicleTypeBarChart = () => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";
  const isMobile = useIsMobile();

  const data = [
    { type: "Truck", loads: 45, color: "#3b82f6" },
    { type: "Container", loads: 32, color: "#8b5cf6" },
    { type: "Van", loads: 28, color: "#10b981" },
    { type: "Mini Truck", loads: 18, color: "#f59e0b" },
    { type: "Pickup", loads: 12, color: "#ef4444" },
  ];

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
              {payload[0].payload.type}
            </Typography>
            <Typography variant="h6" color="primary" fontWeight={700}>
              {payload[0].value} Loads
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
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          fontWeight={700}
          gutterBottom
          sx={{
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: "1rem", sm: "1.25rem" },
            background: isDark
              ? "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)"
              : "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Loads by Vehicle Type
        </Typography>

        <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: isMobile ? 5 : 10,
              left: isMobile ? 5 : 10,
              bottom: 5,
            }}
            layout="vertical"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={
                isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
              }
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{
                fill: isDark ? "#94a3b8" : "#64748b",
                fontSize: isMobile ? 10 : 12,
              }}
              stroke={
                isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }
            />
            <YAxis
              type="category"
              dataKey="type"
              tick={{
                fill: isDark ? "#94a3b8" : "#64748b",
                fontSize: isMobile ? 10 : 12,
              }}
              stroke={
                isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }
              width={isMobile ? 70 : 90}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            />
            <Bar
              dataKey="loads"
              radius={[0, 8, 8, 0]}
              maxBarSize={isMobile ? 30 : 40}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 2 }}
        >
          Distribution of loads across different vehicle types
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VehicleTypeBarChart;

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
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
import { useThemeMode } from "../../theme/ThemeProvider";
import { useIsMobile } from "../../hooks/useMediaQuery";

const RevenueChart = ({ data, title = "Revenue Overview" }) => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";
  const isMobile = useIsMobile();

  const defaultData = data || [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 55000 },
    { month: "Jun", revenue: 67000 },
    { month: "Jul", revenue: 72000 },
    { month: "Aug", revenue: 68000 },
    { month: "Sep", revenue: 75000 },
    { month: "Oct", revenue: 82000 },
    { month: "Nov", revenue: 89000 },
    { month: "Dec", revenue: 95000 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: isDark ? "#1a1d29" : "background.paper",
            p: 1.5,
            borderRadius: 2,
            border: `1px solid ${isDark ? "#3a3f4b" : "#e0e0e0"}`,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            {payload[0].payload.month}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: isDark ? "#e63946" : "primary.main" }}
          >
            ₹{payload[0].value.toLocaleString()}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: isDark ? "#1a1d29" : "background.paper",
        border: isDark ? "1px solid #3a3f4b" : "none",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          fontWeight={600}
          mb={{ xs: 2, sm: 3 }}
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
          <AreaChart data={defaultData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isDark ? "#e63946" : "#1976d2"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={isDark ? "#e63946" : "#1976d2"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#3a3f4b" : "#e0e0e0"}
            />
            <XAxis
              dataKey="month"
              stroke={isDark ? "#b0b3b8" : "#666"}
              style={{ fontSize: isMobile ? "10px" : "12px" }}
              interval={isMobile ? 2 : 0}
            />
            <YAxis
              stroke={isDark ? "#b0b3b8" : "#666"}
              style={{ fontSize: isMobile ? "10px" : "12px" }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              width={isMobile ? 40 : 60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={isDark ? "#e63946" : "#1976d2"}
              strokeWidth={isMobile ? 2 : 3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;

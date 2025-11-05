import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useThemeMode } from "../../theme/ThemeProvider";
import { useIsMobile } from "../../hooks/useMediaQuery";

const DeliveryStatusChart = ({
  data,
  title = "Delivery Status Distribution",
}) => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";
  const isMobile = useIsMobile();

  const defaultData = data || [
    { name: "In Transit", value: 12, color: isDark ? "#4facfe" : "#1976d2" },
    { name: "Delivered", value: 156, color: isDark ? "#4caf50" : "#2e7d32" },
    { name: "Pending", value: 8, color: isDark ? "#ff9800" : "#ed6c02" },
    { name: "Delayed", value: 3, color: isDark ? "#f44336" : "#d32f2f" },
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
            {payload[0].name}
          </Typography>
          <Typography variant="h6" sx={{ color: payload[0].payload.color }}>
            {payload[0].value} loads
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const renderCustomLabel = (entry) => {
    return `${entry.value}`;
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
          mb={{ xs: 2, sm: 2 }}
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
          <PieChart>
            <Pie
              data={defaultData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={isMobile ? 70 : 100}
              fill="#8884d8"
              dataKey="value"
            >
              {defaultData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span
                  style={{
                    color: isDark ? "#b0b3b8" : "#666",
                    fontSize: "14px",
                  }}
                >
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DeliveryStatusChart;

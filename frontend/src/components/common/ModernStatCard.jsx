import React from "react";
import { Box, Card, CardContent, Typography, alpha } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { useIsMobile } from "../../hooks/useMediaQuery";

const ModernStatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  gradient,
  color = "primary",
}) => {
  const isMobile = useIsMobile();

  const gradients = {
    primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    success: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    warning: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    info: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    blue: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
    orange: "linear-gradient(135deg, #ff6f00 0%, #ff9800 100%)",
    purple: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    green: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  };

  const selectedGradient = gradient || gradients[color] || gradients.primary;

  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: selectedGradient,
        color: "white",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0px 12px 40px rgba(0,0,0,0.2)",
        },
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <CardContent
        sx={{ p: { xs: 2, sm: 3 }, position: "relative", zIndex: 1 }}
      >
        {/* Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: { xs: 1.5, sm: 2 },
          }}
        >
          <Box
            sx={{
              width: { xs: 44, sm: 56 },
              height: { xs: 44, sm: 56 },
              borderRadius: { xs: "10px", sm: "12px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha("#ffffff", 0.2),
              backdropFilter: "blur(10px)",
            }}
          >
            {Icon && <Icon sx={{ fontSize: { xs: 24, sm: 32 } }} />}
          </Box>

          {/* Trend Indicator */}
          {trend && !isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                bgcolor: alpha("#ffffff", 0.2),
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
              }}
            >
              {trend === "up" ? (
                <TrendingUp sx={{ fontSize: 18 }} />
              ) : (
                <TrendingDown sx={{ fontSize: 18 }} />
              )}
              <Typography variant="body2" fontWeight={600}>
                {trendValue}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Title */}
        <Typography
          variant="body2"
          sx={{
            opacity: 0.9,
            fontWeight: 500,
            mb: { xs: 0.5, sm: 1 },
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontSize: { xs: "0.688rem", sm: "0.875rem" },
          }}
        >
          {title}
        </Typography>

        {/* Value */}
        <Typography
          variant={isMobile ? "h5" : "h3"}
          sx={{
            fontWeight: 700,
            mb: { xs: 0.5, sm: 1 },
            lineHeight: 1.2,
            fontSize: { xs: "1.5rem", sm: "3rem" },
          }}
        >
          {value}
        </Typography>

        {/* Subtitle */}
        {subtitle && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                fontWeight: 400,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              {subtitle}
            </Typography>
            {/* Mobile Trend */}
            {trend && isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.3,
                  bgcolor: alpha("#ffffff", 0.2),
                  px: 0.8,
                  py: 0.3,
                  borderRadius: 1,
                }}
              >
                {trend === "up" ? (
                  <TrendingUp sx={{ fontSize: 14 }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 14 }} />
                )}
                <Typography
                  variant="caption"
                  fontWeight={600}
                  sx={{ fontSize: "0.688rem" }}
                >
                  {trendValue}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>

      {/* Decorative Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          bgcolor: alpha("#ffffff", 0.1),
          filter: "blur(40px)",
        }}
      />
    </Card>
  );
};

export default ModernStatCard;

import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  alpha,
  Grid,
} from "@mui/material";
import {
  LocalShipping,
  CheckCircle,
  Pending,
  DirectionsCar,
  Visibility,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../../theme/ThemeProvider";

const EnhancedLoadCard = ({ load, onBid, showBidButton = false }) => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/loads/${load.id}`);
  };

  const handleBid = () => {
    if (onBid) {
      onBid(load);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Transit":
        return isDark ? "#4facfe" : "primary";
      case "Pending":
        return "warning";
      case "Delivered":
        return "success";
      case "Delayed":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "In Transit":
        return <LocalShipping sx={{ fontSize: 16 }} />;
      case "Pending":
        return <Pending sx={{ fontSize: 16 }} />;
      case "Delivered":
        return <CheckCircle sx={{ fontSize: 16 }} />;
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        bgcolor: isDark ? "#1a1d29" : "background.paper",
        border: isDark ? "1px solid #3a3f4b" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: isDark
            ? "0 12px 40px rgba(230,57,70,0.3)"
            : "0 12px 40px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Progress Bar at Top */}
      <LinearProgress
        variant="determinate"
        value={load.progress}
        sx={{
          height: 6,
          bgcolor: alpha(isDark ? "#e63946" : "#1976d2", 0.1),
          "& .MuiLinearProgress-bar": {
            background: isDark
              ? "linear-gradient(90deg, #e63946 0%, #ff4d5a 100%)"
              : "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
          },
        }}
      />

      <CardContent sx={{ p: 3 }}>
        {/* Header with Title and Status */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
              {load.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {load.from} → {load.to}
              </Typography>
            </Box>
          </Box>
          <Chip
            icon={getStatusIcon(load.status)}
            label={load.status}
            color={getStatusColor(load.status)}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        {/* Load Details Grid */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(isDark ? "#e63946" : "#1976d2", 0.05),
                  border: `1px solid ${alpha(
                    isDark ? "#e63946" : "#1976d2",
                    0.1
                  )}`,
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Weight
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {load.weight}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(isDark ? "#e63946" : "#1976d2", 0.05),
                  border: `1px solid ${alpha(
                    isDark ? "#e63946" : "#1976d2",
                    0.1
                  )}`,
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Price
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: isDark ? "#4caf50" : "success.main" }}
                >
                  {load.price}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Driver Info */}
        {load.driver && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 2,
              p: 1.5,
              borderRadius: 2,
              bgcolor: alpha(isDark ? "#e63946" : "#1976d2", 0.03),
              border: `1px solid ${alpha(isDark ? "#e63946" : "#1976d2", 0.1)}`,
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: isDark ? "#e63946" : "primary.main",
                fontWeight: 600,
              }}
            >
              {load.driver.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                {load.driver}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <DirectionsCar sx={{ fontSize: 14, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  {load.vehicleType}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                ETA
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ color: isDark ? "#e63946" : "primary.main" }}
              >
                {load.eta}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {showBidButton ? (
            <>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<Visibility />}
                onClick={handleViewDetails}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  borderColor: alpha(isDark ? "#e63946" : "#1976d2", 0.3),
                  color: isDark ? "#e63946" : "primary.main",
                  "&:hover": {
                    borderColor: isDark ? "#e63946" : "primary.main",
                    bgcolor: alpha(isDark ? "#e63946" : "#1976d2", 0.05),
                  },
                }}
              >
                Details
              </Button>
              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={handleBid}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  bgcolor: isDark ? "#e63946" : "primary.main",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: isDark ? "#ff4d5a" : "#1565c0",
                  },
                }}
              >
                Place Bid
              </Button>
            </>
          ) : (
            <>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<Visibility />}
                onClick={handleViewDetails}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  borderColor: alpha(isDark ? "#e63946" : "#1976d2", 0.3),
                  color: isDark ? "#e63946" : "primary.main",
                  "&:hover": {
                    borderColor: isDark ? "#e63946" : "primary.main",
                    bgcolor: alpha(isDark ? "#e63946" : "#1976d2", 0.05),
                  },
                }}
              >
                View Details
              </Button>
              {load.driver && (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: 40,
                    width: 40,
                    height: 36,
                    p: 0,
                    borderRadius: 2,
                    borderColor: alpha(isDark ? "#e63946" : "#1976d2", 0.3),
                    color: isDark ? "#e63946" : "primary.main",
                    "&:hover": {
                      borderColor: isDark ? "#e63946" : "primary.main",
                      bgcolor: alpha(isDark ? "#e63946" : "#1976d2", 0.05),
                    },
                  }}
                >
                  <Phone sx={{ fontSize: 18 }} />
                </Button>
              )}
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EnhancedLoadCard;

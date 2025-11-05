import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
  Avatar,
  Divider,
  IconButton,
  LinearProgress,
} from "@mui/material";
import {
  ArrowBack,
  LocalShipping,
  Person,
  Phone,
  Message,
  LocationOn,
  MyLocation,
  Schedule,
  CheckCircle,
  Warning,
  Info,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import MapComponent from "../components/map/MapComponent";
import { useThemeMode } from "../theme/ThemeProvider";

const LoadDetailsPage = () => {
  const navigate = useNavigate();
  const { loadId } = useParams();
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  // Sample load data - replace with API call
  const [loadData] = useState({
    id: loadId || "12345",
    title: "Construction Materials",
    status: "In Transit",
    progress: 65,
    pickup: {
      lat: 19.076,
      lng: 72.8777,
      name: "ABC Warehouse",
      address: "Sector 5, Andheri East, Mumbai, Maharashtra 400069",
      contact: "+91 98765 43210",
    },
    dropoff: {
      lat: 18.5204,
      lng: 73.8567,
      name: "XYZ Distribution Center",
      address: "Hinjewadi Phase 2, Pune, Maharashtra 411057",
      contact: "+91 98765 43211",
    },
    vehicle: {
      lat: 18.8,
      lng: 73.3,
      name: "Near Lonavala Toll Plaza",
      number: "MH 12 AB 1234",
      type: "20ft Container",
      driver: "Rajesh Kumar",
      driverPhone: "+91 98765 43212",
    },
    details: {
      weight: "12 tons",
      price: "₹25,000",
      distance: "148 km",
      estimatedTime: "2 hours 30 mins",
      vehicleType: "20ft Container",
      loadType: "Construction Material",
    },
    timeline: [
      { status: "Load Posted", time: "Nov 8, 10:00 AM", completed: true },
      { status: "Bid Accepted", time: "Nov 8, 11:30 AM", completed: true },
      { status: "Pickup Started", time: "Nov 9, 8:00 AM", completed: true },
      { status: "In Transit", time: "Nov 9, 10:00 AM", completed: true },
      {
        status: "Reached Dropoff",
        time: "Estimated: Nov 9, 2:30 PM",
        completed: false,
      },
      { status: "Delivered", time: "Pending", completed: false },
    ],
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "In Transit":
        return { color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)" };
      case "Delivered":
        return { color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" };
      case "Pending":
        return { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" };
      default:
        return { color: "#64748b", bg: "rgba(100, 116, 139, 0.1)" };
    }
  };

  const statusConfig = getStatusColor(loadData.status);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: isDark ? "#0a0e1a" : "#f8fafc",
        pt: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight={700}>
                Load #{loadData.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {loadData.title}
              </Typography>
            </Box>
            <Chip
              icon={<LocalShipping />}
              label={loadData.status}
              sx={{
                backgroundColor: statusConfig.bg,
                color: statusConfig.color,
                fontWeight: 600,
                height: 36,
                fontSize: 14,
              }}
            />
          </Box>

          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={loadData.progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.05)",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
                borderRadius: 4,
              },
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 0.5 }}
          >
            {loadData.progress}% Complete
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Map Section */}
          <Grid item xs={12} lg={8}>
            <MapComponent
              pickup={loadData.pickup}
              dropoff={loadData.dropoff}
              vehicleLocation={loadData.vehicle}
              height="600px"
              zoom={8}
            />
          </Grid>

          {/* Details Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Load Details Card */}
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
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Load Details
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                      mt: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Weight
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {loadData.details.weight}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Price
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        color="primary"
                      >
                        {loadData.details.price}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Distance
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {loadData.details.distance}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        ETA
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {loadData.details.estimatedTime}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ mb: 1.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Vehicle Type
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {loadData.details.vehicleType}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Load Type
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {loadData.details.loadType}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Driver Card */}
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
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Driver Information
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      my: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: "#3b82f6",
                      }}
                    >
                      <Person sx={{ fontSize: 28 }} />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={700}>
                        {loadData.vehicle.driver}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Vehicle: {loadData.vehicle.number}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<Phone />}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: "none",
                      }}
                    >
                      Call
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Message />}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: "none",
                      }}
                    >
                      Message
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              {/* Timeline Card */}
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
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Status Timeline
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    {loadData.timeline.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          gap: 2,
                          pb: index < loadData.timeline.length - 1 ? 2 : 0,
                          position: "relative",
                        }}
                      >
                        {/* Timeline line */}
                        {index < loadData.timeline.length - 1 && (
                          <Box
                            sx={{
                              position: "absolute",
                              left: 15,
                              top: 32,
                              bottom: 0,
                              width: 2,
                              bgcolor: item.completed
                                ? "#10b981"
                                : isDark
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.1)",
                            }}
                          />
                        )}

                        {/* Icon */}
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: item.completed ? "#10b981" : "transparent",
                            border: item.completed
                              ? "none"
                              : `2px solid ${
                                  isDark
                                    ? "rgba(255, 255, 255, 0.2)"
                                    : "rgba(0, 0, 0, 0.2)"
                                }`,
                            zIndex: 1,
                          }}
                        >
                          {item.completed ? (
                            <CheckCircle sx={{ fontSize: 18 }} />
                          ) : (
                            <Schedule
                              sx={{ fontSize: 16, color: "text.secondary" }}
                            />
                          )}
                        </Avatar>

                        {/* Content */}
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{ opacity: item.completed ? 1 : 0.6 }}
                          >
                            {item.status}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ opacity: item.completed ? 1 : 0.5 }}
                          >
                            {item.time}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoadDetailsPage;

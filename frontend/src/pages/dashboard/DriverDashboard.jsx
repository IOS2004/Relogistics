import React from "react";
import { Grid, Container, Typography, Box, Button } from "@mui/material";
import { CheckCircle, Warning, Phone } from "@mui/icons-material";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ModernStatCard from "../../components/common/ModernStatCard";
import CurrentTripEnhancedCard from "../../components/driver/CurrentTripEnhancedCard";
import UpcomingTripsCard from "../../components/driver/UpcomingTripsCard";
import DriverEarningsTracker from "../../components/driver/DriverEarningsTracker";
import { useIsMobile } from "../../hooks/useMediaQuery";

const DriverDashboard = () => {
  const [loading] = React.useState(false);
  const isMobile = useIsMobile();

  const stats = [
    {
      title: "Trips Completed",
      value: "127",
      change: "+12 this month",
      color: "#10b981",
    },
    {
      title: "Active Trip",
      value: "1",
      change: "In Transit",
      color: "#3b82f6",
    },
    {
      title: "This Month Earnings",
      value: "₹67,000",
      change: "+38% from last month",
      color: "#8b5cf6",
    },
    {
      title: "On-Time Deliveries",
      value: "98.5%",
      change: "Excellent rating",
      color: "#f59e0b",
    },
  ];

  // Sample data - replace with API calls
  const currentTrip = {
    status: "In Transit",
    pickup: "ABC Warehouse, Sector 5, Mumbai",
    dropoff: "XYZ Distribution Center, Pune",
    vehicle: "MH 01 AB 1234",
    eta: "2 hours 30 mins",
    loadId: "#12345",
    progress: 65,
  };

  const handleStatusUpdate = (status) => {
    console.log("Status updated:", status);
    // TODO: Implement status update API call
  };

  const handleNavigate = () => {
    console.log("Navigate to destination");
    // TODO: Open navigation app
  };

  const handleContact = () => {
    console.log("Contact broker/customer");
    // TODO: Open contact options
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}
    >
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Driver Dashboard
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            Track your trips and manage deliveries
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={6} lg={3} key={index}>
              <ModernStatCard {...stat} />
            </Grid>
          ))}
        </Grid>

        {/* Current Trip & Status Updates */}
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          <Grid item xs={12} lg={8}>
            <CurrentTripEnhancedCard
              trip={currentTrip}
              onNavigate={handleNavigate}
              onContact={handleContact}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #1a1d29 0%, #0a0e1a 100%)"
                    : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                    : "0 8px 32px rgba(0, 0, 0, 0.08)",
                border: (theme) =>
                  `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)"
                  }`,
              }}
            >
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                fontWeight={700}
                gutterBottom
                sx={{
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Update Trip Status
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<CheckCircle />}
                  onClick={() => handleStatusUpdate("reached_pickup")}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  }}
                >
                  Reached Pickup
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<CheckCircle />}
                  onClick={() => handleStatusUpdate("started_trip")}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                  }}
                >
                  Started Trip
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<CheckCircle />}
                  onClick={() => handleStatusUpdate("completed")}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  }}
                >
                  Completed
                </Button>
                <Box
                  sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: (theme) =>
                      `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.05)"
                      }`,
                  }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    color="error"
                    startIcon={<Warning />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: "none",
                      borderWidth: 2,
                      "&:hover": {
                        borderWidth: 2,
                      },
                    }}
                  >
                    Report Issue / SOS
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Earnings & Upcoming Trips */}
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} lg={7}>
            <DriverEarningsTracker />
          </Grid>
          <Grid item xs={12} lg={5}>
            <UpcomingTripsCard />
          </Grid>
        </Grid>
    </Container>
  );
};

export default DriverDashboard;

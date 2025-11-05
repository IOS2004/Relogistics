import React, { useState } from "react";
import { Grid, Typography, Box, Button, Container } from "@mui/material";
import {
  LocalShipping,
  AttachMoney,
  TrendingUp,
  Add,
  CheckCircle,
} from "@mui/icons-material";
import ModernStatCard from "../../components/common/ModernStatCard";
import LoadPostingForm from "../../components/forms/LoadPostingForm";
import EnhancedLoadCard from "../../components/loads/EnhancedLoadCard";
import RevenueChart from "../../components/charts/RevenueChart";
import DeliveryStatusChart from "../../components/charts/DeliveryStatusChart";
import VehicleTypeBarChart from "../../components/charts/VehicleTypeBarChart";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import { useIsMobile } from "../../hooks/useMediaQuery";

const BrokerDashboard = () => {
  const [openLoadForm, setOpenLoadForm] = useState(false);
  const isMobile = useIsMobile();

  const stats = [
    {
      title: "Active Loads",
      value: "12",
      subtitle: "Currently in transit",
      icon: LocalShipping,
      trend: "up",
      trendValue: "+8%",
      color: "blue",
    },
    {
      title: "Pending Payments",
      value: "₹45,000",
      subtitle: "To be collected",
      icon: AttachMoney,
      trend: "down",
      trendValue: "-12%",
      color: "orange",
    },
    {
      title: "Completed Trips",
      value: "156",
      subtitle: "This month",
      icon: CheckCircle,
      trend: "up",
      trendValue: "+23%",
      color: "green",
    },
    {
      title: "Monthly Earnings",
      value: "₹1,25,000",
      subtitle: "This month",
      icon: TrendingUp,
      trend: "up",
      trendValue: "+15%",
      color: "purple",
    },
  ];

  const recentLoads = [
    {
      id: 1,
      title: "Construction Materials",
      from: "Mumbai",
      to: "Pune",
      weight: "12 tons",
      price: "₹25,000",
      status: "In Transit",
      progress: 65,
      vehicleType: "Truck",
      driver: "Rajesh Kumar",
      eta: "2 hours",
    },
    {
      id: 2,
      title: "Electronics Shipment",
      from: "Delhi",
      to: "Noida",
      weight: "5 tons",
      price: "₹15,000",
      status: "Pending",
      progress: 10,
      vehicleType: "Van",
      driver: "Amit Singh",
      eta: "6 hours",
    },
    {
      id: 3,
      title: "Textile Products",
      from: "Surat",
      to: "Mumbai",
      weight: "8 tons",
      price: "₹18,000",
      status: "Delivered",
      progress: 100,
      vehicleType: "Container",
      driver: "Suresh Patel",
      eta: "Completed",
    },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}
    >
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Welcome back, Broker! 👋
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            Here's what's happening with your logistics operations today
          </Typography>
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            startIcon={!isMobile && <Add />}
            onClick={() => setOpenLoadForm(true)}
            sx={{
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
              borderRadius: 3,
              width: { xs: "100%", sm: "auto" },
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {isMobile ? "Post Load" : "Post New Load"}
          </Button>
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

        {/* Charts Section */}
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          <Grid item xs={12} lg={8}>
            <RevenueChart />
          </Grid>
          <Grid item xs={12} lg={4}>
            <DeliveryStatusChart />
          </Grid>
        </Grid>

        {/* Recent Loads Section */}
        <Box sx={{ mb: { xs: 2, md: 2 } }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight={700}
            gutterBottom
            sx={{ fontSize: { xs: "1.125rem", sm: "1.5rem" } }}
          >
            Recent Loads
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "0.813rem", sm: "0.875rem" },
            }}
          >
            Track and manage your active shipments
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          {recentLoads.map((load) => (
            <Grid item xs={12} sm={6} lg={4} key={load.id}>
              <EnhancedLoadCard load={load} />
            </Grid>
          ))}
        </Grid>

        {/* Vehicle Type & Activity Section */}
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} lg={7}>
            <VehicleTypeBarChart />
          </Grid>
          <Grid item xs={12} lg={5}>
            <ActivityFeed />
          </Grid>
        </Grid>

        <LoadPostingForm
          open={openLoadForm}
          onClose={() => setOpenLoadForm(false)}
          onSubmit={(values) => {
            console.log("Load posted:", values);
            setOpenLoadForm(false);
          }}
        />
      </Container>
  );
};

export default BrokerDashboard;

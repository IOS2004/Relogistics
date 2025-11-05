import React, { useState } from "react";
import { Grid, Container, Typography, Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import DashboardLayout from "../../components/layout/DashboardLayout";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import VehicleRegistrationForm from "../../components/forms/VehicleRegistrationForm";
import LoadListing from "../../components/loads/LoadListing";
import BidPlacementForm from "../../components/forms/BidPlacementForm";
import ModernStatCard from "../../components/common/ModernStatCard";
import EnhancedVehicleCard from "../../components/vehicles/EnhancedVehicleCard";
import VehicleUtilizationChart from "../../components/charts/VehicleUtilizationChart";
import EarningsChart from "../../components/charts/EarningsChart";
import EnhancedLoadCard from "../../components/loads/EnhancedLoadCard";
import { useIsMobile } from "../../hooks/useMediaQuery";

const VehicleOwnerDashboard = () => {
  const [loading] = useState(false);
  const [openVehicleForm, setOpenVehicleForm] = useState(false);
  const [openBidForm, setOpenBidForm] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const isMobile = useIsMobile();

  const stats = [
    {
      icon: "🚚",
      title: "Total Vehicles",
      value: "5",
      change: "+2 this month",
      color: "#3b82f6",
    },
    {
      icon: "🔄",
      title: "Active Trips",
      value: "3",
      change: "Currently running",
      color: "#8b5cf6",
    },
    {
      icon: "💰",
      title: "Monthly Earnings",
      value: "₹2,45,000",
      change: "+18% from last month",
      color: "#10b981",
    },
    {
      icon: "⏳",
      title: "Pending Payments",
      value: "₹85,000",
      change: "To be received",
      color: "#f59e0b",
    },
  ];

  // Sample data - replace with API calls
  const vehicles = [
    {
      id: 1,
      number: "MH12AB1234",
      type: "20ft Container",
      capacity: 12,
      status: "active",
      driver: "Raj Kumar",
      tripsCompleted: 127,
    },
    {
      id: 2,
      number: "MH14CD5678",
      type: "Open Truck",
      capacity: 8,
      status: "idle",
      driver: "Not Assigned",
      tripsCompleted: 89,
    },
    {
      id: 3,
      number: "MH01EF9012",
      type: "Closed Container",
      capacity: 15,
      status: "maintenance",
      driver: "Suresh Patel",
      tripsCompleted: 156,
    },
  ];

  const availableLoads = [
    {
      id: 1,
      title: "Construction Materials",
      from: "Mumbai",
      to: "Pune",
      weight: "12 tons",
      price: "₹25,000",
      status: "Available",
      progress: 0,
      vehicleType: "20ft Container",
      driver: "Bid to accept",
      eta: "10 hours",
    },
    {
      id: 2,
      title: "Electronics Shipment",
      from: "Delhi",
      to: "Noida",
      weight: "5 tons",
      price: "₹15,000",
      status: "Available",
      progress: 0,
      vehicleType: "Closed Container",
      driver: "Bid to accept",
      eta: "6 hours",
    },
    {
      id: 3,
      title: "FMCG Products",
      from: "Bangalore",
      to: "Chennai",
      weight: "10 tons",
      price: "₹22,000",
      status: "Available",
      progress: 0,
      vehicleType: "Temperature Controlled",
      driver: "Bid to accept",
      eta: "8 hours",
    },
  ];

  const handleVehicleSubmit = (values) => {
    console.log("Vehicle registered:", values);
    // TODO: API call to register vehicle
  };

  const handleBidSubmit = (values) => {
    console.log("Bid submitted:", values);
    // TODO: API call to submit bid
    setOpenBidForm(false);
  };

  const handlePlaceBid = (load) => {
    setSelectedLoad(load);
    setOpenBidForm(true);
  };

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenVehicleForm(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout>
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
            Vehicle Owner Dashboard 🚛
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            Manage your fleet and track earnings
          </Typography>
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            startIcon={!isMobile && <Add />}
            onClick={() => {
              setSelectedVehicle(null);
              setOpenVehicleForm(true);
            }}
            sx={{
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
              borderRadius: 3,
              width: { xs: "100%", sm: "auto" },
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {isMobile ? "Add Vehicle" : "Add New Vehicle"}
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
            <EarningsChart />
          </Grid>
          <Grid item xs={12} lg={4}>
            <VehicleUtilizationChart />
          </Grid>
        </Grid>

        {/* My Vehicles Section */}
        <Box sx={{ mb: { xs: 2, md: 2 } }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight={700}
            gutterBottom
            sx={{ fontSize: { xs: "1.125rem", sm: "1.5rem" } }}
          >
            My Fleet
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "0.813rem", sm: "0.875rem" },
            }}
          >
            Manage and monitor your vehicles
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          {vehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} lg={4} key={vehicle.id}>
              <EnhancedVehicleCard
                vehicle={vehicle}
                onEdit={handleEditVehicle}
              />
            </Grid>
          ))}
        </Grid>

        {/* Available Loads Section */}
        <Box sx={{ mb: { xs: 2, md: 2 } }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight={700}
            gutterBottom
            sx={{ fontSize: { xs: "1.125rem", sm: "1.5rem" } }}
          >
            Available Loads
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "0.813rem", sm: "0.875rem" },
            }}
          >
            Browse and bid on available shipments
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {availableLoads.map((load) => (
            <Grid item xs={12} sm={6} lg={4} key={load.id}>
              <EnhancedLoadCard
                load={load}
                onBid={() => handlePlaceBid(load)}
                showBidButton={true}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Dialogs */}
      <VehicleRegistrationForm
        open={openVehicleForm}
        onClose={() => {
          setOpenVehicleForm(false);
          setSelectedVehicle(null);
        }}
        onSubmit={handleVehicleSubmit}
        initialValues={selectedVehicle}
      />
      <BidPlacementForm
        open={openBidForm}
        onClose={() => setOpenBidForm(false)}
        onSubmit={handleBidSubmit}
        load={selectedLoad}
      />
    </DashboardLayout>
  );
};

export default VehicleOwnerDashboard;

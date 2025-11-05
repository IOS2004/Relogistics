import React, { useState } from "react";
import { Box, Container, Typography, Tabs, Tab, Paper } from "@mui/material";
import DashboardLayout from "../components/layout/DashboardLayout";
import LoadListing from "../components/loads/LoadListing";
import BidPlacementForm from "../components/forms/BidPlacementForm";

const LoadsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openBidForm, setOpenBidForm] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);

  // Sample data - replace with API calls
  const availableLoads = [
    {
      id: 1,
      title: "Construction Materials - Mumbai to Pune",
      type: "Construction Material",
      pickupLocation: "Mumbai, Maharashtra",
      dropLocation: "Pune, Maharashtra",
      pickupDate: "2025-11-10T08:00:00",
      deliveryDate: "2025-11-10T18:00:00",
      weight: 12,
      vehicleType: "20ft Container",
      budget: 25000,
      status: "available",
      description:
        "Heavy construction materials including cement and steel. Secure loading required.",
    },
    {
      id: 2,
      title: "Electronics Shipment - Delhi to Noida",
      type: "Electronics",
      pickupLocation: "Delhi",
      dropLocation: "Noida, UP",
      pickupDate: "2025-11-12T10:00:00",
      deliveryDate: "2025-11-12T16:00:00",
      weight: 5,
      vehicleType: "Closed Container",
      budget: 15000,
      status: "available",
      description:
        "Fragile electronics equipment, temperature control preferred.",
    },
    {
      id: 3,
      title: "FMCG Products - Bangalore to Chennai",
      type: "FMCG",
      pickupLocation: "Bangalore, Karnataka",
      dropLocation: "Chennai, Tamil Nadu",
      pickupDate: "2025-11-15T06:00:00",
      deliveryDate: "2025-11-16T18:00:00",
      weight: 18,
      vehicleType: "Trailer",
      budget: 45000,
      status: "available",
      description: "Fast moving consumer goods, multiple stops for unloading.",
    },
  ];

  const myBids = [
    {
      id: 4,
      title: "Agricultural Products",
      type: "Agricultural Products",
      pickupLocation: "Nashik, Maharashtra",
      dropLocation: "Mumbai, Maharashtra",
      pickupDate: "2025-11-08T05:00:00",
      deliveryDate: "2025-11-08T12:00:00",
      weight: 10,
      vehicleType: "Open Truck",
      budget: 18000,
      status: "pending",
      description: "Fresh agricultural produce, time-sensitive delivery.",
    },
  ];

  const acceptedLoads = [
    {
      id: 5,
      title: "Furniture Transport",
      type: "Furniture",
      pickupLocation: "Ahmedabad, Gujarat",
      dropLocation: "Surat, Gujarat",
      pickupDate: "2025-11-06T09:00:00",
      deliveryDate: "2025-11-06T15:00:00",
      weight: 8,
      vehicleType: "Closed Container",
      budget: 20000,
      status: "in_progress",
      description: "Residential furniture, handle with care.",
    },
  ];

  const completedLoads = [
    {
      id: 6,
      title: "Chemical Transport",
      type: "Chemicals",
      pickupLocation: "Pune, Maharashtra",
      dropLocation: "Nagpur, Maharashtra",
      pickupDate: "2025-11-01T07:00:00",
      deliveryDate: "2025-11-02T19:00:00",
      weight: 15,
      vehicleType: "Tanker",
      budget: 55000,
      status: "completed",
      description: "Industrial chemicals, safety protocols mandatory.",
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBidSubmit = (load) => {
    setSelectedLoad(load);
    setOpenBidForm(true);
  };

  const handleBidFormSubmit = (bidData) => {
    console.log("Bid submitted:", bidData);
    // TODO: API call to submit bid
  };

  const getLoadsForTab = () => {
    switch (tabValue) {
      case 0:
        return availableLoads;
      case 1:
        return myBids;
      case 2:
        return acceptedLoads;
      case 3:
        return completedLoads;
      default:
        return [];
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Loads
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse available loads and manage your bids
          </Typography>
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Available Loads" />
            <Tab label="My Bids" />
            <Tab label="Accepted Loads" />
            <Tab label="Completed" />
          </Tabs>
        </Paper>

        <Box>
          <LoadListing loads={getLoadsForTab()} onBidSubmit={handleBidSubmit} />
        </Box>

        <BidPlacementForm
          open={openBidForm}
          onClose={() => setOpenBidForm(false)}
          onSubmit={handleBidFormSubmit}
          load={selectedLoad}
        />
      </Container>
    </DashboardLayout>
  );
};

export default LoadsPage;

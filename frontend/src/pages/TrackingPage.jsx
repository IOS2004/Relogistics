import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
  Divider,
} from "@mui/material";
import { LocalShipping } from "@mui/icons-material";
import DashboardLayout from "../components/layout/DashboardLayout";
import LoadTracking from "../components/tracking/LoadTracking";

const TrackingPage = () => {
  const [selectedLoadId, setSelectedLoadId] = useState(1);

  // Sample data - replace with API calls
  const activeLoads = [
    {
      id: 1,
      title: "Construction Materials - Mumbai to Pune",
      pickupLocation: "Mumbai, Maharashtra",
      dropLocation: "Pune, Maharashtra",
      pickupDate: "2025-11-10T08:00:00",
      deliveryDate: "2025-11-10T18:00:00",
      weight: 12,
      vehicleType: "20ft Container",
      budget: 25000,
      status: "in_transit",
      driver: {
        name: "Raj Kumar",
        phone: "+91 98765 43210",
      },
      vehicleOwner: {
        name: "Suresh Patel",
        phone: "+91 98765 43211",
      },
      vehicle: {
        number: "MH12AB1234",
        type: "20ft Container",
      },
      events: [
        { timestamp: "2025-11-09T14:00:00", type: "posted" },
        { timestamp: "2025-11-09T16:30:00", type: "bid_accepted" },
        { timestamp: "2025-11-10T07:00:00", type: "driver_assigned" },
        { timestamp: "2025-11-10T08:15:00", type: "pickup_complete" },
        { timestamp: "2025-11-10T08:30:00", type: "in_transit" },
      ],
      activities: [
        {
          message: "Load posted by broker",
          user: "System",
          timestamp: "2025-11-09T14:00:00",
        },
        {
          message: "Bid accepted from Suresh Patel",
          user: "Broker",
          timestamp: "2025-11-09T16:30:00",
        },
        {
          message: "Driver Raj Kumar assigned to load",
          user: "Vehicle Owner",
          timestamp: "2025-11-10T07:00:00",
        },
        {
          message: "Load picked up from Mumbai",
          user: "Driver",
          timestamp: "2025-11-10T08:15:00",
        },
        {
          message: "En route to Pune, ETA 6 hours",
          user: "Driver",
          timestamp: "2025-11-10T08:30:00",
        },
      ],
    },
    {
      id: 2,
      title: "Electronics Shipment - Delhi to Noida",
      pickupLocation: "Delhi",
      dropLocation: "Noida, UP",
      pickupDate: "2025-11-12T10:00:00",
      deliveryDate: "2025-11-12T16:00:00",
      weight: 5,
      vehicleType: "Closed Container",
      budget: 15000,
      status: "driver_assigned",
      driver: {
        name: "Amit Sharma",
        phone: "+91 98765 43212",
      },
      vehicleOwner: {
        name: "Rakesh Verma",
        phone: "+91 98765 43213",
      },
      vehicle: {
        number: "DL03CD5678",
        type: "Closed Container",
      },
      events: [
        { timestamp: "2025-11-11T10:00:00", type: "posted" },
        { timestamp: "2025-11-11T14:30:00", type: "bid_accepted" },
        { timestamp: "2025-11-12T08:00:00", type: "driver_assigned" },
      ],
      activities: [
        {
          message: "Load posted by broker",
          user: "System",
          timestamp: "2025-11-11T10:00:00",
        },
        {
          message: "Bid accepted from Rakesh Verma",
          user: "Broker",
          timestamp: "2025-11-11T14:30:00",
        },
        {
          message: "Driver Amit Sharma assigned to load",
          user: "Vehicle Owner",
          timestamp: "2025-11-12T08:00:00",
        },
      ],
    },
    {
      id: 3,
      title: "FMCG Products - Bangalore to Chennai",
      pickupLocation: "Bangalore, Karnataka",
      dropLocation: "Chennai, Tamil Nadu",
      pickupDate: "2025-11-15T06:00:00",
      deliveryDate: "2025-11-16T18:00:00",
      weight: 18,
      vehicleType: "Trailer",
      budget: 45000,
      status: "pickup_complete",
      driver: {
        name: "Vijay Kumar",
        phone: "+91 98765 43214",
      },
      vehicleOwner: {
        name: "Ramesh Reddy",
        phone: "+91 98765 43215",
      },
      vehicle: {
        number: "KA05EF9012",
        type: "Trailer",
      },
      events: [
        { timestamp: "2025-11-13T09:00:00", type: "posted" },
        { timestamp: "2025-11-13T15:00:00", type: "bid_accepted" },
        { timestamp: "2025-11-14T18:00:00", type: "driver_assigned" },
        { timestamp: "2025-11-15T06:30:00", type: "pickup_complete" },
      ],
      activities: [
        {
          message: "Load posted by broker",
          user: "System",
          timestamp: "2025-11-13T09:00:00",
        },
        {
          message: "Bid accepted from Ramesh Reddy",
          user: "Broker",
          timestamp: "2025-11-13T15:00:00",
        },
        {
          message: "Driver Vijay Kumar assigned to load",
          user: "Vehicle Owner",
          timestamp: "2025-11-14T18:00:00",
        },
        {
          message: "Load picked up from Bangalore warehouse",
          user: "Driver",
          timestamp: "2025-11-15T06:30:00",
        },
      ],
    },
  ];

  const selectedLoad = activeLoads.find((load) => load.id === selectedLoadId);

  const getStatusColor = (status) => {
    const colors = {
      posted: "info",
      bid_accepted: "primary",
      driver_assigned: "secondary",
      pickup_complete: "warning",
      in_transit: "warning",
      delivered: "success",
    };
    return colors[status] || "default";
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Track Loads
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time tracking of your active shipments
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Load List */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ height: "calc(100vh - 250px)", overflow: "auto" }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
                <Typography variant="h6">
                  Active Loads ({activeLoads.length})
                </Typography>
              </Box>
              <List>
                {activeLoads.map((load, index) => (
                  <React.Fragment key={load.id}>
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedLoadId === load.id}
                        onClick={() => setSelectedLoadId(load.id)}
                      >
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <LocalShipping fontSize="small" />
                              <Typography variant="body1" noWrap>
                                {load.title}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="caption" display="block">
                                {load.pickupLocation} → {load.dropLocation}
                              </Typography>
                              <Chip
                                label={load.status?.replace(/_/g, " ")}
                                color={getStatusColor(load.status)}
                                size="small"
                                sx={{ mt: 0.5 }}
                              />
                            </Box>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    {index < activeLoads.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Tracking Details */}
          <Grid item xs={12} md={8}>
            <Paper
              sx={{ p: 3, height: "calc(100vh - 250px)", overflow: "auto" }}
            >
              {selectedLoad ? (
                <LoadTracking load={selectedLoad} />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <LocalShipping
                    sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    Select a load to view tracking details
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default TrackingPage;

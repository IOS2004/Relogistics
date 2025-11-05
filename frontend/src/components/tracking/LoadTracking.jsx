import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
  Chip,
  Button,
  Divider,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import {
  CheckCircle,
  LocalShipping,
  LocationOn,
  Schedule,
  Phone,
  AccessTime,
  Event,
  Map,
  Timeline,
} from "@mui/icons-material";
import MapComponent from "../map/MapComponent";

const TrackingTimeline = ({ status, events = [] }) => {
  const steps = [
    {
      label: "Load Posted",
      description: "Broker posted the load requirement",
      icon: <Event />,
    },
    {
      label: "Bid Accepted",
      description: "Vehicle owner bid accepted",
      icon: <CheckCircle />,
    },
    {
      label: "Driver Assigned",
      description: "Driver assigned to the load",
      icon: <LocalShipping />,
    },
    {
      label: "Pickup Complete",
      description: "Load picked up from source",
      icon: <LocationOn />,
    },
    {
      label: "In Transit",
      description: "Load is on the way to destination",
      icon: <LocalShipping />,
    },
    {
      label: "Delivered",
      description: "Load delivered successfully",
      icon: <CheckCircle />,
    },
  ];

  const activeStep = steps.findIndex(
    (step) => step.label.toLowerCase().replace(/\s+/g, "_") === status
  );

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={step.label} completed={index < activeStep}>
          <StepLabel
            StepIconComponent={() => (
              <Avatar
                sx={{
                  bgcolor: index <= activeStep ? "primary.main" : "grey.400",
                  width: 32,
                  height: 32,
                }}
              >
                {step.icon}
              </Avatar>
            )}
          >
            <Typography variant="subtitle2">{step.label}</Typography>
          </StepLabel>
          <StepContent>
            <Typography variant="body2" color="text.secondary">
              {step.description}
            </Typography>
            {events[index] && (
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: 1 }}
              >
                {new Date(events[index].timestamp).toLocaleString()}
              </Typography>
            )}
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

const ActivityLog = ({ activities = [] }) => {
  return (
    <List>
      {activities.map((activity, index) => (
        <ListItem key={index} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary.light" }}>
              <AccessTime />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={activity.message}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {activity.user}
                </Typography>
                {" • "}
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                >
                  {new Date(activity.timestamp).toLocaleString()}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
      {activities.length === 0 && (
        <ListItem>
          <ListItemText
            primary="No activity yet"
            secondary="Activity will appear here as the load progresses"
          />
        </ListItem>
      )}
    </List>
  );
};

const LoadTracking = ({ load }) => {
  const [showMap, setShowMap] = useState(false);

  if (!load) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No load selected for tracking
        </Typography>
      </Box>
    );
  }

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

  const progress = (() => {
    const statuses = [
      "posted",
      "bid_accepted",
      "driver_assigned",
      "pickup_complete",
      "in_transit",
      "delivered",
    ];
    const index = statuses.indexOf(load.status);
    return ((index + 1) / statuses.length) * 100;
  })();

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Load Summary Card */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">{load.title}</Typography>
                <Chip
                  label={load.status?.replace(/_/g, " ").toUpperCase()}
                  color={getStatusColor(load.status)}
                  size="small"
                />
              </Box>

              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ mb: 2, height: 8, borderRadius: 1 }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LocationOn sx={{ mr: 1, color: "success.main" }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Pickup Location
                      </Typography>
                      <Typography variant="body2">
                        {load.pickupLocation}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LocationOn sx={{ mr: 1, color: "error.main" }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Drop Location
                      </Typography>
                      <Typography variant="body2">
                        {load.dropLocation}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Schedule sx={{ mr: 1, color: "text.secondary" }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Pickup Date
                      </Typography>
                      <Typography variant="body2">
                        {new Date(load.pickupDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Schedule sx={{ mr: 1, color: "text.secondary" }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Delivery Date
                      </Typography>
                      <Typography variant="body2">
                        {new Date(load.deliveryDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">
                    Weight
                  </Typography>
                  <Typography variant="body2">{load.weight} tons</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">
                    Amount
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="primary">
                    ₹{load.budget?.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Button
                  variant={showMap ? "contained" : "outlined"}
                  size="small"
                  startIcon={<LocationOn />}
                  onClick={() => setShowMap(!showMap)}
                >
                  {showMap ? "Hide Map" : "Show Map"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Map View */}
        {showMap && (
          <Grid item xs={12}>
            <MapComponent
              pickup={{
                lat: 19.076,
                lng: 72.8777,
                name: load.pickupLocation,
                address: load.pickupLocation,
              }}
              dropoff={{
                lat: 18.5204,
                lng: 73.8567,
                name: load.dropLocation,
                address: load.dropLocation,
              }}
              vehicleLocation={
                load.status === "in_transit" ||
                load.status === "pickup_complete"
                  ? {
                      lat: 18.8,
                      lng: 73.3,
                      name: "Current Location",
                      driver: load.driver?.name,
                      vehicleNumber: load.vehicle?.number,
                    }
                  : null
              }
              height="500px"
              zoom={8}
            />
          </Grid>
        )}

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {load.driver && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Driver Details
                  </Typography>
                  <Typography variant="body2">{load.driver.name}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Phone sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2">{load.driver.phone}</Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Phone />}
                    sx={{ mt: 1 }}
                    href={`tel:${load.driver.phone}`}
                  >
                    Call Driver
                  </Button>
                </Box>
              )}

              {load.vehicleOwner && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Vehicle Owner Details
                  </Typography>
                  <Typography variant="body2">
                    {load.vehicleOwner.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Phone sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2">
                      {load.vehicleOwner.phone}
                    </Typography>
                  </Box>
                </Box>
              )}

              {load.vehicle && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Vehicle Details
                  </Typography>
                  <Typography variant="body2">
                    {load.vehicle.number} - {load.vehicle.type}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Timeline */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Status Timeline
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TrackingTimeline
                status={load.status}
                events={load.events || []}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Log */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Activity Log
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ActivityLog activities={load.activities || []} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoadTracking;

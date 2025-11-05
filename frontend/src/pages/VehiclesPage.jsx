import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  LocalShipping,
  CheckCircle,
  Warning,
  Build,
} from "@mui/icons-material";
import DashboardLayout from "../components/layout/DashboardLayout";
import VehicleRegistrationForm from "../components/forms/VehicleRegistrationForm";

const VehicleDetailsDialog = ({ open, onClose, vehicle }) => {
  if (!vehicle) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Vehicle Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant="h6">{vehicle.number}</Typography>
            <Chip
              label={vehicle.status}
              color={
                vehicle.status === "active"
                  ? "success"
                  : vehicle.status === "idle"
                  ? "default"
                  : "warning"
              }
              size="small"
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Type
            </Typography>
            <Typography variant="body1">{vehicle.type}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Capacity
            </Typography>
            <Typography variant="body1">{vehicle.capacity} tons</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Model
            </Typography>
            <Typography variant="body1">{vehicle.model}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Year
            </Typography>
            <Typography variant="body1">{vehicle.year}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              RC Number
            </Typography>
            <Typography variant="body2">{vehicle.rcNumber}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Insurance
            </Typography>
            <Typography variant="body2">{vehicle.insuranceNumber}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Insurance Expiry
            </Typography>
            <Typography variant="body2">
              {new Date(vehicle.insuranceExpiry).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              PUC Expiry
            </Typography>
            <Typography variant="body2">
              {new Date(vehicle.pucExpiry).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              GPS Tracking
            </Typography>
            <Typography variant="body2">
              {vehicle.hasGPS ? "Yes" : "No"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Temperature Control
            </Typography>
            <Typography variant="body2">
              {vehicle.hasTemperatureControl ? "Yes" : "No"}
            </Typography>
          </Grid>
          {vehicle.driver && (
            <>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  Current Driver
                </Typography>
                <Typography variant="body1">{vehicle.driver}</Typography>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const VehiclesPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Sample data - replace with API calls
  const vehicles = [
    {
      id: 1,
      number: "MH12AB1234",
      type: "20ft Container",
      capacity: 12,
      model: "Tata LPT 1918",
      year: 2022,
      status: "active",
      driver: "Raj Kumar",
      rcNumber: "RC12345678",
      insuranceNumber: "INS987654321",
      insuranceExpiry: "2025-12-31",
      pucExpiry: "2025-06-30",
      hasGPS: true,
      hasTemperatureControl: false,
      totalTrips: 45,
      earnings: 225000,
    },
    {
      id: 2,
      number: "MH14CD5678",
      type: "Open Truck",
      capacity: 8,
      model: "Ashok Leyland",
      year: 2021,
      status: "idle",
      driver: "Not Assigned",
      rcNumber: "RC87654321",
      insuranceNumber: "INS123456789",
      insuranceExpiry: "2025-10-15",
      pucExpiry: "2025-04-15",
      hasGPS: true,
      hasTemperatureControl: false,
      totalTrips: 38,
      earnings: 190000,
    },
    {
      id: 3,
      number: "GJ01EF9012",
      type: "Refrigerated",
      capacity: 10,
      model: "Eicher Pro 6025",
      year: 2023,
      status: "active",
      driver: "Amit Patel",
      rcNumber: "RC11223344",
      insuranceNumber: "INS445566778",
      insuranceExpiry: "2026-03-20",
      pucExpiry: "2025-09-20",
      hasGPS: true,
      hasTemperatureControl: true,
      totalTrips: 28,
      earnings: 168000,
    },
    {
      id: 4,
      number: "KA03GH3456",
      type: "Trailer",
      capacity: 20,
      model: "BharatBenz",
      year: 2020,
      status: "maintenance",
      driver: "Suresh Reddy",
      rcNumber: "RC99887766",
      insuranceNumber: "INS998877665",
      insuranceExpiry: "2025-08-10",
      pucExpiry: "2025-02-10",
      hasGPS: true,
      hasTemperatureControl: false,
      totalTrips: 62,
      earnings: 372000,
    },
  ];

  const stats = {
    total: vehicles.length,
    active: vehicles.filter((v) => v.status === "active").length,
    idle: vehicles.filter((v) => v.status === "idle").length,
    maintenance: vehicles.filter((v) => v.status === "maintenance").length,
    totalEarnings: vehicles.reduce((sum, v) => sum + v.earnings, 0),
  };

  const handleAdd = () => {
    setSelectedVehicle(null);
    setOpenForm(true);
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenForm(true);
  };

  const handleView = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenDetails(true);
  };

  const handleDelete = (vehicleId) => {
    console.log("Delete vehicle:", vehicleId);
    // TODO: API call to delete vehicle
  };

  const handleSubmit = (values) => {
    console.log("Vehicle submitted:", values);
    // TODO: API call to create/update vehicle
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "idle":
        return "default";
      case "maintenance":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle />;
      case "idle":
        return <Warning />;
      case "maintenance":
        return <Build />;
      default:
        return <LocalShipping />;
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              My Vehicles
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your fleet of vehicles
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
            Add Vehicle
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocalShipping sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6">Total Vehicles</Typography>
                </Box>
                <Typography variant="h3">{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CheckCircle sx={{ mr: 1, color: "success.main" }} />
                  <Typography variant="h6">Active</Typography>
                </Box>
                <Typography variant="h3" color="success.main">
                  {stats.active}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Warning sx={{ mr: 1, color: "default" }} />
                  <Typography variant="h6">Idle</Typography>
                </Box>
                <Typography variant="h3">{stats.idle}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Build sx={{ mr: 1, color: "warning.main" }} />
                  <Typography variant="h6">Maintenance</Typography>
                </Box>
                <Typography variant="h3" color="warning.main">
                  {stats.maintenance}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Vehicles Table */}
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vehicle Number</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Capacity</TableCell>
                  <TableCell>Driver</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Total Trips</TableCell>
                  <TableCell align="right">Earnings</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} hover>
                    <TableCell>
                      <Typography fontWeight="bold">
                        {vehicle.number}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {vehicle.model} ({vehicle.year})
                      </Typography>
                    </TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.capacity} tons</TableCell>
                    <TableCell>{vehicle.driver}</TableCell>
                    <TableCell>
                      <Chip
                        label={vehicle.status}
                        color={getStatusColor(vehicle.status)}
                        icon={getStatusIcon(vehicle.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">{vehicle.totalTrips}</TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="bold">
                        ₹{vehicle.earnings.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => handleView(vehicle)}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(vehicle)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Forms and Dialogs */}
        <VehicleRegistrationForm
          open={openForm}
          onClose={() => {
            setOpenForm(false);
            setSelectedVehicle(null);
          }}
          onSubmit={handleSubmit}
          initialValues={selectedVehicle}
        />
        <VehicleDetailsDialog
          open={openDetails}
          onClose={() => setOpenDetails(false)}
          vehicle={selectedVehicle}
        />
      </Container>
    </DashboardLayout>
  );
};

export default VehiclesPage;

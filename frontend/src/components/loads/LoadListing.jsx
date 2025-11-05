import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import {
  Search,
  FilterList,
  LocationOn,
  LocalShipping,
  CalendarToday,
  CurrencyRupee,
} from "@mui/icons-material";

const LoadCard = ({ load, onBid, onViewDetails }) => {
  const getStatusColor = (status) => {
    const colors = {
      available: "success",
      pending: "warning",
      in_progress: "info",
      completed: "default",
    };
    return colors[status] || "default";
  };

  return (
    <Card sx={{ mb: 2, "&:hover": { boxShadow: 3 } }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" component="div">
            {load.title}
          </Typography>
          <Chip
            label={load.status}
            color={getStatusColor(load.status)}
            size="small"
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOn
                sx={{ mr: 1, color: "text.secondary" }}
                fontSize="small"
              />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Pickup
                </Typography>
                <Typography variant="body2">{load.pickupLocation}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOn
                sx={{ mr: 1, color: "text.secondary" }}
                fontSize="small"
              />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Drop
                </Typography>
                <Typography variant="body2">{load.dropLocation}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalShipping
                sx={{ mr: 1, color: "text.secondary" }}
                fontSize="small"
              />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Weight
                </Typography>
                <Typography variant="body2">{load.weight} tons</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalShipping
                sx={{ mr: 1, color: "text.secondary" }}
                fontSize="small"
              />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Vehicle
                </Typography>
                <Typography variant="body2">{load.vehicleType}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CalendarToday
                sx={{ mr: 1, color: "text.secondary" }}
                fontSize="small"
              />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
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
              <CurrencyRupee
                sx={{ mr: 1, color: "text.secondary" }}
                fontSize="small"
              />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Budget
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  ₹{load.budget?.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {load.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {load.description.length > 100
              ? `${load.description.substring(0, 100)}...`
              : load.description}
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onViewDetails(load)}
          >
            View Details
          </Button>
          {load.status === "available" && (
            <Button
              variant="contained"
              size="small"
              onClick={() => onBid(load)}
            >
              Place Bid
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const LoadDetailsDialog = ({ open, onClose, load }) => {
  if (!load) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">{load.title}</Typography>
        <Chip label={load.status} size="small" sx={{ ml: 1 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Route Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Pickup Location
                </Typography>
                <Typography variant="body1">{load.pickupLocation}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Drop Location
                </Typography>
                <Typography variant="body1">{load.dropLocation}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Pickup Date
                </Typography>
                <Typography variant="body1">
                  {new Date(load.pickupDate).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Delivery Date
                </Typography>
                <Typography variant="body1">
                  {new Date(load.deliveryDate).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Load Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Load Type
                </Typography>
                <Typography variant="body1">{load.type}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Weight
                </Typography>
                <Typography variant="body1">{load.weight} tons</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Vehicle Type Required
                </Typography>
                <Typography variant="body1">{load.vehicleType}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Budget
                </Typography>
                <Typography variant="h6" color="primary">
                  ₹{load.budget?.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {load.description && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Description
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2">{load.description}</Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {load.status === "available" && (
          <Button variant="contained" color="primary">
            Place Bid
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

const LoadListing = ({ loads = [], onBidSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterVehicleType, setFilterVehicleType] = useState("all");
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const vehicleTypes = [
    "20ft Container",
    "Open Truck",
    "Closed Container",
    "Refrigerated",
    "Mini Truck",
    "Trailer",
  ];

  const loadTypes = [
    "FMCG",
    "Construction Material",
    "Electronics",
    "Furniture",
    "Chemicals",
    "Agricultural Products",
  ];

  const filteredLoads = loads.filter((load) => {
    const matchesSearch =
      load.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.dropLocation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || load.type === filterType;
    const matchesVehicleType =
      filterVehicleType === "all" || load.vehicleType === filterVehicleType;

    return matchesSearch && matchesType && matchesVehicleType;
  });

  const handleViewDetails = (load) => {
    setSelectedLoad(load);
    setDetailsOpen(true);
  };

  const handleBid = (load) => {
    // Open bid dialog or call parent callback
    onBidSubmit && onBidSubmit(load);
  };

  return (
    <Box>
      {/* Search and Filters */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by title, pickup, or drop location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Load Type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterList />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">All Types</MenuItem>
              {loadTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Vehicle Type"
              value={filterVehicleType}
              onChange={(e) => setFilterVehicleType(e.target.value)}
            >
              <MenuItem value="all">All Vehicles</MenuItem>
              {vehicleTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      {/* Results Summary */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredLoads.length} of {loads.length} loads
        </Typography>
      </Box>

      {/* Load Cards */}
      {filteredLoads.length > 0 ? (
        filteredLoads.map((load) => (
          <LoadCard
            key={load.id}
            load={load}
            onBid={handleBid}
            onViewDetails={handleViewDetails}
          />
        ))
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <LocalShipping
            sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No loads found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      )}

      {/* Load Details Dialog */}
      <LoadDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        load={selectedLoad}
      />
    </Box>
  );
};

export default LoadListing;

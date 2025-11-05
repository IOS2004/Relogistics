import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  vehicleNumber: yup
    .string()
    .required("Vehicle number is required")
    .matches(
      /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/,
      "Invalid vehicle number format (e.g., MH12AB1234)"
    ),
  vehicleType: yup.string().required("Vehicle type is required"),
  capacity: yup
    .number()
    .required("Capacity is required")
    .positive("Capacity must be positive"),
  model: yup.string().required("Model is required"),
  year: yup
    .number()
    .required("Manufacturing year is required")
    .min(2000, "Year must be 2000 or later")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  rcNumber: yup.string().required("RC number is required"),
  insuranceNumber: yup.string().required("Insurance number is required"),
  insuranceExpiry: yup.date().required("Insurance expiry date is required"),
  pucExpiry: yup.date().required("PUC expiry date is required"),
  hasGPS: yup.boolean(),
  hasTemperatureControl: yup.boolean(),
});

const vehicleTypes = [
  "20ft Container",
  "Open Truck",
  "Closed Container",
  "Refrigerated",
  "Mini Truck",
  "Trailer",
  "Tanker",
  "Flatbed",
];

const VehicleRegistrationForm = ({
  open,
  onClose,
  onSubmit,
  initialValues = null,
}) => {
  const formik = useFormik({
    initialValues: initialValues || {
      vehicleNumber: "",
      vehicleType: "",
      capacity: "",
      model: "",
      year: "",
      rcNumber: "",
      insuranceNumber: "",
      insuranceExpiry: "",
      pucExpiry: "",
      hasGPS: false,
      hasTemperatureControl: false,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      fullScreen={window.innerWidth < 600}
      PaperProps={{
        sx: {
          m: { xs: 0, sm: 2 },
          maxHeight: { xs: "100vh", sm: "90vh" },
        }
      }}
    >
      <DialogTitle>
        <Typography 
          variant="h6"
          sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}
        >
          {initialValues ? "Edit Vehicle" : "Register New Vehicle"}
        </Typography>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={{ xs: 2, sm: 2 }}>
            {/* Basic Details */}
            <Grid item xs={12}>
              <Typography 
                variant="subtitle1" 
                color="primary" 
                gutterBottom
                sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}
              >
                Basic Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="vehicleNumber"
                label="Vehicle Number"
                placeholder="MH12AB1234"
                value={formik.values.vehicleNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.vehicleNumber &&
                  Boolean(formik.errors.vehicleNumber)
                }
                helperText={
                  formik.touched.vehicleNumber && formik.errors.vehicleNumber
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                name="vehicleType"
                label="Vehicle Type"
                value={formik.values.vehicleType}
                onChange={formik.handleChange}
                error={
                  formik.touched.vehicleType &&
                  Boolean(formik.errors.vehicleType)
                }
                helperText={
                  formik.touched.vehicleType && formik.errors.vehicleType
                }
              >
                {vehicleTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="model"
                label="Model"
                placeholder="e.g., Tata LPT 1918"
                value={formik.values.model}
                onChange={formik.handleChange}
                error={formik.touched.model && Boolean(formik.errors.model)}
                helperText={formik.touched.model && formik.errors.model}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="year"
                label="Manufacturing Year"
                type="number"
                value={formik.values.year}
                onChange={formik.handleChange}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={formik.touched.year && formik.errors.year}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="capacity"
                label="Capacity (tons)"
                type="number"
                value={formik.values.capacity}
                onChange={formik.handleChange}
                error={
                  formik.touched.capacity && Boolean(formik.errors.capacity)
                }
                helperText={formik.touched.capacity && formik.errors.capacity}
              />
            </Grid>

            {/* Document Details */}
            <Grid item xs={12} sx={{ mt: { xs: 1, sm: 2 } }}>
              <Typography 
                variant="subtitle1" 
                color="primary" 
                gutterBottom
                sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}
              >
                Document Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="rcNumber"
                label="RC Number"
                value={formik.values.rcNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.rcNumber && Boolean(formik.errors.rcNumber)
                }
                helperText={formik.touched.rcNumber && formik.errors.rcNumber}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="insuranceNumber"
                label="Insurance Number"
                value={formik.values.insuranceNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.insuranceNumber &&
                  Boolean(formik.errors.insuranceNumber)
                }
                helperText={
                  formik.touched.insuranceNumber &&
                  formik.errors.insuranceNumber
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="insuranceExpiry"
                label="Insurance Expiry"
                type="date"
                value={formik.values.insuranceExpiry}
                onChange={formik.handleChange}
                error={
                  formik.touched.insuranceExpiry &&
                  Boolean(formik.errors.insuranceExpiry)
                }
                helperText={
                  formik.touched.insuranceExpiry &&
                  formik.errors.insuranceExpiry
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="pucExpiry"
                label="PUC Expiry"
                type="date"
                value={formik.values.pucExpiry}
                onChange={formik.handleChange}
                error={
                  formik.touched.pucExpiry && Boolean(formik.errors.pucExpiry)
                }
                helperText={formik.touched.pucExpiry && formik.errors.pucExpiry}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Features */}
            <Grid item xs={12} sx={{ mt: { xs: 1, sm: 2 } }}>
              <Typography 
                variant="subtitle1" 
                color="primary" 
                gutterBottom
                sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}
              >
                Features
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="hasGPS"
                    checked={formik.values.hasGPS}
                    onChange={formik.handleChange}
                  />
                }
                label="GPS Tracking Available"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="hasTemperatureControl"
                    checked={formik.values.hasTemperatureControl}
                    onChange={formik.handleChange}
                  />
                }
                label="Temperature Control"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 2 } }}>
          <Button 
            onClick={onClose}
            sx={{ fontSize: { xs: "0.875rem", sm: "0.875rem" } }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ 
              fontSize: { xs: "0.875rem", sm: "0.875rem" },
              px: { xs: 2, sm: 3 },
            }}
          >
            {initialValues ? "Update Vehicle" : "Register Vehicle"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VehicleRegistrationForm;

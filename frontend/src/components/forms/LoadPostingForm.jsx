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
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  title: yup.string().required("Load title is required"),
  type: yup.string().required("Load type is required"),
  weight: yup
    .number()
    .required("Weight is required")
    .positive("Weight must be positive"),
  pickupLocation: yup.string().required("Pickup location is required"),
  dropLocation: yup.string().required("Drop location is required"),
  budget: yup
    .number()
    .required("Budget is required")
    .positive("Budget must be positive"),
  vehicleType: yup.string().required("Vehicle type is required"),
  description: yup.string(),
  pickupDate: yup.date().required("Pickup date is required"),
  deliveryDate: yup.date().required("Delivery date is required"),
});

const loadTypes = [
  "FMCG",
  "Construction Material",
  "Electronics",
  "Furniture",
  "Chemicals",
  "Agricultural Products",
  "Others",
];

const vehicleTypes = [
  "20ft Container",
  "Open Truck",
  "Closed Container",
  "Refrigerated",
  "Mini Truck",
  "Trailer",
];

const LoadPostingForm = ({ open, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      weight: "",
      pickupLocation: "",
      dropLocation: "",
      budget: "",
      vehicleType: "",
      description: "",
      pickupDate: "",
      deliveryDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Post New Load</Typography>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="title"
                label="Load Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                name="type"
                label="Load Type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              >
                {loadTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="weight"
                label="Weight (tons)"
                type="number"
                value={formik.values.weight}
                onChange={formik.handleChange}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="pickupLocation"
                label="Pickup Location"
                value={formik.values.pickupLocation}
                onChange={formik.handleChange}
                error={
                  formik.touched.pickupLocation &&
                  Boolean(formik.errors.pickupLocation)
                }
                helperText={
                  formik.touched.pickupLocation && formik.errors.pickupLocation
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="dropLocation"
                label="Drop Location"
                value={formik.values.dropLocation}
                onChange={formik.handleChange}
                error={
                  formik.touched.dropLocation &&
                  Boolean(formik.errors.dropLocation)
                }
                helperText={
                  formik.touched.dropLocation && formik.errors.dropLocation
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="pickupDate"
                label="Pickup Date"
                type="datetime-local"
                value={formik.values.pickupDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.pickupDate && Boolean(formik.errors.pickupDate)
                }
                helperText={
                  formik.touched.pickupDate && formik.errors.pickupDate
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="deliveryDate"
                label="Delivery Date"
                type="datetime-local"
                value={formik.values.deliveryDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.deliveryDate &&
                  Boolean(formik.errors.deliveryDate)
                }
                helperText={
                  formik.touched.deliveryDate && formik.errors.deliveryDate
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="budget"
                label="Budget (₹)"
                type="number"
                value={formik.values.budget}
                onChange={formik.handleChange}
                error={formik.touched.budget && Boolean(formik.errors.budget)}
                helperText={formik.touched.budget && formik.errors.budget}
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

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="description"
                label="Additional Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Post Load
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoadPostingForm;

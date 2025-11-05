import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  Divider,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  bidAmount: yup
    .number()
    .required("Bid amount is required")
    .positive("Bid amount must be positive"),
  estimatedDeliveryTime: yup
    .number()
    .required("Estimated delivery time is required")
    .positive(),
  message: yup.string().max(500, "Message must be 500 characters or less"),
});

const BidPlacementForm = ({ open, onClose, onSubmit, load }) => {
  const formik = useFormik({
    initialValues: {
      bidAmount: load?.budget || "",
      estimatedDeliveryTime: "",
      message: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit({
        ...values,
        loadId: load?.id,
      });
      formik.resetForm();
      onClose();
    },
  });

  if (!load) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Place Your Bid</Typography>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {/* Load Summary */}
          <Box
            sx={{ mb: 3, p: 2, bgcolor: "background.default", borderRadius: 1 }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Load Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {load.title}
            </Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Route
                </Typography>
                <Typography variant="body2">
                  {load.pickupLocation} → {load.dropLocation}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Budget
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  ₹{load.budget?.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Bid Form */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Competitive bids increase your chances of winning the load
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="bidAmount"
                label="Your Bid Amount (₹)"
                type="number"
                value={formik.values.bidAmount}
                onChange={formik.handleChange}
                error={
                  formik.touched.bidAmount && Boolean(formik.errors.bidAmount)
                }
                helperText={
                  formik.touched.bidAmount && formik.errors.bidAmount
                    ? formik.errors.bidAmount
                    : `Broker's budget: ₹${load.budget?.toLocaleString()}`
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="estimatedDeliveryTime"
                label="Estimated Delivery Time (hours)"
                type="number"
                value={formik.values.estimatedDeliveryTime}
                onChange={formik.handleChange}
                error={
                  formik.touched.estimatedDeliveryTime &&
                  Boolean(formik.errors.estimatedDeliveryTime)
                }
                helperText={
                  formik.touched.estimatedDeliveryTime &&
                  formik.errors.estimatedDeliveryTime
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="message"
                label="Additional Message (Optional)"
                placeholder="Share your experience, vehicle details, or any relevant information..."
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={
                  formik.touched.message && formik.errors.message
                    ? formik.errors.message
                    : `${formik.values.message.length}/500 characters`
                }
              />
            </Grid>

            {formik.values.bidAmount && load.budget && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor:
                      formik.values.bidAmount <= load.budget
                        ? "success.light"
                        : "warning.light",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">
                    {formik.values.bidAmount <= load.budget ? (
                      <>
                        ✓ Your bid is{" "}
                        <strong>
                          ₹
                          {(
                            load.budget - formik.values.bidAmount
                          ).toLocaleString()}
                        </strong>{" "}
                        lower than the budget
                      </>
                    ) : (
                      <>
                        ⚠ Your bid is{" "}
                        <strong>
                          ₹
                          {(
                            formik.values.bidAmount - load.budget
                          ).toLocaleString()}
                        </strong>{" "}
                        higher than the budget
                      </>
                    )}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Submit Bid
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BidPlacementForm;

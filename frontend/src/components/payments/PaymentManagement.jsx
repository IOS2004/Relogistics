import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
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
  TextField,
  Divider,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Payment,
  CheckCircle,
  Schedule,
  Cancel,
  Receipt,
  Download,
  Visibility,
} from "@mui/icons-material";

const PaymentDetailsDialog = ({ open, onClose, payment }) => {
  if (!payment) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Payment Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Payment ID
            </Typography>
            <Typography variant="body2">{payment.id}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={payment.status}
              color={
                payment.status === "completed"
                  ? "success"
                  : payment.status === "pending"
                  ? "warning"
                  : "error"
              }
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Load Title
            </Typography>
            <Typography variant="body2">{payment.loadTitle}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Amount
            </Typography>
            <Typography variant="h6" color="primary">
              ₹{payment.amount?.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              From
            </Typography>
            <Typography variant="body2">{payment.from}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              To
            </Typography>
            <Typography variant="body2">{payment.to}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Payment Date
            </Typography>
            <Typography variant="body2">
              {new Date(payment.date).toLocaleDateString()}
            </Typography>
          </Grid>
          {payment.transactionId && (
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Transaction ID
              </Typography>
              <Typography variant="body2">{payment.transactionId}</Typography>
            </Grid>
          )}
          {payment.paymentMethod && (
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Payment Method
              </Typography>
              <Typography variant="body2">{payment.paymentMethod}</Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" startIcon={<Download />}>
          Download Invoice
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const InitiatePaymentDialog = ({ open, onClose, onSubmit, load }) => {
  const [formData, setFormData] = useState({
    amount: load?.amount || "",
    paymentMethod: "bank_transfer",
    transactionId: "",
    notes: "",
  });

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      loadId: load?.id,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Initiate Payment</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            Please complete the payment and provide transaction details
          </Alert>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount (₹)"
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Payment Method"
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
                SelectProps={{
                  native: true,
                }}
              >
                <option value="bank_transfer">Bank Transfer</option>
                <option value="upi">UPI</option>
                <option value="cheque">Cheque</option>
                <option value="cash">Cash</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Transaction ID / Reference Number"
                value={formData.transactionId}
                onChange={(e) =>
                  setFormData({ ...formData, transactionId: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes (Optional)"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const PaymentManagement = ({ payments = [], userRole }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setDetailsOpen(true);
  };

  const handleInitiatePayment = (load) => {
    setSelectedLoad(load);
    setPaymentDialogOpen(true);
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log("Payment submitted:", paymentData);
    // TODO: API call to process payment
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle color="success" />;
      case "pending":
        return <Schedule color="warning" />;
      case "failed":
        return <Cancel color="error" />;
      default:
        return <Payment />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  // Calculate summary statistics
  const totalPayments = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const completedPayments = payments.filter((p) => p.status === "completed");
  const pendingPayments = payments.filter((p) => p.status === "pending");
  const totalCompleted = completedPayments.reduce(
    (sum, p) => sum + (p.amount || 0),
    0
  );
  const totalPending = pendingPayments.reduce(
    (sum, p) => sum + (p.amount || 0),
    0
  );

  return (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Payment sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Total</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                ₹{totalPayments.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {payments.length} transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CheckCircle sx={{ mr: 1, color: "success.main" }} />
                <Typography variant="h6">Completed</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                ₹{totalCompleted.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {completedPayments.length} transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Schedule sx={{ mr: 1, color: "warning.main" }} />
                <Typography variant="h6">Pending</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                ₹{totalPending.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {pendingPayments.length} transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Receipt sx={{ mr: 1, color: "info.main" }} />
                <Typography variant="h6">This Month</Typography>
              </Box>
              <Typography variant="h4" color="info.main">
                ₹{totalCompleted.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Current month earnings
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payments Table */}
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
            <Typography variant="h6">Payment History</Typography>
            {userRole === "broker" && (
              <Button
                variant="contained"
                startIcon={<Payment />}
                onClick={() => handleInitiatePayment({})}
              >
                Initiate Payment
              </Button>
            )}
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Load</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <TableRow key={payment.id} hover>
                      <TableCell>
                        {new Date(payment.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{payment.loadTitle}</TableCell>
                      <TableCell>{payment.from}</TableCell>
                      <TableCell>{payment.to}</TableCell>
                      <TableCell align="right">
                        <Typography fontWeight="bold">
                          ₹{payment.amount?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(payment.status)}
                          label={payment.status}
                          color={getStatusColor(payment.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(payment)}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Invoice">
                          <IconButton size="small">
                            <Download />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Box sx={{ py: 4 }}>
                        <Payment
                          sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                        />
                        <Typography variant="body1" color="text.secondary">
                          No payments found
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <PaymentDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        payment={selectedPayment}
      />
      <InitiatePaymentDialog
        open={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
        onSubmit={handlePaymentSubmit}
        load={selectedLoad}
      />
    </Box>
  );
};

export default PaymentManagement;

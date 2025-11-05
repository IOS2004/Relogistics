import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async () => {
    // TODO: Replace with actual API call
    const response = await fetch("/api/payments");
    return response.json();
  }
);

export const initiatePayment = createAsyncThunk(
  "payments/initiatePayment",
  async (paymentData) => {
    // TODO: Replace with actual API call
    const response = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });
    return response.json();
  }
);

export const updatePaymentStatus = createAsyncThunk(
  "payments/updateStatus",
  async ({ id, status }) => {
    // TODO: Replace with actual API call
    const response = await fetch(`/api/payments/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return response.json();
  }
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    items: [],
    selectedPayment: null,
    loading: false,
    error: null,
    statistics: {
      total: 0,
      completed: 0,
      pending: 0,
      failed: 0,
    },
  },
  reducers: {
    setSelectedPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },
    clearSelectedPayment: (state) => {
      state.selectedPayment = null;
    },
    calculateStatistics: (state) => {
      state.statistics = {
        total: state.items.reduce((sum, p) => sum + p.amount, 0),
        completed: state.items.filter((p) => p.status === "completed").length,
        pending: state.items.filter((p) => p.status === "pending").length,
        failed: state.items.filter((p) => p.status === "failed").length,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch payments
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Initiate payment
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update payment status
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (payment) => payment.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { setSelectedPayment, clearSelectedPayment, calculateStatistics } =
  paymentsSlice.actions;
export default paymentsSlice.reducer;

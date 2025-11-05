import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const fetchBids = createAsyncThunk("bids/fetchBids", async () => {
  // TODO: Replace with actual API call
  const response = await fetch("/api/bids");
  return response.json();
});

export const createBid = createAsyncThunk("bids/createBid", async (bidData) => {
  // TODO: Replace with actual API call
  const response = await fetch("/api/bids", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bidData),
  });
  return response.json();
});

export const acceptBid = createAsyncThunk("bids/acceptBid", async (bidId) => {
  // TODO: Replace with actual API call
  const response = await fetch(`/api/bids/${bidId}/accept`, {
    method: "POST",
  });
  return response.json();
});

export const rejectBid = createAsyncThunk("bids/rejectBid", async (bidId) => {
  // TODO: Replace with actual API call
  const response = await fetch(`/api/bids/${bidId}/reject`, {
    method: "POST",
  });
  return response.json();
});

const bidsSlice = createSlice({
  name: "bids",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBids: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch bids
      .addCase(fetchBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBids.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create bid
      .addCase(createBid.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Accept bid
      .addCase(acceptBid.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (bid) => bid.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Reject bid
      .addCase(rejectBid.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (bid) => bid.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { clearBids } = bidsSlice.actions;
export default bidsSlice.reducer;

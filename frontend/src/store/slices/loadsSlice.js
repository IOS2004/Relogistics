import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks for API calls
export const fetchLoads = createAsyncThunk(
  "loads/fetchLoads",
  async (filters) => {
    // TODO: Replace with actual API call
    const response = await fetch("/api/loads?" + new URLSearchParams(filters));
    return response.json();
  }
);

export const createLoad = createAsyncThunk(
  "loads/createLoad",
  async (loadData) => {
    // TODO: Replace with actual API call
    const response = await fetch("/api/loads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loadData),
    });
    return response.json();
  }
);

export const updateLoad = createAsyncThunk(
  "loads/updateLoad",
  async ({ id, data }) => {
    // TODO: Replace with actual API call
    const response = await fetch(`/api/loads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

export const deleteLoad = createAsyncThunk("loads/deleteLoad", async (id) => {
  // TODO: Replace with actual API call
  await fetch(`/api/loads/${id}`, { method: "DELETE" });
  return id;
});

const loadsSlice = createSlice({
  name: "loads",
  initialState: {
    items: [],
    selectedLoad: null,
    loading: false,
    error: null,
    filters: {
      status: "all",
      type: "all",
      vehicleType: "all",
    },
  },
  reducers: {
    setSelectedLoad: (state, action) => {
      state.selectedLoad = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: "all",
        type: "all",
        vehicleType: "all",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch loads
      .addCase(fetchLoads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoads.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLoads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create load
      .addCase(createLoad.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update load
      .addCase(updateLoad.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (load) => load.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete load
      .addCase(deleteLoad.fulfilled, (state, action) => {
        state.items = state.items.filter((load) => load.id !== action.payload);
      });
  },
});

export const { setSelectedLoad, setFilters, clearFilters } = loadsSlice.actions;
export default loadsSlice.reducer;

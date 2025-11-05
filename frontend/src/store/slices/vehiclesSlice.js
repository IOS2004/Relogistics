import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const fetchVehicles = createAsyncThunk(
  "vehicles/fetchVehicles",
  async () => {
    // TODO: Replace with actual API call
    const response = await fetch("/api/vehicles");
    return response.json();
  }
);

export const createVehicle = createAsyncThunk(
  "vehicles/createVehicle",
  async (vehicleData) => {
    // TODO: Replace with actual API call
    const response = await fetch("/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicleData),
    });
    return response.json();
  }
);

export const updateVehicle = createAsyncThunk(
  "vehicles/updateVehicle",
  async ({ id, data }) => {
    // TODO: Replace with actual API call
    const response = await fetch(`/api/vehicles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

export const deleteVehicle = createAsyncThunk(
  "vehicles/deleteVehicle",
  async (id) => {
    // TODO: Replace with actual API call
    await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    return id;
  }
);

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: {
    items: [],
    selectedVehicle: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },
    clearSelectedVehicle: (state) => {
      state.selectedVehicle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch vehicles
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create vehicle
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update vehicle
      .addCase(updateVehicle.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (vehicle) => vehicle.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete vehicle
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (vehicle) => vehicle.id !== action.payload
        );
      });
  },
});

export const { setSelectedVehicle, clearSelectedVehicle } =
  vehiclesSlice.actions;
export default vehiclesSlice.reducer;

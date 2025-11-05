import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    // TODO: Replace with actual API call
    const response = await fetch("/api/notifications");
    return response.json();
  }
);

export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId) => {
    // TODO: Replace with actual API call
    const response = await fetch(`/api/notifications/${notificationId}/read`, {
      method: "PUT",
    });
    return response.json();
  }
);

export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async () => {
    // TODO: Replace with actual API call
    const response = await fetch("/api/notifications/read-all", {
      method: "PUT",
    });
    return response.json();
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (notificationId) => {
    // TODO: Replace with actual API call
    await fetch(`/api/notifications/${notificationId}`, {
      method: "DELETE",
    });
    return notificationId;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    addNotification: (state, action) => {
      state.items.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    clearNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const index = state.items.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) {
          state.items[index].read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      // Mark all as read
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.items = state.items.map((n) => ({ ...n, read: true }));
        state.unreadCount = 0;
      })
      // Delete notification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const notification = state.items.find((n) => n.id === action.payload);
        if (notification && !notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.items = state.items.filter((n) => n.id !== action.payload);
      });
  },
});

export const { addNotification, clearNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;

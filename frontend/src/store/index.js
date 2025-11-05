import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import loadsReducer from "./slices/loadsSlice";
import bidsReducer from "./slices/bidsSlice";
import vehiclesReducer from "./slices/vehiclesSlice";
import paymentsReducer from "./slices/paymentsSlice";
import notificationsReducer from "./slices/notificationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loads: loadsReducer,
    bids: bidsReducer,
    vehicles: vehiclesReducer,
    payments: paymentsReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export default store;

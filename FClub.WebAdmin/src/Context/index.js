import { configureStore } from "@reduxjs/toolkit";

// slicer
import authSlice from "./Slicer/AuthSlicer";
import ErrorSlicer from "./Slicer/ErrorSlicer";
// ====================================================

const store = configureStore({
  reducer: { auth: authSlice.reducer, error: ErrorSlicer.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

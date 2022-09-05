import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEmailError: false,
  emailErrorMessage: "",
  isPasswordError: false,
  passwordErrorMessage: "",
};

const ErrorSlicer = createSlice({
  name: "Error",
  initialState,
  reducers: {
    emailErrorHandler(state, action) {
      state.isEmailError = true;
      state.emailErrorMessage = action.payload;
    },
    passwordErrorHandler(state, action) {
      state.isPasswordError = true;
      state.passwordErrorMessage = action.payload;
    },
    turnOffError(state) {
      state.isEmailError = false;
      state.emailErrorMessage = "";
      state.isPasswordError = false;
      state.passwordErrorMessage = "";
    },
  },
});

export const errorActions = ErrorSlicer.actions;
export default ErrorSlicer;

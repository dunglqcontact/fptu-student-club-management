import { createSlice } from "@reduxjs/toolkit";

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  return storedToken;
};

const retrieveStoredUserId = () => {
  const storedUserId = localStorage.getItem("userId");
  return storedUserId;
};

const retrieveStoredUserData = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  return storedUserData;
};

const retrieveAdminValidation = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  return isAdmin;
};

const removeToken = () => {
  localStorage.clear();
};

const initialAuthState = {
  token: retrieveStoredToken(),
  firebaseToken: "",
  userId: retrieveStoredUserId(),
  userData: retrieveStoredUserData(),
  clubId: "",
  isAdmin: retrieveAdminValidation(),
  isLoggedIn: !!retrieveStoredToken(),
  isRegistered: true,
  isLoading: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    signInHandler(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userData.id;
      state.userData = action.payload.userData;
      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("userData", JSON.stringify(state.userData));
      state.isLoggedIn = true;
      state.isRegistered = true;
    },
    registerHandler(state, action) {
      state.isRegistered = false;
      state.firebaseToken = action.payload.firebaseToken;
    },
    signOutHandler(state) {
      state.token = "";
      state.isLoggedIn = false;
      state.userId = 0;
      state.userData = {};
      removeToken();
    },
    isAdminHandler(state, action) {
      state.isAdmin = action.payload.isAdmin;
      localStorage.setItem("isAdmin", state.isAdmin);
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    clubIdHandler(state, action) {
      state.clubId = action.payload.clubId;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;

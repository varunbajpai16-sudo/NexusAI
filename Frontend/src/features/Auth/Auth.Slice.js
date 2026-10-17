
import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return null;
  }
};

const initialUser = getUserFromStorage();

const initialState = {
  user: initialUser,
  isAuthenticated: !!initialUser,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    authStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    authFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateUser: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };

        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;

      localStorage.removeItem("user");
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  authStart,
  loginSuccess,
  authFailure,
  updateUser,
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;

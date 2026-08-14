// src/redux/toggleSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: { 
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },

    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = toggleSlice.actions;

export default toggleSlice.reducer;
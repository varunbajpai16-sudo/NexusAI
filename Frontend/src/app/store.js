import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "../features/Toggle/Toggle_slice"
export const store = configureStore({
    reducer:{
     toggle: toggleReducer,
    }
});
// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import presetsReducer from "./Apis/Persets/presetSlice";
import login from './Apis/Auth/Login/LoginSlice';
const store = configureStore({
  reducer: {
    presets: presetsReducer,
    login: login,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

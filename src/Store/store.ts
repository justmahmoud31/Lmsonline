// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import presetsReducer from "./Apis/Persets/presetSlice";
import login from './Apis/Auth/Login/LoginSlice';
import profileData from './Apis/Profile/GetProfile/getProfileSlice';
const store = configureStore({
  reducer: {
    presets: presetsReducer,
    login: login,
    profile: profileData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import presetsReducer from "./Apis/Persets/presetSlice";
const store = configureStore({
  reducer: {
    presets: presetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

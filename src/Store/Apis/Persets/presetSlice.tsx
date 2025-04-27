// src/store/presets/presetsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { getPresets } from "./getPersets";
import { PresetsState } from "../../../Types/preset";
const initialState: PresetsState = {
  presets: [],
  count: 0,
  loading: false,
  error: null,
};

const presetsSlice = createSlice({
  name: "presets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPresets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPresets.fulfilled, (state, action) => {
        state.loading = false;
        state.presets = action.payload.data;
        state.count = action.payload.count;
      })
      .addCase(getPresets.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : action.payload?.message || "حدث خطأ ما";
      });
  },
});

export default presetsSlice.reducer;

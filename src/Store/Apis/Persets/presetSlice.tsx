// src/store/presets/presetsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { getPresets } from "./getPersets";
import { PresetsState } from "../../../Types/preset";

const initialState: PresetsState = {
  grades: [],
  stages: [],
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
        const entity = action.meta.arg.entity;
        if (entity === "GRADE") {
          state.grades = action.payload.data;
        } else if (entity === "STAGE") {
          state.stages = action.payload.data;
        }
      })
      .addCase(getPresets.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : action.payload?.message || "حدث خطأ ما";
      });
  },
});

export default presetsSlice.reducer;

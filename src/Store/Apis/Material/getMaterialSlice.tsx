import { createSlice } from "@reduxjs/toolkit";
import { getMaterials } from "./getMaterialApi";
import { MaterialState } from "../../../Types/material";
const initialState: MaterialState = {
  materials: [],
  loading: false,
  error: null,
};
const materialSlice = createSlice({
  name: "material",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload.data;
      })
      .addCase(getMaterials.rejected,(state,action)=>{
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : action.payload || "حدث خطأ ما";
      })
  },
});
export default materialSlice.reducer;

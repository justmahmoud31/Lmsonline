import { createSlice } from "@reduxjs/toolkit";
import { getUserResult } from "./getUserResult";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    result: {},
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserResult.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(getUserResult.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "حدث خطأ ما";
      });
  },
});
export default profileSlice.reducer;

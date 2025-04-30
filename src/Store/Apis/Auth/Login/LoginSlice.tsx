// store/slices/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "./LoginApi";
import { LoginResponse } from "../../../../Types/user";

interface AuthState {
  token: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  role: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
    loadAuthFromStorage: (state) => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (token && role) {
        state.token = token;
        state.role = role;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse["data"]>) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.role = action.payload.role;

        // Save to localStorage (or cookies if preferred)
        localStorage.setItem("token", action.payload.access_token);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout, loadAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;

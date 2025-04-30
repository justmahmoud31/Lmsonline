// store/slices/auth/thunks/loginUser.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginDto, LoginResponse } from "../../../../Types/user"; // adjust path as needed

export const loginUser = createAsyncThunk<
  LoginResponse["data"], // returned data type
  LoginDto, // argument type
  { rejectValue: string } // error type
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${import.meta.env.VITE_BASEURL}/api/auth/login`,
      credentials
    );

    // Optionally store the token in cookies/localStorage here if needed
    localStorage.setItem("token", response.data.data.access_token);

    return response.data.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    return rejectWithValue(message);
  }
});

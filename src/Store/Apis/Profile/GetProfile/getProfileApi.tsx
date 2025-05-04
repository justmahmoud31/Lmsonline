import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserData } from "../../../../Types/user";
import { ApiError } from "../../../../Types/global";
import axios from "axios";

export const getMyData = createAsyncThunk<getUserData, void, { rejectValue: ApiError | string }>(
  "/getMyData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<getUserData>(
        `${import.meta.env.VITE_BASEURL}/api/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue("حدث خطأ ما");
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ApiError } from "../../../Types/global";
import { GetPresetsResponse } from "../../../Types/preset";

export const getPresets = createAsyncThunk<GetPresetsResponse, { entity: string }, { rejectValue: ApiError | string }>(
  "presets/getPresets",
  async ({ entity }, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetPresetsResponse>(
        `${import.meta.env.VITE_BASEURL}/api/presets?entity=${entity}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("حدث خطأ ما");
    }
  }
);

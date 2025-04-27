// src/store/presets/presetsThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ApiError } from "../../../Types/global";
import { GetPresetsResponse } from "../../../Types/preset";

export const getPresets = createAsyncThunk<GetPresetsResponse, void, { rejectValue: ApiError | string }>(
  "presets/getPresets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetPresetsResponse>(
        `${import.meta.env.VITE_BASE_URL}/api/presets`
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

// lessonsSlice.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LessonsResponse } from "../../../Types/lesson";
export const fetchLessons = createAsyncThunk<
  LessonsResponse, 
  { id: number; public: boolean }, 
  { rejectValue: string }
>(
  "lessons/fetchLessons",
  async ({ id, public: isPublic }, { rejectWithValue }) => {
    try {
      const response = await axios.get<LessonsResponse>(
        `${import.meta.env.VITE_BASEURL}/api/lessons?id=${id}&public=${isPublic}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch lessons");
    }
  }
);

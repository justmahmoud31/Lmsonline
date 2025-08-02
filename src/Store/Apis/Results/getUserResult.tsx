import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { result } from "../../../Types/result";
import { ApiError } from "../../../Types/global";

export const getUserResult = createAsyncThunk<result, { examId: number }, { rejectValue: ApiError | string }>(
  "/getUserResult",
  async ({ examId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<result>(
        `${import.meta.env.VITE_BASEURL}/api/results/all-student/exams/${examId}`,
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

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTeacher } from "../../../Types/teacher";
import axios from "axios";
import { ApiError } from "../../../Types/global";

export const getAllTeachers = createAsyncThunk<
  getTeacher,
  void,
  { rejectValue: ApiError | string }
>("/getteacher", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/api/teachers`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "حدث خطأ!");
  }
});

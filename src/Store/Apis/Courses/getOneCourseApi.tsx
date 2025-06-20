import { createAsyncThunk } from "@reduxjs/toolkit";
import { OneCourse } from "../../../Types/course";
import axios from "axios";

export const getOneCourse = createAsyncThunk<
  OneCourse,
  { courseId: string },
  { rejectValue: string }
>("/getonecourse", async ({ courseId }, { rejectWithValue }) => {
  try {
    const response = await axios.get<OneCourse>(
      `${import.meta.env.VITE_BASEURL}/api/courses/${courseId}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "حدث خطأ");
  }
});

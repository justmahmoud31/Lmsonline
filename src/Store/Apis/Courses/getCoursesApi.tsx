import { createAsyncThunk } from "@reduxjs/toolkit";
import { CourseQueryParams, getCourse } from "../../../Types/course";
import axios from "axios";

export const getAllCourses = createAsyncThunk<
  getCourse,
  CourseQueryParams,
  { rejectValue: string }
>("/getcourses", async (params, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
       const query = new URLSearchParams();
    if (params.stageId) query.append("stageId", params.stageId.toString());
    if (params.gradeId) query.append("gradeId", params.gradeId.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/api/courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "حدث خطأ");
  }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTeacher, TeacherQuery } from "../../../Types/teacher";
import axios from "axios";
import { ApiError } from "../../../Types/global";

export const getAllTeachers = createAsyncThunk<
  getTeacher,
  TeacherQuery,
  { rejectValue: ApiError | string }
>("/getteacher", async (params, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    // if (params.stageId) query.append("stageId", params.stageId.toString());
    if (params.gradeId) query.append("gradeId", params.gradeId.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/api/teachers?${query.toString()}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "حدث خطأ!");
  }
});

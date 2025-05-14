import { createSlice } from "@reduxjs/toolkit";
import { getAllTeachers } from "./getTeachersApi";
import { TeacherState } from "../../../Types/teacher";
const initialState: TeacherState = {
  teachers: [],
  teachersLoading: false,
  teachersError: null,
};
const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeachers.pending, (state) => {
        state.teachersLoading = true;
        state.teachersError = null;
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        state.teachersLoading = false;
        state.teachers = action.payload.data;
      });
  },
});
export default teacherSlice.reducer;

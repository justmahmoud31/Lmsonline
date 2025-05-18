import { createSlice } from "@reduxjs/toolkit";
import { CourseState } from "../../../Types/course";
import { getAllCourses } from "./getCoursesApi";
const initialState: CourseState = {
  courseError: null,
  courses: [],
  courseLoadig: false,
};
const CourseSlice = createSlice({
  name: "courses",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.courseError = null;
        state.courseLoadig = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.courseLoadig = false;
        state.courses = action.payload.data;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.courseLoadig = false;
        state.courseError = action.payload || "حدث خطأ!";
      });
  },
});
export default CourseSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { CourseState } from "../../../Types/course";
import { getAllCourses } from "./getCoursesApi";
import { getOneCourse } from "./getOneCourseApi";
const initialState: CourseState = {
  courseError: null,
  courses: [],
  oneCourse: {},
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
      })
      .addCase(getOneCourse.pending, (state) => {
        state.courseLoadig = true;
        state.courseError = null;
      })
      .addCase(getOneCourse.fulfilled, (state, action) => {
        state.courseLoadig = false;
        state.oneCourse = action.payload;
      })
      .addCase(getOneCourse.rejected, (state, action) => {
        state.courseLoadig = false;
        state.courseError = action.payload || "حدث خطأ!";
      });
  },
});
export default CourseSlice.reducer;

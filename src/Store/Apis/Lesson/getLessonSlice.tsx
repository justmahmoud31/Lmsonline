import { createSlice } from "@reduxjs/toolkit";
import { Lesson } from "../../../Types/lesson";
import { fetchLessons } from "./getLessonApi";

interface LessonsState {
  loading: boolean;
  error: string | null;
  lessons: Lesson[];
  totalDocs: number;
  count: number;
}

const initialState: LessonsState = {
  loading: false,
  error: null,
  lessons: [],
  totalDocs: 0,
  count: 0,
};
const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload.data;
        state.totalDocs = action.payload.totalDocs;
        state.count = action.payload.count;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error occurred";
      });
  },
});

export default lessonsSlice.reducer;

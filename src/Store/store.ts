// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import presetsReducer from "./Apis/Persets/presetSlice";
import login from './Apis/Auth/Login/LoginSlice';
import profileData from './Apis/Profile/GetProfile/getProfileSlice';
import material from './Apis/Material/getMaterialSlice';
import teacher from './Apis/Teachers/getTeacherSlice';
import course from './Apis/Courses/getCoursesSlice';
import lessons from './Apis/Lesson/getLessonSlice';
import orders from './Apis/Courses/getcourseOrdersSlice';
const store = configureStore({
  reducer: {
    presets: presetsReducer,
    login: login,
    profile: profileData,
    material: material,
    teacher: teacher,
    course: course,
    lessons: lessons,
    orders: orders
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import presetsReducer from "./Apis/Persets/presetSlice";
import login, { logout, setAuthFromStorage } from './Apis/Auth/Login/LoginSlice';
import profileData from './Apis/Profile/GetProfile/getProfileSlice';
import material from './Apis/Material/getMaterialSlice';
import teacher from './Apis/Teachers/getTeacherSlice';
import course from './Apis/Courses/getCoursesSlice';
import lessons from './Apis/Lesson/getLessonSlice';
import orders from './Apis/Courses/getcourseOrdersSlice';
import results from './Apis/Results/getuserResultSlice';
const store = configureStore({
  reducer: {
    presets: presetsReducer,
    login: login,
    profile: profileData,
    material: material,
    teacher: teacher,
    course: course,
    lessons: lessons,
    orders: orders,
    results: results,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
(function initializeAuth() {
    const token = localStorage.getItem("token");
    const expiry = Number(localStorage.getItem("tokenExpiry") || "0");
    const now = Date.now();

    if (token && expiry > now) {
        store.dispatch(setAuthFromStorage({ token }));
        setTimeout(() => {
            store.dispatch(logout());
        }, expiry - now);
    } else if (token) {
        store.dispatch(logout());
    }
})();
export default store;

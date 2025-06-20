import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Modules/Home/Home";
import Navbar from "./Components/Shared/Navbar";
import Login from "./Modules/Auth/Login";
import { Toaster } from "react-hot-toast";
import Signup from "./Modules/Auth/Signup";
import Footer from "./Components/Shared/Footer";
import Profile from "./Modules/Profile/Profile";
import Subjects from "./Modules/Subjects/Subjects";
import { TeachersPage } from "./Modules/Teachers/TeachersPage";
import Courses from "./Modules/Courses/Courses";
import OneCourse from "./Modules/Courses/OneCourse";
import WatchLesson from "./Modules/Lesson/WatchLesson";
import UserCourses from "./Modules/Profile/UserCourses";
import PrivateRoute from "./Components/Shared/ProtectedRoutes";
import NotFound from "./Modules/NotFound/NotFound";
import Checkout from "./Modules/Checkout/checkout";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<OneCourse />} />
        <Route path="/course/lesson/:id" element={<WatchLesson />} />
        <Route
          path="/userprofile/courses"
          element={
            <PrivateRoute>
              <UserCourses />
            </PrivateRoute>
          }
        />
        <Route
          path="/userprofile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
         <Route
          path="/checkout/:id"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

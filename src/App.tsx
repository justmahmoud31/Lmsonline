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

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/userprofile" element={<Profile />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/teachers" element={<TeachersPage/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

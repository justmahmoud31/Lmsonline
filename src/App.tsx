import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Modules/Home/Home";
import Navbar from "./Components/Shared/Navbar";
import Login from "./Modules/Auth/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

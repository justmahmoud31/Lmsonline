import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Modules/Home/Home";
import Navbar from "./Components/Shared/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

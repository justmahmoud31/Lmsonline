import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav
      className="bg-white font-main shadow px-4 sm:px-8 py-3 text-sm font-medium"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Right section */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <span className="text-main font-bold">100% أونلاين</span>
        </div>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-4 text-gray-700">
          <Link to={"/"} className="hover:text-main">
            الرئيسية
          </Link>
          <Link to={"/teachers"} className="hover:text-main">
            المدرسين
          </Link>
          <Link to={"/subjects"} className="hover:text-main">
            المواد
          </Link>
          <Link to={"/courses"} className="hover:text-main">
            كورساتي
          </Link>
        </div>

        {/* Left buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="flex items-center gap-1 text-white cursor-pointer  text-gray-800 px-3 py-2 rounded-full bg-main"
          >
            <FaLock className="text-sm" />
            تسجيل دخول
          </button>
          <button className="flex items-center gap-1 border border-gray-400 text-gray-700 px-3 py-2 cursor-pointer rounded-full hover:bg-gray-100">
            <FaUser className="text-sm" />
            إنشاء حساب
          </button>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 text-right">
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            الرئيسية
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            المحرسين
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            المواد
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            كورساتي
          </a>
          <hr className="my-2" />
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="flex items-center justify-center gap-1 w-full border border-gray-400 text-gray-800 px-3 py-2 rounded-full hover:bg-gray-100"
          >
            <FaLock className="text-sm" />
            تسجيل دخول
          </button>
          <button className="flex items-center justify-center gap-1 w-full bg-gray-400 text-white px-3 py-2 rounded-full hover:bg-blue-800">
            <FaUser className="text-sm" />
            إنشاء حساب
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

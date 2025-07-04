import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Divider } from "@mui/material";
import { IoIosLogOut } from "react-icons/io";
import { CiHome } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import Drawer from "@mui/material/Drawer";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const isAuthinticated = !!localStorage.getItem("token");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
    handleClose();
  };
  return (
    <nav
      className="bg-white font-main shadow px-4 sm:px-8 py-3 text-sm font-medium"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Right section */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <span className="text-main font-bold">100% أونلاين</span>
        </Link>

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
            الكورسات
          </Link>
        </div>
        {isAuthinticated ? (
          <>
            <div className="hidden md:flex justify-center items-center gap-1.5">
              <Avatar
                onClick={handleClick}
                className="cursor-pointer"
                sx={{ backgroundColor: "#161a4c" }}
              />
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to={"/userprofile"}
                    className="flex justify-start items-center gap-2"
                  >
                    <CiHome />
                    الملف الشخصي
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <div className="flex justify-start items-center gap-2">
                    <CiUser />
                    الرقم المدني للطالب :0554882
                  </div>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogut}>
                  <ListItemIcon>
                    <IoIosLogOut color="red" />
                  </ListItemIcon>
                  تسجيل الخروج
                </MenuItem>
              </Menu>
              <IoIosNotificationsOutline
                size={38}
                className="bg-main rounded-full p-1.5 text-white"
              />
            </div>
          </>
        ) : (
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
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="flex items-center gap-1 border border-gray-400 text-gray-700 px-3 py-2 cursor-pointer rounded-full hover:bg-gray-100"
            >
              <FaUser className="text-sm" />
              إنشاء حساب
            </button>
          </div>
        )}
        {/* Left buttons */}

        {/* Hamburger for mobile */}
        <div className="md:hidden  flex items-center justify-center">
          <div className="px-1 pt-1">
            <IoIosNotificationsOutline
              size={32}
              className="bg-main rounded-full p-1.5 text-white "
            />
          </div>
          <button onClick={toggleMenu} className="text-gray-700">
            {menuOpen ? (
              <HiX size={24} cursor="pointer" />
            ) : (
              <HiMenu cursor="pointer" size={24} />
            )}
          </button>
          
        </div>
      </div>

      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={toggleMenu}
        PaperProps={{
          sx: {
            width: "80%",
            maxWidth: 320,
            padding: "16px",
            backgroundColor: "white",
          },
        }}
      >
        <div className="space-y-3 text-right">
          {/* Close button inside drawer */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg text-main">القائمة</span>
            <button onClick={toggleMenu}>
              <HiX size={24} />
            </button>
          </div>

          <Link
            to="/"
            className="block px-2 py-2 hover:bg-gray-100 rounded"
            onClick={toggleMenu}
          >
            الرئيسية
          </Link>
          <Link
            to="/teachers"
            className="block px-2 py-2 hover:bg-gray-100 rounded"
            onClick={toggleMenu}
          >
            المدرسين
          </Link>
          <Link
            to="/subjects"
            className="block px-2 py-2 hover:bg-gray-100 rounded"
            onClick={toggleMenu}
          >
            المواد
          </Link>
          <Link
            to="/courses"
            className="block px-2 py-2 hover:bg-gray-100 rounded"
            onClick={toggleMenu}
          >
            الكورسات
          </Link>

          <hr className="my-2" />

          {isAuthinticated ? (
            <>
              <Link
                to="/userprofile"
                className="block px-2 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
                onClick={toggleMenu}
              >
                <CiHome />
                الملف الشخصي
              </Link>
              <div className="px-2 py-2 text-gray-600 flex items-center gap-2">
                <CiUser />
                الرقم المدني للطالب : 0554882
              </div>
              <button
                onClick={handleLogut}
                className="w-full text-red-600 px-2 py-2 hover:bg-gray-100 rounded flex gap-2 items-center"
              >
                <IoIosLogOut />
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  toggleMenu();
                }}
                className="w-full border border-gray-400 text-gray-800 px-3 py-2 rounded-full hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                <FaLock className="text-sm" />
                تسجيل دخول
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                  toggleMenu();
                }}
                className="w-full bg-main text-white px-3 py-2 rounded-full hover:bg-blue-800 flex items-center justify-center gap-2"
              >
                <FaUser className="text-sm" />
                إنشاء حساب
              </button>
            </>
          )}
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;

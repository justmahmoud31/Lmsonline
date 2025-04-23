import { Switch } from "@mui/material";
import React from "react";
import { FiLock, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import loginPic from "../../assets/bro.png";
import Footer from "../../Components/Shared/Footer";

const Login: React.FC = () => {
  return (
    <>
      <div
        className="font-main flex items-center justify-center bg-gray-50"
        dir="rtl"
      >
        <div className="flex flex-col md:flex-row w-full   overflow-hidden  bg-white">
          {/* Right Side - Illustration */}
          <div className="hidden md:flex items-center justify-center w-1/2 p-6">
            <img
              src={loginPic}
              alt="Login Illustration"
              className="max-w-full h-auto"
            />
          </div>

          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 " dir="rtl">
            <h1 className="text-2xl font-bold mb-2 text-gray-800  text-center">
              تسجيل الدخول
            </h1>
            <p className="text-sm text-gray-500 mb-6 text-center">
              ادخل على حسابك بإدخال رقم الهاتف و كلمة المرور المسجل بهم من قبل
            </p>

            {/* Phone Input */}
            <div className="mb-6 relative">
              <div className="border-b border-gray-400 focus-within:border-indigo-700 flex items-center">
                <input
                  type="text"
                  className="flex-1 py-2 bg-transparent outline-none text-right placeholder-gray-500"
                  placeholder="رقم الهاتف"
                  dir="rtl"
                />
                <FiPhone className="text-gray-500 mr-2" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6 relative">
              <div className="border-b border-gray-400 focus-within:border-indigo-700 flex items-center">
                <input
                  type="text"
                  className="flex-1 py-2 bg-transparent outline-none text-right placeholder-gray-500"
                  placeholder="كلمة المرور"
                  dir="rtl"
                />
                <FiLock className="text-gray-500" />
              </div>
            </div>

            {/* Switch for code login */}
            <div className="flex justify-between mb-6">
              <p>أو قم بتسجيل الدخول عن طريق الكود</p>
              <Switch />
            </div>

            {/* Login Button */}
            <div className="flex justify-center">
              <button className="w-1/4 py-2 bg-main text-white font-semibold rounded-3xl cursor-pointer shadow-md hover:shadow-lg transition duration-200">
                تسجيل الدخول
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-sm mt-6 text-right">
              هل نسيت كلمة السر؟{" "}
              <Link
                to="/forgot-password"
                className="text-main underline underline-gray-50 font-bold"
              >
                اضغط هنا
              </Link>
            </div>

            {/* Register */}
            <div className="text-sm mt-6 text-right">
              لا يوجد لديك حساب؟{" "}
              <Link
                to="/register"
                className="text-main underline underline-gray-50 font-bold"
              >
                أنشئ حسابك الآن!
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

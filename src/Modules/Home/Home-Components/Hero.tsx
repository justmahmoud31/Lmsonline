import React from "react";
import mainpic from "../../../assets/hero.png";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div
      className="flex flex-col-reverse md:flex-row gap-4 p-4 lg:px-16 font-main"
      dir="rtl"
    >
      {/* Text Content */}
      <div className="flex flex-col justify-center my-10 md:my-20 w-full md:w-1/2">
        <div className="text-start flex flex-col items-start">
          <h1 className="lg:text-3xl text-xl font-bold text-gray-800 mb-4 font-main">
            منصة 100% اونلاين
          </h1>
          <p className="lg:text-lg text-gray-600 mb-6 leading-relaxed max-w-md">
            منصة لشرح مناهج المرحلة الابتدائية والمتوسطة والثانوية، بما في ذلك
            مناهج الثانوية العامة.
          </p>
          <Link to={'/userprofile/courses'} className="bg-main text-white px-6 py-2 rounded-full w-fit hover:bg-opacity-80 transition">
            ابدأ الآن
          </Link>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-evenly items-center gap-6 lg:mt-24 mt-10 font-outfit font-extrabold text-center">
          <div className="flex flex-col">
            <h2 className="text-[#FE753F] text-xl lg:text-2xl">+2000</h2>
            <p className="text-gray-600 text-sm lg:text-base">مدرسين المنصة</p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-[#2489D3] text-xl lg:text-2xl">+5000</h2>
            <p className="text-gray-600 text-sm lg:text-base">طلاب المنصة</p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-[#F0C932] text-xl lg:text-2xl">+7000</h2>
            <p className="text-gray-600 text-sm lg:text-base">
              الكورسات المتاحة
            </p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center items-center w-full md:w-1/2">
        <img src={mainpic} alt="الواجهة الرئيسية" className="" />
      </div>
    </div>
  );
};

export default Hero;

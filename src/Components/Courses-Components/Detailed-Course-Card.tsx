import React from "react";
import { IoCalendarOutline } from "react-icons/io5";

interface DetailedCardCourseProps {
  courseName: string;
  courseDescription: string;
  courseImage: string;
  coursePrice: number;
  courseDuration: Date;
  courseInstructor: string;
}

const DetaildCourseCard: React.FC<DetailedCardCourseProps> = ({
  courseName,
  courseDescription,
  courseImage,
  coursePrice,
  courseDuration,
  courseInstructor,
}) => {
  return (
    <div className=" bg-white rounded-xl rounded-lg font-main flex flex-col">
      {/* Image with rounded top */}
      <div className="relative top-12 w-full h-64 rounded-lg ">
        <img
          src={courseImage}
          alt={courseName}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {/* Content */}
      <div className="p-4 z-400 space-y-2 bg-secondary flex flex-col justify-between h-60  w-19/20 rounded-lg mx-auto">
        {/* Price */}
        <div className="flex justify-between items-center w-full">
          <h3 className="text-md font-bold text-right">{courseName}</h3>
          <div className="flex"></div>
          <div className="bg-[#001E43] flex gap-2 text-white text-sm px-2 py-1 rounded-md w-fit ">
            <p className="bg-white text-main rounded-sm px-1">
              {" "}
              {coursePrice.toFixed(2)}{" "}
            </p>
            جنيهاً
          </div>
        </div>

        {/* Title & Instructor */}
        <h4 className="text-sm font-semibold text-gray-600 text-right">
          {courseInstructor}
        </h4>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed text-right line-clamp-3">
          {courseDescription}
        </p>

        {/* Duration */}
        <div className="flex items-center text-gray-500 text-sm gap-1 justify-end mt-1">
          <IoCalendarOutline size={16} />
          <span>{courseDuration.toLocaleDateString("ar-EG")}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
        <button className="bg-main text-white lg:px-4 px-2 py-2 cursor-pointer rounded-2xl text-sm font-semibold hover:bg-main/90">
            اشترك الآن
          </button>
          <button className="border border-main text-main cursor-pointer lg:px-4 px-2 py-2 rounded-2xl text-sm font-semibold hover:bg-main/10">
            الدخول للكورس
          </button> 
        </div>
      </div>
    </div>
  );
};

export default DetaildCourseCard;

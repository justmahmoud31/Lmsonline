import React from "react";
import courseImg from "../../assets/subject.png";
interface CourseCardProps {
  courseName: string;
  NoOfVidoes: number;
}
const CourseCard: React.FC<CourseCardProps> = ({ courseName, NoOfVidoes }) => {
  return (
    <div className="flex bg-secondary px-2 py-4 rounded-lg shadow-md w-full">
      <div className="flex">
        <img src={courseImg} />
      </div>
      <div className="flex flex-col justify-center items-start mr-4">
        <h3 className="text-lg font-bold">{courseName}</h3>
        <p className="text-gray-500 text-sm">({NoOfVidoes}) فيديو متاح</p>
      </div>
    </div>
  );
};
export default CourseCard;

import React from "react";
import courseImg from "../../assets/subject.png";
import { Link } from "react-router-dom";
interface CourseCardProps {
  courseName: string;
  NoOfVidoes: number;
  courseId: number;
}
const CourseCard: React.FC<CourseCardProps> = ({
  courseName,
  NoOfVidoes,
  courseId,
}) => {
  return (
    <div className="flex bg-secondary px-2 py-4 rounded-lg shadow-md w-full">
      <div className="flex">
        <img src={courseImg} />
      </div>
      <div className="flex flex-col justify-center items-start mr-4">
        <Link to={`/course/${courseId}`} className="text-lg font-bold">
          {courseName}
        </Link>
        <p className="text-gray-500 text-sm">({NoOfVidoes}) فيديو متاح</p>
      </div>
    </div>
  );
};
export default CourseCard;

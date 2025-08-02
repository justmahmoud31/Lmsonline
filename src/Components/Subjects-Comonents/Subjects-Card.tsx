import React from "react";
import subjectImg from "../../assets/subject.png";
import { Link } from "react-router-dom";
interface SubjectsCardProps {
  subjectName: string;
  subjectNoOfInstructors: number;
  id: number;
}
const SubjectsCard: React.FC<SubjectsCardProps> = ({
  subjectName,
  subjectNoOfInstructors,
  id,
}) => {
  return (
    <Link to={`/subject/courses/${id}`} className="flex bg-secondary px-2 py-4 rounded-lg shadow-md w-full">
      <div className="flex">
        <img src={subjectImg} />
      </div>
      <div className="flex flex-col justify-center items-start mr-4">
        <h3 className="text-lg font-bold">{subjectName}</h3>
        <p className="text-gray-500 text-sm">
          عدد المدرسين المتاحين: {subjectNoOfInstructors}
        </p>
      </div>
    </Link>
  );
};
export default SubjectsCard;

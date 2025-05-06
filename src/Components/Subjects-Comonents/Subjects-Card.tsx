import React from "react";
import subjectImg from "../../assets/subject.png";
interface SubjectsCardProps {
  subjectName: string;
  subjectNoOfInstructors: number;
}
const SubjectsCard: React.FC<SubjectsCardProps> = ({
  subjectName,
  subjectNoOfInstructors,
}) => {
  return (
    <div className="flex bg-secondary px-2 py-4 rounded-lg shadow-md w-full">
      <div className="flex">
        <img src={subjectImg} />
      </div>
      <div className="flex flex-col justify-center items-start mr-4">
        <h3 className="text-lg font-bold">{subjectName}</h3>
        <p className="text-gray-500 text-sm">
          عدد المدرسين المتاحين: {subjectNoOfInstructors}
        </p>
      </div>
    </div>
  );
};
export default SubjectsCard;

import React from "react";

interface TeacherCardProps {
  image: string;
  name: string;
  subject: string;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ image, name, subject }) => {
  return (
    <div className="flex justify-center items-center flex-col bg-secondary border border-gray-300 rounded-lg p-3  m-2">
      <img src={image} alt={name} className="h-70 w-full rounded-2xl mb-4 object-cover" />
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600"> أستاذ {subject}</p>
    </div>
  );
};

export default TeacherCard;

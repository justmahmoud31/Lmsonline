import React from "react";
import line from "../../../assets/Line 2.png";
import TeacherCard from "../../../Components/Teachers-Components/Teacher-Card";
import { Link } from "react-router-dom";
import PresetFilter from "../../../Components/Shared/PresetsFilter";

const Teachers: React.FC = () => {
  const teachers = [
    {
      image:
        "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "أ/ محمد حسين",
      subject: "رياضيات",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "أ/ علي سالم",
      subject: "فيزياء",
    },
    {
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "أ/ نسرين خليل",
      subject: "كيمياء",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1673957923985-b814a9dbc03d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "أ/ ندى فؤاد",
      subject: "لغة عربية",
    },
  ];

  return (
    <div className="flex flex-col font-main items-center">
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-2xl font-semibold">اختر المدرسين</h2>
        <img src={line} className="w-36 mt-2" alt="line" />
      </div>

      <div className="flex justify-center mt-8 px-4">
        <PresetFilter onChange={() => console.log("here")} />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4 w-full max-w-7xl">
        {teachers.map((teacher, idx) => (
          <TeacherCard
            key={idx}
            image={teacher.image}
            name={teacher.name}
            subject={teacher.subject}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
        <Link
          to={"/teachers"}
          className="bg-main py-2 text-white rounded-full px-6"
        >
          عرض المزيد
        </Link>
      </div>
    </div>
  );
};

export default Teachers;

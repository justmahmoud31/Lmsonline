import React, { useState } from "react";
import line from "../../../assets/Line 2.png";
import TeacherCard from "../../../Components/Teachers-Components/Teacher-Card";


const Teachers: React.FC = () => {
  const options = [
    {
      stage: "المرحلة الثانوية",
      grades: [
        "الصف الثالث الثانوي",
        "الصف الثاني الثانوي",
        "الصف الأول الثانوي",
      ],
      sections: ["علمي", "أدبي"],
    },
    {
      stage: "المرحلة الإعدادية",
      grades: [
        "الصف الثالث الإعدادي",
        "الصف الثاني الإعدادي",
        "الصف الأول الإعدادي",
      ],
    },
    {
      stage: "المرحلة الابتدائية",
      grades: [
        "الصف السادس الابتدائي",
        "الصف الخامس الابتدائي",
        "الصف الرابع الابتدائي",
        "الصف الثالث الابتدائي",
        "الصف الثاني الابتدائي",
        "الصف الأول الابتدائي",
      ],
    },
  ];

  const [selectedStage, setSelectedStage] = useState<string>(options[0].stage);
  const [selectedGrade, setSelectedGrade] = useState<string>(options[0].grades[0]);
  const [selectedSection, setSelectedSection] = useState<string>("علمي");

  const currentStageObj = options.find((o) => o.stage === selectedStage);

  const teachers = [
    {
      image: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "أ/ محمد حسين",
      subject: "رياضيات",
    },
    {
      image: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "أ/ علي سالم",
      subject: "فيزياء",
    },
    {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "أ/ نسرين خليل",
      subject: "كيمياء",
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1673957923985-b814a9dbc03d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "أ/ ندى فؤاد",
      subject: "لغة عربية",
    }
  ];

  return (
    <div className="flex flex-col font-main items-center">
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-2xl font-semibold">اختر المدرسين</h2>
        <img src={line} className="w-36 mt-2" alt="line" />
      </div>

      <div className="flex justify-center mt-8 px-4">
        <div className="flex  gap-2 bg-gray-200 p-3 rounded-lg shadow-sm ">
          {/* Stage Dropdown */}
          <select
            value={selectedStage}
            onChange={(e) => {
              const newStage = e.target.value;
              const stageObj = options.find((o) => o.stage === newStage);
              setSelectedStage(newStage);
              setSelectedGrade(stageObj?.grades[0] || "");
              setSelectedSection(stageObj?.sections?.[0] || "");
            }}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm hover:border-gray-500 transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {options.map((opt) => (
              <option key={opt.stage} value={opt.stage}>
                {opt.stage}
              </option>
            ))}
          </select>

          {/* Grade Dropdown */}
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm hover:border-gray-500 transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {currentStageObj?.grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>

          {/* Section Dropdown (only if available) */}
          {currentStageObj?.sections && (
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm hover:border-gray-500 transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {currentStageObj.sections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          )}
        </div>
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
    </div>
  );
};

export default Teachers;

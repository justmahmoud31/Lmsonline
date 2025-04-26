import React from "react";
import subject1 from "../../../assets/subjects1.png";
import subject2 from "../../../assets/subject2.png";
import subject3 from "../../../assets/subject3.png";
import line from "../../../assets/Line 2.png";
const subjectsData = [
  {
    grade: "الصف الأول الثانوي",
    subjects: ["اللغة العربية", "اللغة الإنجليزية", "اللغة الألمانية"],
    image: subject1,
  },
  {
    grade: "الصف الثاني الثانوي",
    subjects: ["اللغة العربية", "اللغة الإنجليزية", "اللغة الألمانية"],
    image: subject2,
  },
  {
    grade: "الصف الثالث الثانوي",
    subjects: ["اللغة العربية", "اللغة الإنجليزية", "اللغة الألمانية"],
    image: subject3,
  },
];

const Subjects: React.FC = () => {
  return (
    <div className="flex flex-col" dir="rtl">
      <div className="flex flex-col justify-center items-center my-10">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          مواد 100% اونلاين
        </h1>
        <img src={line} className="w-36 mt-2" alt="line" />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-8 font-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full ">
          {subjectsData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-lg"
            >
              <div className="flex gap-2">
                <div className="flex flex-col justify-between my-2  items-start mr-4">
                  <h2 className="mb-2">{item.grade}</h2>
                  <ul className="text-gray-700 bg-secondary  p-4 rounded-lg">
                    {item.subjects.map((subject, idx) => (
                      <li key={idx} className="text-right my-4">
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
                <img
                  src={item.image}
                  alt={item.grade}
                  className="h-80 object-cover mb-4 "
                />
              </div>
              <button className="bg-main text-white w-1/2 py-2 rounded-full  transition">
                المزيد
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;

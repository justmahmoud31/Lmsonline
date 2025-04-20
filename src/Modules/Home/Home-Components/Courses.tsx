import React from 'react';
import line from "../../../assets/Line 2.png";
import DetaildCourseCard from '../../../Components/Courses-Components/Detailed-Course-Card';


const Courses: React.FC = () => {
  // Sample data (you can replace with fetched data)
  const courses = [
    {
      courseName: "كورس الرياضيات",
      courseDescription: "محتوى الكورس محتوى الكورس محتوى الكورس محتوى الكورس",
      courseImage: "https://plus.unsplash.com/premium_photo-1672256330854-98c717493128?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      coursePrice: 120,
      courseDuration: new Date("2025-02-22"),
      courseInstructor: "المراجعة النهائية"
    },
    {
      courseName: "كورس الفيزياء",
      courseDescription: "محتوى الفيزياء محتوى الفيزياء محتوى الفيزياء محتوى الفيزياء",
      courseImage: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      coursePrice: 150,
      courseDuration: new Date("2025-03-01"),
      courseInstructor: "المهندس أحمد"
    },
    {
      courseName: "كورس الأحياء",
      courseDescription: "محتوى الأحياء محتوى الأحياء محتوى الأحياء محتوى الأحياء",
      courseImage: "https://plus.unsplash.com/premium_photo-1683121859548-b4514fa05e52?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      coursePrice: 100,
      courseDuration: new Date("2025-04-10"),
      courseInstructor: "د. سارة"
    }
  ];

  return (
    <div className="flex flex-col font-main items-center lg:px-8 px-4">
      <div className="flex flex-col justify-center items-center my-10">
        <h2 className="text-2xl font-semibold">كورستنا المقترحة</h2>
        <img src={line} className="w-36 mt-2" alt="line" />
      </div>
      <p className='px-8'>علشان نوفر وقتك، جمعنالك كورسات على ذوقك، وكأننا بنختارلك كنز تعليمي متفصل عليك! 🎓💡</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 lg:px-24 px-8 w-full">
        {courses.map((course, index) => (
          <DetaildCourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;

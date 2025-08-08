import React, { useEffect } from 'react';
import line from "../../../assets/Line 2.png";
import DetaildCourseCard from '../../../Components/Courses-Components/Detailed-Course-Card';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Store/store';
import { getAllCourses } from '../../../Store/Apis/Courses/getCoursesApi';
import Loading from '../../../Components/Shared/Loading/Loading';


const Courses: React.FC = () => {
  const { courseLoadig, courses, courseError } = useSelector(
    (state: RootState) => state.course
  );
  const dispatch = useDispatch<AppDispatch>();
  const query = {
    limit: 3
  }
  useEffect(() => {
    dispatch(getAllCourses(query))
  }, [dispatch])


  return (
    <div className="flex flex-col font-main items-center lg:px-16 px-8 px-4">
      <div className="flex flex-col justify-center items-center my-10">
        <h2 className="text-2xl font-semibold">كورستنا المقترحة</h2>
        <img src={line} className="w-36 mt-2" alt="line" />
      </div>
      <p className='px-8'>علشان نوفر وقتك، جمعنالك كورسات على ذوقك، وكأننا بنختارلك كنز تعليمي متفصل عليك! 🎓💡</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10  w-full">
        {courseLoadig ? <div className="flex">
          <Loading />
        </div> : courses.map((course, index) => (
          <DetaildCourseCard key={index} course={course} />
        ))}
      </div>
      {courseError && <p>{courseError || "Error"}</p>}
      <div className="flex justify-center items-center mt-8">
        <Link to={'/courses'} className='bg-main py-2 text-white rounded-full px-6'>عرض المزيد</Link>
      </div>
    </div>
  );
};

export default Courses;

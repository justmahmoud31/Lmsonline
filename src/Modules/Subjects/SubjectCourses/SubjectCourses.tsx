import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../Store/store";
import CourseCard from "../../../Components/Courses-Components/Course-Card";
import { getAllCourses } from "../../../Store/Apis/Courses/getCoursesApi";
import Loading from "../../../Components/Shared/Loading/Loading";

export const SubjectCourses: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { courseLoadig, courses, courseError } = useSelector(
    (state: RootState) => state.course
  );
  useEffect(()=>{
    dispatch(getAllCourses({materialId : Number(id)}));
  },[id, dispatch]);
  return (
    <div className="flex justify-center items-center flex-col my-12">
      <h1>كورسات المادة</h1>
      {courseLoadig && <div className="h-screen"><Loading /></div>}
      {courseError && <p>Error: {courseError}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4 w-full max-w-7xl">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            courseName={course.name}
            NoOfVidoes={course._count.Lesson}
            courseId={course.id}
          />
        ))}
      </div>
    </div>
  );
};

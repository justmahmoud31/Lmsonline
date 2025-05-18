import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../Components/Courses-Components/Course-Card";
import Loading from "../../Components/Shared/Loading/Loading";
import PresetFilter from "../../Components/Shared/PresetsFilter";
import { getAllCourses } from "../../Store/Apis/Courses/getCoursesApi";
import { AppDispatch, RootState } from "../../Store/store";
import { CourseQueryParams } from "../../Types/course";
import line from "../../assets/Line 2.png";
const Courses: React.FC = () => {
  const { courseLoadig, courses, courseError } = useSelector(
    (state: RootState) => state.course
  );
  const dispatch = useDispatch<AppDispatch>();
  const [filters, setFilters] = useState<{
    stageId: number | null;
    gradeId: number | null;
    section: string;
  }>({ stageId: null, gradeId: null, section: "" });
  const handleFilterChange = useCallback(
    (filters: {
      stageId: number | null;
      gradeId: number | null;
      section: string;
    }) => {
      const query: CourseQueryParams = {};
      if (filters.stageId) query.stageId = filters.stageId;
      if (filters.gradeId) query.gradeId = filters.gradeId;
      if (filters.section) query.section = filters.section;

      dispatch(getAllCourses(query));
    },
    [dispatch]
  );
  // Call API only when filters change
  useEffect(() => {
    const query: CourseQueryParams = {};
    if (filters.stageId) query.stageId = filters.stageId;
    if (filters.gradeId) query.gradeId = filters.gradeId;
    if (filters.section) query.section = filters.section;

    dispatch(getAllCourses(query));
  }, [filters, dispatch]);
  return (
    <div className="flex justify-center items-center flex-col my-12">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">الكورسات</h2>
        <img src={line} className="w-1/2" />
      </div>

      <PresetFilter onChange={handleFilterChange} />

      {courseLoadig ? (
        <div className="flex justify-center items-center my-12">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4 w-full max-w-7xl">
          {courses.map((material, idx) => (
            <CourseCard
              key={idx}
              courseName={material.name}
              NoOfVidoes={material._count.Lesson}
            />
          ))}
        </div>
      )}

      {courseError && (
        <div className="text-red-500 mt-4">
          <p>حدث خطأ أثناء تحميل المواد: {courseError}</p>
        </div>
      )}
    </div>
  );
};
export default Courses;

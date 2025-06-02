import React, { useCallback, useEffect, useState } from "react";
import line from "../../../assets/Line 2.png";
import TeacherCard from "../../../Components/Teachers-Components/Teacher-Card";
import { Link } from "react-router-dom";
import PresetFilter from "../../../Components/Shared/PresetsFilter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Store/store";
import { getAllTeachers } from "../../../Store/Apis/Teachers/getTeachersApi";
import teacherpic from "../../../assets/TeahcerPic.png";
import Loading from "../../../Components/Shared/Loading/Loading";
import { TeacherQuery } from "../../../Types/teacher";
const Teachers: React.FC = () => {
  const { teachers, teachersError, teachersLoading } = useSelector(
    (state: RootState) => state.teacher
  );
  const dispatch = useDispatch<AppDispatch>();
  const [filters] = useState<{
    stageId: number | null;
    gradeId: number | null;
    section: string;
  }>({ stageId: null, gradeId: null, section: "" });

  // Update filters from PresetFilter
  const handleFilterChange = useCallback(
    (filters: {
      stageId: number | null;
      gradeId: number | null;
      section: string;
    }) => {
      const query: TeacherQuery = {};
      query.limit = 4;
      if (filters.stageId) query.stageId = filters.stageId;
      if (filters.gradeId) query.gradeId = filters.gradeId;
      if (filters.section) query.section = filters.section;

      dispatch(getAllTeachers(query));
    },
    [dispatch]
  );
  useEffect(() => {
    const query: TeacherQuery = {};
    query.limit = 4;
    if (filters.stageId) query.stageId = filters.stageId;
    if (filters.gradeId) query.gradeId = filters.gradeId;
    if (filters.section) query.section = filters.section;

    dispatch(getAllTeachers(query));
  }, [dispatch]);

  return (
    <div className="flex flex-col font-main items-center">
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-2xl font-semibold">اختر المدرسين</h2>
        <img src={line} className="w-36 mt-2" alt="line" />
      </div>

      <div className="flex justify-center mt-8 px-4">
        <PresetFilter onChange={handleFilterChange} />
      </div>

      {/* Cards Grid */}
      {teachersLoading ? (
        <div className="flex justify-center items-center my-12">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4 w-full max-w-7xl">
          {teachers.map((teacher, idx) => (
            <TeacherCard
              key={idx}
              image={teacherpic}
              name={teacher.firstName + " " + teacher.lastName}
              subject="مادة"
            />
          ))}
        </div>
      )}
      {teachersError && <p>{teachersError}</p>}
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

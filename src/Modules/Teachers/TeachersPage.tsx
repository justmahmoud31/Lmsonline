import React, { useCallback, useEffect, useState } from "react";
import line from "../../assets/Line 2.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { getAllTeachers } from "../../Store/Apis/Teachers/getTeachersApi";
import Loading from "../../Components/Shared/Loading/Loading";
import TeacherCard from "../../Components/Teachers-Components/Teacher-Card";
import teacherpic from "../../assets/TeahcerPic.png";
import PresetFilter from "../../Components/Shared/PresetsFilter";
import { TeacherQuery } from "../../Types/teacher";
export const TeachersPage: React.FC = () => {
  const { teachers, teachersError, teachersLoading } = useSelector(
    (state: RootState) => state.teacher
  );
  const dispatch = useDispatch<AppDispatch>();

  const [filters, setFilters] = useState<{
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
      if (filters.stageId) query.stageId = filters.stageId;
      if (filters.gradeId) query.gradeId = filters.gradeId;
      if (filters.section) query.section = filters.section;

      dispatch(getAllTeachers(query));
    },
    [dispatch]
  );
  useEffect(() => {
    const query: TeacherQuery = {};
    if (filters.stageId) query.stageId = filters.stageId;
    if (filters.gradeId) query.gradeId = filters.gradeId;
    if (filters.section) query.section = filters.section;

    dispatch(getAllTeachers(query));
  }, [dispatch]);
  return (
    <>
      <div className="flex justify-center items-center flex-col my-12">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">المدرسين</h2>
          <img src={line} className="w-1/2" />
        </div>
        <div className="flex justify-center mt-8 px-4">
          <PresetFilter onChange={handleFilterChange} />
        </div>
        {teachersLoading ? (
          <div className="flex justify-center items-center my-8">
            <Loading />
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 my-8">
            {teachers.map((teacher) => {
              return (
                <TeacherCard
                  name={teacher.firstName + " " + teacher.lastName}
                  subject="مادة"
                  image={teacherpic}
                />
              );
            })}
          </div>
        )}
        {teachersError && <p>{teachersError}</p>}
      </div>
    </>
  );
};

import React, { useCallback, useEffect, useState } from "react";
import PresetFilter from "../../Components/Shared/PresetsFilter";
import line from "../../assets/Line 2.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { getMaterials } from "../../Store/Apis/Material/getMaterialApi";
import Loading from "../../Components/Shared/Loading/Loading";
import { MaterialQueryParams } from "../../Types/material";
import SubjectsCard from "../../Components/Subjects-Comonents/Subjects-Card";

const Subjects: React.FC = () => {
  const { materials, loading, error } = useSelector(
    (state: RootState) => state.material
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
      const query: MaterialQueryParams = {};
      if (filters.stageId) query.stageId = filters.stageId;
      if (filters.gradeId) query.gradeId = filters.gradeId;
      if (filters.section) query.section = filters.section;

      dispatch(getMaterials(query));
    },
    [dispatch]
  );
  // Call API only when filters change
  useEffect(() => {
    const query: MaterialQueryParams = {};
    if (filters.stageId) query.stageId = filters.stageId;
    if (filters.gradeId) query.gradeId = filters.gradeId;
    if (filters.section) query.section = filters.section;

    dispatch(getMaterials(query));
  }, [filters, dispatch]);

  return (
    <div className="flex justify-center items-center flex-col my-12">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">المواد</h2>
        <img src={line} className="w-1/2" />
      </div>

      <PresetFilter onChange={handleFilterChange} />

      {loading ? (
        <div className="flex justify-center items-center my-12">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4 w-full max-w-7xl">
          {materials.map((material, idx) => (
            <SubjectsCard
              key={idx}
              subjectName={material.name}
              subjectNoOfInstructors={material._count.TeacherMaterial}
              id={material.id}
            />
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-4">
          <p>حدث خطأ أثناء تحميل المواد: {error}</p>
        </div>
      )}
    </div>
  );
};

export default Subjects;

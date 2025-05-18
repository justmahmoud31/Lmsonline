import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { getPresets } from "../../Store/Apis/Persets/getPersets";
type PresetFilterProps = {
  onChange: (filters: {
    stageId: number | null;
    gradeId: number | null;
    section: string;
  }) => void;
};
const PresetFilter: React.FC<PresetFilterProps> = ({ onChange }) => {
  const { stages, grades } = useSelector((state: RootState) => state.presets);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPresets({ entity: "GRADE" }));
    dispatch(getPresets({ entity: "STAGE" }));
  }, [dispatch]);

  const stagesWithGrades = useMemo(() => {
    return stages.map((stage) => ({
      ...stage,
      grades: grades.filter((grade) => grade.stageId === stage.id),
    }));
  }, [stages, grades]);

  const [selectedStageId, setSelectedStageId] = useState<number | null>(null);
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>("علمي");

  const selectedStage = stagesWithGrades.find((s) => s.id === selectedStageId);
  const selectedGrade = selectedStage?.grades.find(
    (g) => g.id === selectedGradeId
  );

  // Initialize selection when data is loaded
  useEffect(() => {
    if (stagesWithGrades.length > 0 && selectedStageId === null) {
      const firstStage = stagesWithGrades[0];
      setSelectedStageId(firstStage.id);
      if (firstStage.grades.length > 0) {
        const firstGrade = firstStage.grades[0];
        setSelectedGradeId(firstGrade.id);
        const section = firstGrade.hasSection ? "علمي" : "";
        setSelectedSection(section);

        // ✅ Call onChange with correct values
        onChange({
          stageId: firstStage.id,
          gradeId: firstGrade.id,
          section,
        });
      }
    }
  }, [stagesWithGrades, selectedStageId, onChange]);
  useEffect(() => {
    if (selectedStageId !== null && selectedGradeId !== null) {
      onChange({
        stageId: selectedStageId,
        gradeId: selectedGradeId,
        section: selectedSection,
      });
    }
  }, [selectedStageId, selectedGradeId, selectedSection, onChange]);
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center mt-8 px-4">
        <div className="flex lg:flex-row flex-col gap-2 bg-gray-200 p-3 rounded-lg shadow-sm w-full">
          {/* Stage Dropdown */}
          <select
            value={selectedStageId ?? ""}
            onChange={(e) => {
              const newStageId = parseInt(e.target.value, 10);
              const stage = stagesWithGrades.find((s) => s.id === newStageId);
              setSelectedStageId(newStageId);
              if (stage?.grades.length) {
                setSelectedGradeId(stage.grades[0].id);
                setSelectedSection(stage.grades[0].hasSection ? "علمي" : "");
              } else {
                setSelectedGradeId(null);
                setSelectedSection("");
              }
            }}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm hover:border-gray-500 transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
    
            {stagesWithGrades.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.name}
              </option>
            ))}
          </select>

          {/* Grade Dropdown */}
          {selectedStage?.grades && (
            <select
              value={selectedGradeId ?? ""}
              onChange={(e) => {
                const gradeId = parseInt(e.target.value, 10);
                const grade = selectedStage?.grades.find(
                  (g) => g.id === gradeId
                );
                setSelectedGradeId(gradeId);
                setSelectedSection(grade?.hasSection ? "علمي" : "");
              }}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm hover:border-gray-500 transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {selectedStage?.grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
            </select>
          )}

          {/* Section Dropdown (only if grade has hasSection = true) */}
          {selectedGrade?.hasSection && (
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm hover:border-gray-500 transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {["علمي", "أدبي"].map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};
export default PresetFilter;

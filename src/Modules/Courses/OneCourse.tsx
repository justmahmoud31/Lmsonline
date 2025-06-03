import React, { useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from "@mui/material";
import { FiChevronDown } from "react-icons/fi";  
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../Store/store";
import { getOneCourse } from "../../Store/Apis/Courses/getOneCourseApi";
import { OneCourse as OneCourseType } from "../../Types/course";
import Loading from "../../Components/Shared/Loading/Loading";

const OneCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { oneCourse, courseLoadig, courseError } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    if (id) {
      dispatch(getOneCourse({ courseId: id }));
    }
  }, [dispatch, id]);

  const courseData = oneCourse as OneCourseType;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {courseLoadig && (
        <div className="flex justify-center items-center my-12">
          <Loading />
        </div>
      )}

      {courseError && (
        <p className="text-center text-red-500 font-semibold">
          حدث خطأ: {courseError}
        </p>
      )}

      {courseData?.data && (
        <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
          <h2 className="text-3xl font-bold text-center">
            {courseData.data.name}
          </h2>
          <p className="text-center text-gray-600">
            {courseData.data.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Info label="السنة الدراسية" value={courseData.data.year} />
            <Info label="الفصل الدراسي" value={courseData.data.term} />
            <Info label="السعر" value={`${courseData.data.price} د.ع`} />
            <Info
              label="الحالة"
              value={courseData.data._count.Part > 0 ? "نشط" : "غير نشط"}
            />
          </div>

          <Divider className="!my-6" />

          <h3 className="text-xl font-bold mt-6">أجزاء الكورس</h3>

          {courseData.data.Part && courseData.data.Part.length > 0 ? (
            <div>
              {courseData.data.Part.map((part) => (
                <Accordion key={part.id}>
                  <AccordionSummary expandIcon={<FiChevronDown size={24} />}>
                    <Typography fontWeight={600}>
                      {part.name} - رقم الجزء: {part.number}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {part.description}
                    </Typography>

                    <Typography className="mt-2 text-sm">
                      عدد الدروس: {part._count.Lesson} | عدد الامتحانات:{" "}
                      {part._count.Exam}
                    </Typography>

                    <Divider className="!my-4" />

                    {part.Lesson && part.Lesson.length > 0 ? (
                      <div className="space-y-2">
                        {part.Lesson.map((lesson: any) => (
                          <div
                            key={lesson.id}
                            className="p-3 bg-gray-100 rounded-md shadow-sm"
                          >
                            <Typography fontWeight={500}>
                              الدرس: {lesson.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {lesson.description}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Typography variant="body2" color="text.disabled">
                        لا توجد دروس لهذا الجزء.
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">لا توجد أجزاء متاحة.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OneCourse;

// Info display
const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="font-semibold text-gray-800">{label}</p>
    <p className="text-gray-700">{value}</p>
  </div>
);

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../Store/store";
import { getOneCourse } from "../../Store/Apis/Courses/getOneCourseApi";
import { OneCourse as OneCourseType } from "../../Types/course"; // update this import path as needed
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

  // Type assertion
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

          <hr />

          <h3 className="text-xl font-bold mt-6">أجزاء الكورس</h3>
          {courseData.data.Part && courseData.data.Part.length > 0 ? (
            <div className="space-y-4">
              {courseData.data.Part.map((part) => (
                <PartCard key={part.id} part={part} />
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

// Reusable info display
const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="font-semibold text-gray-800">{label}</p>
    <p className="text-gray-700">{value}</p>
  </div>
);

// PartCard component
const PartCard: React.FC<{ part: any }> = ({ part }) => (
  <div className="p-4 border rounded-md shadow-sm bg-gray-50">
    <h4 className="text-lg font-bold">{part.name}</h4>
    <p className="text-sm text-gray-600">{part.description}</p>
    <div className="text-sm mt-2 text-gray-700">
      <p>رقم الجزء: {part.number}</p>
      <p>
        عدد الدروس: {part._count.Lesson} | عدد الامتحانات: {part._count.Exam}
      </p>
    </div>
  </div>
);

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../Store/store";
import { getOneCourse } from "../../Store/Apis/Courses/getOneCourseApi";
import Loading from "../../Components/Shared/Loading/Loading";
import { OneCourse as OneCourseType } from "../../Types/course";
import axios from "axios";
import toast from "react-hot-toast";

const Checkout: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [orderLoading, setOrderLoading] = useState(false);
  const { oneCourse, courseLoadig, courseError } = useSelector(
    (state: RootState) => state.course
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(getOneCourse({ courseId: String(id) }));
    }
  }, [dispatch, id]);

  // Type assertion: only access `data` if `oneCourse` is typed correctly
  const courseData = (oneCourse as OneCourseType)?.data;
  const makeAnOrder = async () => {
    try {
      setOrderLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/orders/checkout`,
        {
          courseId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrderLoading(false);
      toast.success("تم بنجاح الرجاء التواصل مع احد المسؤلين لتأكيد الاشتراك");
      navigate("/userprofile/subscriptions");
    } catch (error) {
      setOrderLoading(false);
      toast.error("حدث خطأ!");
    }
  };
  return (
    <div className="max-w-3xl mx-auto px-6 py-8 text-right" dir="rtl">
      {courseLoadig && (
        <div className="flex justify-center items-center h-40">
          <Loading />
        </div>
      )}

      {courseError && (
        <p className="text-red-500 font-semibold text-center">
          حدث خطأ أثناء تحميل بيانات الكورس: {courseError}
        </p>
      )}

      {courseData && (
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-main">{courseData.name}</h1>
            <p className="text-gray-600 mt-2">{courseData.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <Info label="السنة الدراسية" value={courseData.year} />
            <Info
              label="الفصل الدراسي"
              value={courseData.term === "FIRST" ? "الأول" : "الثاني"}
            />
            <Info
              label="عدد الأجزاء"
              value={courseData._count.Part.toString()}
            />
            <Info
              label="عدد الدروس"
              value={courseData._count.Lesson.toString()}
            />
            <Info
              label="عدد الامتحانات"
              value={courseData._count.Exam.toString()}
            />
            <Info label="السعر" value={`${courseData.price} د.ك`} />
          </div>
          <div className="flex">
            <button
              onClick={() => {
                makeAnOrder();
              }}
              className={
                orderLoading
                  ? "bg-gray-600 text-white p-1 w-full rounded-md"
                  : "bg-main text-white p-1 w-full rounded-md cursor-pointer"
              }
            >
              {orderLoading ? "يتم التحميل بالرجاء الانتظار" : "اشتراك"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

// Helper Info component
const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

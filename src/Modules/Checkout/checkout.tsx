import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../Store/store";
import { getOneCourse } from "../../Store/Apis/Courses/getOneCourseApi";
import Loading from "../../Components/Shared/Loading/Loading";
import { OneCourse as OneCourseType } from "../../Types/course";
import axios from "axios";
import toast from "react-hot-toast";

// React Icons
import {  HiOutlineCalendar, HiOutlineClock } from "react-icons/hi";
import { FaListOl, FaRegFileAlt, FaRegMoneyBillAlt } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";

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

  const courseData = (oneCourse as OneCourseType)?.data;

  const makeAnOrder = async () => {
    try {
      setOrderLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/orders/checkout`,
        { courseId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrderLoading(false);
      toast.success("تم بنجاح الرجاء التواصل مع أحد المسؤولين لتأكيد الاشتراك");
      navigate("/userprofile/subscriptions");
    } catch (error) {
      setOrderLoading(false);
      toast.error("حدث خطأ!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-right" dir="rtl">
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
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6 border">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-main">{courseData.name}</h1>
            <p className="text-gray-600 leading-relaxed">{courseData.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-6">
            <Info icon={<HiOutlineCalendar size={20} />} label="السنة الدراسية" value={courseData.year} />
            <Info
              icon={<HiOutlineClock size={20} />}
              label="الفصل الدراسي"
              value={courseData.term === "FIRST" ? "الأول" : "الثاني"}
            />
            <Info
              icon={<FaListOl size={18} />}
              label="عدد الأجزاء"
              value={courseData._count.Part.toString()}
            />
            <Info
              icon={<MdMenuBook size={20} />}
              label="عدد الدروس"
              value={courseData._count.Lesson.toString()}
            />
            <Info
              icon={<FaRegFileAlt size={18} />}
              label="عدد الامتحانات"
              value={courseData._count.Exam.toString()}
            />
            <Info
              icon={<FaRegMoneyBillAlt size={20} />}
              label="السعر"
              value={`${courseData.price} د.ك`}
            />
          </div>

          <div className="pt-6">
            <button
              onClick={makeAnOrder}
              disabled={orderLoading}
              className={`w-full py-3 rounded-md text-white font-semibold transition-all ${
                orderLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-main hover:bg-opacity-90"
              }`}
            >
              {orderLoading ? "يتم التحميل..." : "إتمام الاشتراك الآن"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

// Reusable Info card with icon
const Info: React.FC<{
  label: string;
  value: string;
  icon?: React.ReactNode;
}> = ({ label, value, icon }) => (
  <div className="flex items-start space-x-2 space-x-reverse">
    <div className="text-main mt-1">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-semibold text-gray-800 text-base">{value}</p>
    </div>
  </div>
);

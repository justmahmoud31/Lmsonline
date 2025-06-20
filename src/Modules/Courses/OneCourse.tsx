import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../Store/store";
import { getOneCourse } from "../../Store/Apis/Courses/getOneCourseApi";
import { OneCourse as OneCourseType } from "../../Types/course";
import Loading from "../../Components/Shared/Loading/Loading";
import { MdOutlinePublic } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import sorry from '../../assets/Feeling sorry-pana.png'
const OneCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { oneCourse, courseLoadig, courseError } = useSelector(
    (state: RootState) => state.course
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (id) {
      dispatch(getOneCourse({ courseId: id }));
    }
  }, [dispatch, id]);

  const courseData = oneCourse as OneCourseType;

  const handleLessonClick = (lesson: any) => {
    if (lesson.public) {
      if (lesson.File?.url) {
        setDialogContent(
          <div className="w-full h-[300px]">
            <video controls className="w-full h-full rounded">
              <source
                src={`${import.meta.env.VITE_VIDEOSTREAMING}${
                  lesson.File.path
                }`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      } else {
        setDialogContent(<Typography>لا يوجد فيديو مرفق.</Typography>);
      }
    } else {
      setDialogContent(
        <div className="space-y-4 text-center flex flex-col justify-center items-center">
          <img src={sorry} className="h-72"/>
          <h6  className="text-red-500">
            يجب الاشتراك لعرض هذا المحتوى
          </h6>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/checkout/${id}`)}
          >
            اشترك الآن
          </Button>
        </div>
      );
    }
    setOpenDialog(true);
  };

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

          {/* Subscribe CTA */}
          <div className="text-center mt-2">
            <Link
              to={`/checkout/${id}`}
              className="inline-block bg-main text-white px-4 py-2 rounded transition"
            >
              اشترك الآن
            </Link>
          </div>

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
                    <p className="text-gray-500">{part.description}</p>

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
                            onClick={() => handleLessonClick(lesson)}
                            className="p-3 bg-gray-100 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 transition"
                          >
                            <h2 className="flex items-center gap-1 text-center justify-start">
                              {lesson.public ? <MdOutlinePublic /> : <FaLock />}
                              الدرس: {lesson.name}
                            </h2>
                            <p className="text-gray-500">
                              {lesson.description}
                            </p>
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

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>عرض الدرس</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إغلاق</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OneCourse;

const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="font-semibold text-gray-800">{label}</p>
    <p className="text-gray-700">{value}</p>
  </div>
);

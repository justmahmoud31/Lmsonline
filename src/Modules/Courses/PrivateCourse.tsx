// pages/course/[id].tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPrivateCourse } from "../../services/courseService";
import { IoIosArrowDown } from "react-icons/io";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Course, Exam } from "../../Types/course";
import { Lesson } from "../../Types/lesson";
import Loading from "../../Components/Shared/Loading/Loading";
import LessonPlayer from "../../Components/CourseViewer/LessonPlayer";
import ExamViewer from "../../Components/CourseViewer/ExamViewer";
import { MdOutlineSmartDisplay } from "react-icons/md";
import { PiExam } from "react-icons/pi";
function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  useEffect(() => {
    if (id) getPrivateCourse(id).then(setCourse);
  }, [id]);
  if (!course)
    return (
      <div className="text-center mt-10 flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col-reverse lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/3 p-4 border-r h-screen lg:sticky top-0">
        <h5 className="mb-4">المحتوى</h5>
        {course.Part.map((part) => (
          <Accordion key={part.id} defaultExpanded>
            <AccordionSummary expandIcon={<IoIosArrowDown />}>
              <div className="flex justify-between items-center w-full">
                <h2>{part.name}</h2>
                <span className="text-gray-500 text-sm">
                  {part.Lesson.length + part.Exam.length} محتوى
                </span>
              </div>
            </AccordionSummary>
            <AccordionDetails className="space-y-2">
              {part.Lesson.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => {
                    setSelectedLesson(lesson);
                    setSelectedExam(null);
                  }}
                  className="cursor-pointer hover:text-indigo-600 flex justify-start gap-1 items-center"
                >
                  <MdOutlineSmartDisplay /> {lesson.name}
                </div>
              ))}
              {part.Exam.map((exam) => (
                <div
                  key={exam.id}
                  onClick={() => {
                    setSelectedExam(exam);
                    setSelectedLesson(null);
                  }}
                  className="cursor-pointer hover:text-indigo-600 flex justify-start gap-1 items-center"
                >
                  <PiExam /> {exam.name}
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </aside>

      {/* Main content */}
      <main className="lg:flex-1 p-4">
        {selectedLesson ? (
          <>
            <LessonPlayer path={selectedLesson.File.path} />
            <Card>
              <CardContent>
                <Typography variant="h6">{selectedLesson.name}</Typography>
                <Typography className="text-gray-600 mt-2">
                  {selectedLesson.description}
                </Typography>
              </CardContent>
            </Card>
          </>
        ) : selectedExam ? (
          <>
            <Typography variant="h6" className="mb-2">
              {selectedExam.name}
            </Typography>
            <div className="space-y-4">
              <ExamViewer examId={selectedExam.id} />
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            اختر درسًا أو اختبارًا لبدء المشاهدة
          </div>
        )}
      </main>
    </div>
  );
}

export default CoursePage;

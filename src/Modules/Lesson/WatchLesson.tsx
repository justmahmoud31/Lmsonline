import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { Lesson } from "../../Types/lesson";
import { fetchLessons } from "../../Store/Apis/Lesson/getLessonApi";
import { CiMenuFries } from "react-icons/ci";
import { getOneCourse } from "../../Store/Apis/Courses/getOneCourseApi";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItemButton,
} from "@mui/material";
import { FaPlay } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Loading from "../../Components/Shared/Loading/Loading";
function WatchLesson() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { lessons } = useSelector((state: RootState) => state.lessons);
  const { oneCourse, courseLoadig, courseError } = useSelector(
    (state: RootState) => state.course
  );
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [flatLessons, setFlatLessons] = useState<Lesson[]>([]);
  const [accordionOpen, setAccordionOpen] = useState<boolean[]>([]);
  console.log(flatLessons);

  useEffect(() => {
    if (id) {
      dispatch(getOneCourse({ courseId: id }));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if ("data" in oneCourse && oneCourse.data.Part) {
      setAccordionOpen(Array(oneCourse.data.Part.length).fill(false));
    }
  }, [oneCourse]);

  useEffect(() => {
    if ("data" in oneCourse && oneCourse.data?.Part) {
      const allLessons = oneCourse.data.Part.flatMap(
        (part) => part.Lesson || []
      );
      setFlatLessons(allLessons);
      if (allLessons.length > 0) {
        setSelectedLesson(allLessons[0]);
      }
    }
  }, [oneCourse]);

  useEffect(() => {
    dispatch(fetchLessons({ id: Number(id), public: false }));
  }, [dispatch, id]);

  useEffect(() => {
    if (lessons.length > 0) {
      setSelectedLesson(lessons[0]);
    }
  }, [lessons]);

  return (
    <div className="flex">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute flex justify-center items-center top-20 right-4 z-20 p-2 bg-gray-200 cursor-pointer rounded md:hidden"
      >
        <CiMenuFries size={16} /> قائمة الدروس
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-10 min-h-screen h-full w-64 py-4 px-1 bg-gray-100  overflow-y-auto transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-xl ms-1 text-main font-bold mb-4">الدروس</h2>
        {courseLoadig ? (
          <div className="flex justify-center items-center my-8">
            <Loading />
          </div>
        ) : courseError ? (
          <p className="text-red-500">{courseError}</p>
        ) : "data" in oneCourse ? (
          <div className="space-y-4">
            {oneCourse.data.Part.map((part, index) => (
              <Accordion
                key={part.id}
                expanded={accordionOpen[index]}
                onChange={() => {
                  const updated = [...accordionOpen];
                  updated[index] = !updated[index];
                  setAccordionOpen(updated);
                }}
              >
                <AccordionSummary expandIcon={<IoIosArrowDown />}>
                  <div className="w-full flex justify-between items-center">
                    <Typography>{part.name}</Typography>
                    <p className="text-gray-500">{part._count.Lesson} درس</p>
                  </div>
                </AccordionSummary>

                <AccordionDetails>
                  <List>
                    {part.Lesson?.map((lesson) => (
                      <ListItemButton
                        key={lesson.id}
                        onClick={() => {
                          dispatch(
                            fetchLessons({
                              id: Number(lesson.id),
                              public: false,
                            })
                          );
                          setSelectedLesson(lesson);
                          setSidebarOpen(false);
                        }}
                        className={
                          selectedLesson?.id === lesson.id
                            ? "bg-main flex justify-center items-center gap-2 text-white rounded"
                            : ""
                        }
                      >
                        <FaPlay /> {lesson.name}
                      </ListItemButton>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : (
          <p>لا توجد بيانات دورة.</p>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:py-6 px-4 py-16 ml-0 overflow-y-auto">
        <h1 className="text-3xl text-center text-main">{'data' in oneCourse ? oneCourse.data.name : ''}</h1>
        {selectedLesson ? (
          <div>
            <h2 className="text-2xl text-main font-semibold mb-4">
              {selectedLesson.name}
            </h2>
            <p className="mb-4 text-gray-600">{selectedLesson.description}</p>

            {/* File Preview */}
            {selectedLesson.File?.url &&
            selectedLesson.File.type === "VIDEO" ? (
              <video
                src={`${import.meta.env.VITE_VIDEOSTREAMING}${
                  selectedLesson.File.path
                }`}
                controls
                controlsList="nodownload"
                className="w-full  rounded shadow-lg"
              />
            ) : selectedLesson.File?.url &&
              selectedLesson.File.type === "IMAGE" ? (
              <img
                src={`${import.meta.env.VITE_VIDEOSTREAMING}${
                  selectedLesson.File.path
                }`}
                alt={selectedLesson.name}
                className="w-full  object-contain rounded shadow-lg"
              />
            ) : (
              <p>لا يوجد فيديو أو ملف للعرض.</p>
            )}
          </div>
        ) : (
          <p>اختر درسًا من القائمة لعرضه.</p>
        )}
      </main>
    </div>
  );
}

export default WatchLesson;

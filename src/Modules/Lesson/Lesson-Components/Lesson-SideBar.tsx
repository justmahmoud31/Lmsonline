import { CiMenuFries } from "react-icons/ci";
import { Dispatch } from "redux";
import { OneCourse } from "../../../Types/course";
import { Lesson } from "../../../Types/lesson";
import LessonAccordion from "./LessonAccordion";


interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  oneCourse: OneCourse;
  courseLoading: boolean;
  courseError: string | null;
  selectedLesson: Lesson | null;
  setSelectedLesson: (l: Lesson) => void;
  dispatch: Dispatch<any>;
}

export default function LessonSidebar({
  sidebarOpen,
  setSidebarOpen,
  oneCourse,
  courseLoading,
  courseError,
  selectedLesson,
  setSelectedLesson,
  dispatch,
}: Props) {
  return (
    <>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-20 right-4 z-20 p-2 bg-gray-200 cursor-pointer rounded md:hidden"
      >
        <CiMenuFries size={16} />
      </button>

      <aside
        className={`fixed top-0 left-0 z-10 min-h-screen h-full w-64 py-4 px-1 bg-gray-100  overflow-y-auto transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-xl font-bold mb-4">الدروس</h2>
        {courseLoading ? (
          <p>جاري تحميل الدورة...</p>
        ) : courseError ? (
          <p className="text-red-500">{courseError}</p>
        ) : "data" in oneCourse ? (
          oneCourse.data.Part.map((part) => (
            <LessonAccordion
              key={part.id}
              part={part}
              selectedLesson={selectedLesson}
              setSelectedLesson={setSelectedLesson}
              dispatch={dispatch}
              setSidebarOpen={setSidebarOpen}
            />
          ))
        ) : (
          <p>لا توجد بيانات دورة.</p>
        )}
      </aside>
    </>
  );
}

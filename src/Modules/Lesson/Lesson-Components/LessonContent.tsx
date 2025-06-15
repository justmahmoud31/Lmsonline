import { useDispatch, useSelector } from "react-redux";
import { Lesson } from "../../../Types/lesson";
import { AppDispatch, RootState } from "../../../Store/store";
import { fetchLessons } from "../../../Store/Apis/Lesson/getLessonApi";
import { useEffect } from "react";

interface Props {
  selectedLesson: Lesson | null;
  flatLessons: Lesson[];
  setSelectedLesson: (l: Lesson) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}

export default function LessonContent({
  selectedLesson,
  flatLessons,
  setSelectedLesson,
}: Props) {
  const currentIndex = selectedLesson
    ? flatLessons.findIndex((l) => l.id === selectedLesson.id)
    : -1;
  const dispatch = useDispatch<AppDispatch>();
  const { lessons } = useSelector((state: RootState) => state.lessons);

  useEffect(() => {
    if (selectedLesson) {
      dispatch(fetchLessons({ id: Number(selectedLesson.id), public: false }));
    }
  }, [dispatch, selectedLesson]);
  useEffect(() => {
    if (lessons.length > 0) {
      setSelectedLesson(lessons[0]); 
    }
  }, [lessons,selectedLesson]);

  return (
    <main className="flex-1 lg:p-6  py-12 ml-0 overflow-y-auto">
      {selectedLesson ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">{selectedLesson.name}</h2>
          <p className="mb-4 text-gray-600">{selectedLesson.description}</p>

          {selectedLesson.File?.url && selectedLesson.File.type === "VIDEO" ? (
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

          <div className="flex justify-between items-center mt-6">
            <button
              disabled={currentIndex === 0}
              onClick={() => setSelectedLesson(flatLessons[currentIndex - 1])}
              className="bg-gray-200 px-4 cursor-pointer py-2 rounded disabled:opacity-50"
            >
              الدرس السابق
            </button>
            <button
              disabled={currentIndex === flatLessons.length - 1}
              onClick={() => setSelectedLesson(flatLessons[currentIndex + 1])}
              className="bg-gray-200 px-4 py-2 cursor-pointer rounded disabled:opacity-50"
            >
              الدرس التالي
            </button>
          </div>
        </div>
      ) : (
        <p>اختر درسًا من القائمة لعرضه.</p>
      )}
    </main>
  );
}

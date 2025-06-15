import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItemButton,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

import { Dispatch } from "redux";
import { Lesson } from "../../../Types/lesson";
import { Part } from "../../../Types/part";
import { fetchLessons } from "../../../Store/Apis/Lesson/getLessonApi";

interface Props {
  part: Part;
  selectedLesson: Lesson | null;
  setSelectedLesson: (l: Lesson) => void;
  dispatch: Dispatch<any>;
  setSidebarOpen: (val: boolean) => void;
}

export default function LessonAccordion({
  part,
  selectedLesson,
  setSelectedLesson,
  dispatch,
  setSidebarOpen,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
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
                dispatch(fetchLessons({ id: Number(lesson.id), public: false }));
                setSelectedLesson(lesson);
                setSidebarOpen(false);
              }}
              className={
                selectedLesson?.id === lesson.id
                  ? "bg-main text-white rounded"
                  : ""
              }
            >
              {lesson.name}
            </ListItemButton>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

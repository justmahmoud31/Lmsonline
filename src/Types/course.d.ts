import { Part } from "./part";

export interface Course {
    name: string;
    id: number;
    term: string;
    price: number;
    year: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    _count: {
        Part: number;
        Lesson: number;
        Exam: number;
    }
    Part: Part[];

}
export interface OneCourse {
    data: Course;

}
export interface getCourse {
    data: Course[]
}
export interface CourseState {
    courses: Course[],
    courseLoadig: boolean;
    courseError: string | null;
    oneCourse: OneCourse | {};
}
export interface CourseQueryParams {
    stageId?: number;
    gradeId?: number;
    mainMaterialId?: number;
    limit?: number;
    section?: string;
}
export interface Exam {
  id: number;
  name: string;
  description: string;
  date: string;
  type: string;
  lessonId: number | null;
}
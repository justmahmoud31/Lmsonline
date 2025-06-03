import { Lesson } from "./lesson";

export interface Part {
    id: number;
    name: string;
    description: string;
    number: number;
    Lesson : Lesson[];
    _count: {
        Lesson: number;
        Exam: number;
    }
}
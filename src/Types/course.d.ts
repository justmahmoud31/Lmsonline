export interface Course {
    name: string;
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
}
export interface getCourse {
    data: Course[]
}
export interface CourseState {
    courses: Course[],
    courseLoadig: boolean;
    courseError: string | null;
}
export interface CourseQueryParams {
    stageId?: number;
    gradeId?: number;
    mainMaterialId?: number;
    limit?: number;
    section?: string;
}
export interface Part {
    id: number;
    name: string;
    description: string;
    number: number;
    _count: {
        Lesson: number;
        Exam: number;
    }
}
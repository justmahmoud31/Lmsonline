export interface teacher {
    id: number;
    firstName: string;
    lastName: string;
    stageId: number;
    gradeId: number;
}
export interface getTeacher {
    data: teacher[],
    count: 1
}
export interface TeacherState {
    teachers: teacher[];
    teachersLoading: boolean;
    teachersError: string | null;
}
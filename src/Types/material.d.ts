export interface Material {
    id: number;
    name: string;
    gradeId: number;
    mainMaterialId: number;
    stageId: number;
    price: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    _count: {
        TeacherMaterial: number;
    }
}
export interface getMaterial {
    data: Material[];
}
export interface MaterialState {
    materials: Material[];
    loading: boolean;
    error: string | null;
}
export interface MaterialQueryParams {
    stageId?: number;
    gradeId?: number;
    mainMaterialId?: number;
    limit?: number;
    section?: string;
}
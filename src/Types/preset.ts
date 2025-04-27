export interface Preset {
    id: number;
    uuid: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetPresetsResponse {
    message: string;
    count: number;
    data: Preset[];
}
export interface PresetsState {
    presets: Preset[];
    count: number;
    loading: boolean;
    error: string | null;
}

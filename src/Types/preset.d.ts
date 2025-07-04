export interface Preset {
    id: number;
    uuid: string;
    name: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    hasSection?: boolean;
    stageId?:number;
  }
  
  export interface PresetsState {
    grades: Preset[];
    stages: Preset[];
    loading: boolean;
    error: string | null;
  }
  
  
  export interface GetPresetsResponse {
    message: string;
    count: number;
    data: Preset[];
  }
  

export interface Lesson {
  id: number;
  uuid: string;
  name: string;
  description: string;
  number: number;
  partId: number;
  courseId: number;
  public: boolean;
  fileId: number;
  createdAt: Date; 
  updatedAt: Date; 
  _count: {
    Exam: number;
  };
  File: {
    id: number;
    uuid: string;
    name: string;
    path: string;
    url: string;
    source: string;
    type: string;
    size: number;
    category: string;
    createdAt: Date; 
    updatedAt: Date; 
  };
}
export interface LessonsResponse {
  message: string;
  totalDocs: number;
  count: number;
  data: Lesson[];
}
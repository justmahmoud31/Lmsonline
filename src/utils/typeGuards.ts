// src/utils/typeGuards.ts
import { OneCourse } from "../Types/course";

export function isOneCourse(obj: unknown): obj is OneCourse {
  return typeof obj === "object" && obj !== null && "data" in obj;
}

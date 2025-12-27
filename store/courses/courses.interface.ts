import { ICourse } from "@/types";

export interface InitialState {
  allCourses: ICourse[];
  courses: ICourse[];
  search: string;
  category: string | null;
  level: string | null;
  language: string | null;
  rating: string | null;
}

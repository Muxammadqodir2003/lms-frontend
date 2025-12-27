import { ICourse, ILesson, ISection } from "@/types";

export interface InitialState {
  course: ICourse | null;
  sections: ISection[];
  lessons: ILesson[];
}

import { ICourse, ISection, ILesson } from "@/types";
import { create } from "zustand";

type UseEditedCourseProps = {
  editedCourse: ICourse | null;
  setEditedCourse: (course: ICourse | null) => void;
  editedSection: ISection | null;
  setEditedSection: (section: ISection | null) => void;
  editedLesson: ILesson | null;
  setEditedLesson: (lesson: ILesson | null) => void;
};

export const useEditedCourse = create<UseEditedCourseProps>((set) => ({
  editedCourse: null,
  setEditedCourse: (course) => set({ editedCourse: course }),
  editedSection: null,
  setEditedSection: (section) => set({ editedSection: section }),
  editedLesson: null,
  setEditedLesson: (lesson) => set({ editedLesson: lesson }),
}));

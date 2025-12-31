import { ICourse } from "@/types";
import { create } from "zustand";

type UseEditedCourseProps = {
  editedCourse: ICourse | null;
  setEditedCourse: (course: ICourse | null) => void;
};

export const useEditedCourse = create<UseEditedCourseProps>((set) => ({
  editedCourse: null,
  setEditedCourse: (course) => set({ editedCourse: course }),
}));

import { ICourse, ISection } from "@/types";

export const getLessons = (course: ICourse) => {
  let result = 0;
  course?.sections?.forEach((section) => {
    result += section?.lessons?.length!;
  });
  return result;
};

export const getDuration = (course: ICourse) => {
  let result = 0;
  course?.sections?.forEach((section) => {
    section.lessons.forEach((lesson) => {
      result += lesson.duration;
    });
  });
  return result;
};

export const getLessonsLength = (section: ISection) => {
  let result = 0;
  section?.lessons?.forEach((lesson) => {
    result += lesson?.duration!;
  });
  return result;
};

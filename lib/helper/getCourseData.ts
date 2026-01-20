import { ICourse, ISection } from "@/types";

export const getLessons = (course: ICourse) => {
  let result = 0;
  course?.sections?.forEach((section) => {
    result += section?.lessons?.length!;
  });
  return result;
};

export const getDuration = (course: ICourse) => {
  console.log(course);
  let result = 0;
  course?.sections?.forEach((section) => {
    section.lessons.forEach((lesson) => {
      result += lesson.duration;
    });
  });
  console.log(result);
  const hours = Math.floor(result / 3600);
  const minutes = Math.floor((result % 3600) / 60);
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
};

export const getLessonsLength = (section: ISection) => {
  let result = 0;
  section?.lessons?.forEach((lesson) => {
    result += lesson?.duration!;
  });
  return result;
};

export const transformSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds}`;
};

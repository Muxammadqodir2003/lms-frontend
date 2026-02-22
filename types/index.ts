import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
}

export interface IError {
  data?: {
    message?: string;
  };
}

export interface IUser {
  id: string;
  email: string;
  role: string;
  instructorProfile: IInstructorProfile;
}

export interface IInstructorProfile {
  firstName: string;
  lastName: string;
  job: string;
  language: string;
  social: string;
  isActive: boolean;
  rating: number;
  studentsCount: number;
  coursesCount: number;
}

export interface ICourse {
  id: number;
  slug: string;
  title: string;
  subTitle: string;
  whatsLearn: string[];
  requirements: string[];
  tags: string[];
  description: string;
  level: string;
  category: string;
  price: number;
  language: string;
  image: string;
  rating: number;
  updatedAt: string;
  instructorId: string;
  isPublished: boolean;
  totalDuration: number;
  totalLessons: number;
  commentsCount: number;
  studentsCount: number;
  sections: ISection[];
  instructor: IInstructorProfile;
}

export interface ISection {
  id: number;
  name: string;
  courseId: string;
  totalDuration: number;
  totalLessons: number;
  lessons: ILesson[];
  orderIndex: number;
}

export interface ILesson {
  id: number;
  name: string;
  video: string;
  duration: number;
  description?: string;
  sectionId: number;
  orderIndex: number;
}

export interface IComment {
  id: number;
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
  user: IUser;
  createdAt: string;
}

export interface IFilters {
  category: string | null;
  level: string | null;
  language: string | null;
  rating: string | null;
  page: number;
}

export interface IEnrollment {
  id: number;
  course: ICourse;
  progress: number;
  courseId: number;
  currentLessonId: number;
}

export interface ILog {
  id: number;
  email: string;
  ipAddress: string;
  userAgent: string;
  reason: string;
  createdAt: string;
}

export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface VerifyFormValues {
  otp: string[];
}

export interface EmailValues {
  email: string;
}

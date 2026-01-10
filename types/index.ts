import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
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
  sections: ISection[];
}

export interface ISection {
  id: number;
  name: string;
  courseId: string;
  lessons: ILesson[];
}

export interface ILesson {
  id: number;
  name: string;
  video: string;
  duration: number;
  desciption?: string;
  sectionId: number;
}

export interface IFilters {
  category: string | null;
  level: string | null;
  language: string | null;
  rating: string | null;
  page: number;
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

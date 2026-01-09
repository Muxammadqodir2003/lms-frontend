import { EmailValues, LoginFormValues, RegisterFormValues } from "@/types";
import * as Yup from "yup";

export const registerSchema: Yup.ObjectSchema<RegisterFormValues> =
  Yup.object().shape({
    email: Yup.string()
      .email("To'g'ri email manzili kiriting")
      .required("Email kiritilishi shart"),
    password: Yup.string()
      .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
      .required("Parol kiritilishi shart"),
    confirmPassword: Yup.string()
      .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
      .required("Parolni tasdiqlashingiz shart")
      .oneOf([Yup.ref("password")], "Parollar mos emas"),
  });

export const loginSchema: Yup.ObjectSchema<LoginFormValues> =
  Yup.object().shape({
    email: Yup.string()
      .email("Iltimos yaroqli email kiriting")
      .required("Email kiritilishi shart"),
    password: Yup.string()
      .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
      .required("Parol kiritishingiz shart"),
  });

export const emailSchema: Yup.ObjectSchema<EmailValues> = Yup.object().shape({
  email: Yup.string()
    .email("To'g'ri email manzili kiriting")
    .required("Email kiritishingiz shart"),
});

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
    .required("Parol kiriishh shart"),
  confirmPassword: Yup.string()
    .required("Parol tasdiqlanishi shart")
    .oneOf([Yup.ref("password")], "Parollar mos emas"),
});

export const becomeInstructorSchema = Yup.object().shape({
  firstName: Yup.string().required("Ism bo'lishi shart"),
  lastName: Yup.string().required("Familiyasi bo'lishi shart"),
  job: Yup.string().required("Job bo'lishi shart"),
  language: Yup.string().required("Til bo'lishi shart"),
  social: Yup.string().required("Ijtimoiy tarmoq havolasi bo'lishi shart"),
});

export const courseSchema = Yup.object().shape({
  slug: Yup.string().required("Slug bo'lishi shart"),
  title: Yup.string().required("Title bo'lishi shart"),
  subTitle: Yup.string().required("Sub title bo'lishi shart"),
  whatsLearn: Yup.array(),
  requirements: Yup.array(),
  tags: Yup.array().min(3, "Kamida 3 ta teg bo'lishi shart"),
  description: Yup.string().required("deskription bo'lishi shart"),
  level: Yup.string().required(),
  category: Yup.string().required(),
  price: Yup.number().required(),
  language: Yup.string().required(),
});

export const sectionSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Title kamida 3 ta belgidan iborat bo'lishi kerak")
    .required("Title bo'lishi shart"),
});

export const lessonSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Nomi kamida 3 ta belgidan iborat bo'lishi kerak")
    .required("Nomi bo'lishi shart"),
});

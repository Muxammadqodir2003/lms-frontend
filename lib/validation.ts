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

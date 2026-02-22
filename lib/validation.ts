import { EmailValues, LoginFormValues, RegisterFormValues } from "@/types";
import * as Yup from "yup";

const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

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

export const pinSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "Kodni to'liq kiriting")
    .required("PIN kod kiritish majburiy"),
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
  whatsLearn: Yup.array()
    .of(Yup.string())
    .min(3, "Kamida 3 ta teg kiriting!")
    .max(10, "10 tadan ko'p bo'lishi mumkin emas!")
    .required("Bu maydonni to'ldirish shart!"),
  requirements: Yup.array()
    .of(Yup.string())
    .min(2, "Kamida 2 ta teg kiriting!")
    .max(10, "10 tadan ko'p bo'lishi mumkin emas!")
    .required("Bu maydonni to'ldirish shart!"),
  tags: Yup.array()
    .min(3, "Kamida 3 ta teg bo'lishi shart")
    .max(10, "10 tadan ko'p bo'lishi mumkin emas!")
    .required("Bu maydonni to'ldirish shart!"),
  description: Yup.string().optional(),
  level: Yup.string().required("Bu maydonni to'ldirish shart!"),
  category: Yup.string().required("Bu maydonni to'ldirish shart!"),
  price: Yup.number().required("Bu maydonni to'ldirish shart!"),
  language: Yup.string().required("Bu maydonni to'ldirish shart!"),
  image: Yup.mixed<File>()
    .required("Rasm yuklash majburiy!")
    .test("fileSize", "Fayl juda katta (max 5MB)", (value) => {
      return !value || (value instanceof File && value.size <= 5 * 1024 * 1024);
    })
    .test("fileFormat", "Format noto'g'ri", (value) => {
      return (
        !value ||
        (value instanceof File &&
          ["image/jpeg", "image/png"].includes(value.type))
      );
    }),
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

export const ratingSchema = Yup.object().shape({
  comment: Yup.string()
    .min(3, "Bu qism kamida 3 ta belgidan iborat bo'lishi kerak")
    .required("Bu qism to'ldirilishi shart"),
});

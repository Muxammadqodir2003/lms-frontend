import { ILesson } from "@/types";
import { baseApi } from "../baseApi";

export const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonById: builder.query<ILesson, string>({
      query: (id) => ({
        url: `/lesson/get-by-id/${id}`,
        method: "GET",
      }),
    }),
    getCurrentLessonBySlug: builder.query<ILesson, string>({
      query: (slug) => ({
        url: `/lesson/get-current-lesson-by-slug/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetLessonByIdQuery, useGetCurrentLessonBySlugQuery } =
  lessonApi;

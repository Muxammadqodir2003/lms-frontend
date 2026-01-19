import { ILesson } from "@/types";
import { baseApi } from "../baseApi";

export const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonById: builder.query<ILesson, { lessonId: string; slug: string }>({
      query: ({ lessonId, slug }) => ({
        url: `/lesson/get-by-id/${lessonId}?slug=${slug}`,
        method: "GET",
      }),
    }),
    getCurrentLessonBySlug: builder.query<ILesson, string>({
      query: (slug) => ({
        url: `/lesson/get-current-lesson-by-slug/${slug}`,
        method: "GET",
      }),
    }),
    lessonCompleted: builder.mutation<void, { lessonId: string; slug: string }>(
      {
        query: ({ lessonId, slug }) => ({
          url: `/lesson/completed/${lessonId}?slug=${slug}`,
          method: "POST",
        }),
      },
    ),
  }),
});

export const {
  useGetLessonByIdQuery,
  useGetCurrentLessonBySlugQuery,
  useLessonCompletedMutation,
} = lessonApi;

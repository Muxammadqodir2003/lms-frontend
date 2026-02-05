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

    getLessons: builder.query<ILesson[], string>({
      query: (sectionId) => ({
        url: `/lesson/get-all/${sectionId}`,
        method: "GET",
      }),
      providesTags: ["Lessons"],
    }),
    createLesson: builder.mutation({
      query: ({ sectionId, body }) => ({
        url: `/lesson/create/${sectionId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Lessons"],
    }),
    updateLesson: builder.mutation({
      query: ({ lessonId, body }) => ({
        url: `/lesson/update/${lessonId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Lessons"],
    }),
    reorderLesson: builder.mutation({
      query: ({
        lessons,
        sectionId,
      }: {
        lessons: ILesson[];
        sectionId: string;
      }) => ({
        url: `/lesson/reorder`,
        method: "PATCH",
        body: {
          lessons: lessons.map((lesson, index) => ({
            id: lesson.id,
            orderIndex: index,
          })),
        },
      }),
      async onQueryStarted(
        { lessons, sectionId },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          lessonApi.util.updateQueryData("getLessons", sectionId, (draft) => {
            lessons.forEach(({ id, orderIndex }) => {
              const lesson = draft.find((lesson) => lesson.id === id);
              if (lesson) orderIndex = orderIndex;
            });
            draft.sort((a, b) => a.orderIndex - b.orderIndex);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult?.undo();
        }
      },
      invalidatesTags: ["Lessons", "Sections", "Course"],
    }),
    deleteLesson: builder.mutation({
      query: (lessonId) => ({
        url: `/lesson/delete/${lessonId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lessons"],
    }),
  }),
});

export const {
  useGetLessonByIdQuery,
  useGetCurrentLessonBySlugQuery,
  useLessonCompletedMutation,
  useGetLessonsQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useReorderLessonMutation,
} = lessonApi;

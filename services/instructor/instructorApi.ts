import { ICourse, ILesson, ISection } from "@/types";
import { baseApi } from "../baseApi";

export const instructorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query<ICourse[], void>({
      query: () => ({
        url: "/instructor/get-all",
        method: "GET",
      }),
      providesTags: ["Courses"],
    }),
    createCourse: builder.mutation({
      query: (body) => ({
        url: "/course/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Courses"],
    }),
    updateCourse: builder.mutation({
      query: ({ courseId, body }) => ({
        url: `/course/update/${courseId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Courses"],
    }),
    getCourseBySlug: builder.query<ICourse, string>({
      query: (slug: string) => ({
        url: `/instructor/course/${slug}`,
        method: "GET",
      }),
      providesTags: ["Courses", "Course"],
    }),
    deleteCourse: builder.mutation({
      query: (slug: string) => ({
        url: `/course/delete/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),
    getSections: builder.query<ISection[], string>({
      query: (slug) => ({
        url: `/section/get-all/${slug}`,
        method: "GET",
      }),
      providesTags: ["Sections", "Course", "Lessons"],
    }),
    createSection: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/section/create/${slug}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sections", "Course"],
    }),
    updateSection: builder.mutation({
      query: ({ sectionId, body }) => ({
        url: `/section/update/${sectionId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Sections", "Course"],
    }),
    reorderSection: builder.mutation({
      query: ({ sections, slug }: { sections: ISection[]; slug: string }) => ({
        url: `/section/reorder`,
        method: "PATCH",
        body: {
          sections: sections.map((section, index) => ({
            id: section.id,
            orderIndex: index,
          })),
        },
      }),
      async onQueryStarted({ sections, slug }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          instructorApi.util.updateQueryData("getSections", slug, (draft) => {
            sections.forEach(({ id, orderIndex }) => {
              const section = draft.find((section) => section.id === id);
              if (section) orderIndex = orderIndex;
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
      invalidatesTags: ["Sections", "Course", "Lessons"],
    }),
    deleteSection: builder.mutation({
      query: (sectionId) => ({
        url: `/section/delete/${sectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sections", "Course"],
    }),
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
          instructorApi.util.updateQueryData(
            "getLessons",
            sectionId,
            (draft) => {
              lessons.forEach(({ id, orderIndex }) => {
                const lesson = draft.find((lesson) => lesson.id === id);
                if (lesson) orderIndex = orderIndex;
              });
              draft.sort((a, b) => a.orderIndex - b.orderIndex);
            },
          ),
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
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useGetCourseBySlugQuery,
  useDeleteCourseMutation,
  useGetSectionsQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
  useGetLessonsQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useReorderSectionMutation,
  useReorderLessonMutation,
} = instructorApi;

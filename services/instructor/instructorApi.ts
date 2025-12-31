import { baseApi } from "../baseApi";

export const instructorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (body) => ({
        url: "/course/create",
        method: "POST",
        body,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ courseId, body }) => ({
        url: `/course/update/${courseId}`,
        method: "PATCH",
        body,
      }),
    }),
    getCourseBySlug: builder.query({
      query: (slug: string) => ({
        url: `/course/${slug}`,
        method: "GET",
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id: string) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
    }),
    getSections: builder.query({
      query: (courseId) => ({
        url: `/section/get-all/${courseId}`,
        method: "GET",
      }),
    }),
    createSection: builder.mutation({
      query: ({ courseId, body }) => ({
        url: `/section/create/${courseId}`,
        method: "POST",
        body,
      }),
    }),
    updateSection: builder.mutation({
      query: ({ sectionId, body }) => ({
        url: `/section/delete/${sectionId}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteSection: builder.mutation({
      query: (sectionId) => ({
        url: `/section/delete/${sectionId}`,
        method: "DELETE",
      }),
    }),
    getLessons: builder.query({
      query: (sectionId) => ({
        url: `/lesson/get-all/${sectionId}`,
        method: "GET",
      }),
    }),
    createLesson: builder.mutation({
      query: ({ sectionId, body }) => ({
        url: `/lesson/create/${sectionId}`,
        method: "POST",
        body,
      }),
    }),
    updateLesson: builder.mutation({
      query: ({ lessonId, body }) => ({
        url: `/lesson/update/${lessonId}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteLesson: builder.mutation({
      query: (lessonId) => ({
        url: `/lesson/delete/${lessonId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
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
} = instructorApi;

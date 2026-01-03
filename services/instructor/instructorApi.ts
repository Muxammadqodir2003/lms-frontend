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
        url: `/course/${slug}`,
        method: "GET",
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id: string) => ({
        url: `/course/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),
    getSections: builder.query<ISection[], string>({
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
    getLessons: builder.query<ILesson[], string>({
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
} = instructorApi;

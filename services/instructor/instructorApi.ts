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
  }),
});

export const {
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useGetCourseBySlugQuery,
  useDeleteCourseMutation,
} = instructorApi;

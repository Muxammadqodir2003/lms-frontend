import { ICourse, IEnrollment, IFilters, IInstructorProfile } from "@/types";
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    becomeInstructor: builder.mutation({
      query: (body) => ({
        url: "/instructor/become-instructor",
        method: "POST",
        body,
      }),
    }),
    getAllCourses: builder.query<
      { courses: ICourse[]; totalCourses: number },
      IFilters
    >({
      query: (filters) => ({
        url: "/course/get-all-courses",
        method: "GET",
        params: filters,
      }),
    }),
    getCourseBySlug: builder.query<ICourse & { studentsCount: number }, string>(
      {
        query: (slug) => ({
          url: `/course/get-course-by-slug/${slug}`,
          method: "GET",
        }),
      }
    ),
    getCourseComments: builder.query<ICourse, string>({
      query: (slug) => ({
        url: `/course/get-course-comments/${slug}`,
        method: "GET",
      }),
    }),
    getInstructorById: builder.query<IInstructorProfile, string>({
      query: (id) => ({
        url: `/instructor/get-by-id/${id}`,
        method: "GET",
      }),
    }),
    enrollCourse: builder.mutation({
      query: (courseId) => ({
        url: `/student/enrollment/${courseId}`,
        method: "POST",
      }),
    }),
    getEnrolledCourses: builder.query<IEnrollment[], void>({
      query: () => ({
        url: `/student/enrolled-courses`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useBecomeInstructorMutation,
  useGetAllCoursesQuery,
  useGetCourseBySlugQuery,
  useGetCourseCommentsQuery,
  useGetInstructorByIdQuery,
  useEnrollCourseMutation,
  useGetEnrolledCoursesQuery,
} = userApi;

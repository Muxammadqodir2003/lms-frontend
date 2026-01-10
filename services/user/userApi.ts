import { ICourse, IFilters } from "@/types";
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
  }),
});

export const { useBecomeInstructorMutation, useGetAllCoursesQuery } = userApi;

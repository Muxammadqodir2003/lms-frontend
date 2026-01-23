import { baseApi } from "../baseApi";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    activeCourse: builder.mutation<void, string>({
      query: (slug) => ({
        url: `/course/active/${slug}`,
        method: "POST",
      }),
      invalidatesTags: ["Courses"],
    }),
    deactiveCourse: builder.mutation<void, string>({
      query: (slug) => ({
        url: `/course/deactive/${slug}`,
        method: "POST",
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const { useActiveCourseMutation, useDeactiveCourseMutation } = courseApi;

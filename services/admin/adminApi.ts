import { baseApi } from "../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInstructor: builder.query({
      query: () => ({
        url: "/instructor/all",
        method: "GET",
      }),
    }),
    approveInstructor: builder.mutation({
      query: (userId) => ({
        url: `/admin/approve-instructor/${userId}`,
        method: "POST",
      }),
    }),
    deactivateInstructor: builder.mutation({
      query: (userId) => ({
        url: `/admin/deactivate-instructor/${userId}`,
        method: "POST",
      }),
    }),
  }),
});

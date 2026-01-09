import { IUser } from "@/types";
import { baseApi } from "../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInstructor: builder.query<IUser[], number>({
      query: (page: number) => ({
        url: `/instructor/all?page=${page}&limit=${8}`,
        method: "GET",
      }),
      providesTags: ["Instructors"],
    }),
    approveInstructor: builder.mutation<IUser, string>({
      query: (userId) => ({
        url: `/admin/approve-instructor/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Instructors"],
    }),
    deactivateInstructor: builder.mutation<IUser, string>({
      query: (userId) => ({
        url: `/admin/deactivate-instructor/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Instructors"],
    }),
  }),
});

export const {
  useGetAllInstructorQuery,
  useApproveInstructorMutation,
  useDeactivateInstructorMutation,
} = adminApi;

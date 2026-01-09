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
  }),
});

export const { useBecomeInstructorMutation } = userApi;

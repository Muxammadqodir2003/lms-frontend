import { baseAuthApi } from "../baseAuthApi";

export const authApi = baseAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    verify: builder.mutation({
      query: (body) => ({
        url: "/auth/verify",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    getUrl: builder.mutation({
      query: (body) => ({
        url: "/auth/get-url",
        method: "POST",
        body,
      }),
    }),
    recovery: builder.mutation({
      query: (data) => ({
        url: `/auth/recovery-account/${data.token}`,
        method: "POST",
        body: data.body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyMutation,
  useGetUrlMutation,
  useRecoveryMutation,
} = authApi;

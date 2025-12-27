import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseAuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BASE_API_URL}/api`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});

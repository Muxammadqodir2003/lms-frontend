import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseAuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000/api`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});

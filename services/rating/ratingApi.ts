import { IComment } from "@/types";
import { baseApi } from "../baseApi";

export const ratingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRating: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/comment/${slug}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
    getRating: builder.query<IComment, string>({
      query: (slug) => ({
        url: `/comment/${slug}`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),
    getRatings: builder.query<IComment[], string>({
      query: (slug) => ({
        url: `/comment/get-all/${slug}`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),
  }),
});

export const { useAddRatingMutation, useGetRatingQuery, useGetRatingsQuery } =
  ratingApi;

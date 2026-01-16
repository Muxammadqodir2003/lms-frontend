import { ISection } from "@/types";
import { baseApi } from "../baseApi";

export const sectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSectionsByCourseSlug: builder.query<ISection[], string>({
      query: (slug) => ({
        url: `/section/get-by-course-slug/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSectionsByCourseSlugQuery } = sectionApi;

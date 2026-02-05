import { ISection } from "@/types";
import { baseApi } from "../baseApi";

export const sectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSectionsByCourseSlug: builder.query<
      { sections: ISection[]; completedLessons: number[] },
      string
    >({
      query: (slug) => ({
        url: `/section/get-by-course-slug/${slug}`,
        method: "GET",
      }),
    }),
    getSections: builder.query<ISection[], string>({
      query: (slug) => ({
        url: `/section/get-all/${slug}`,
        method: "GET",
      }),
      providesTags: ["Sections", "Course", "Lessons"],
    }),
    createSection: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/section/create/${slug}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sections", "Course"],
    }),
    updateSection: builder.mutation({
      query: ({ sectionId, body }) => ({
        url: `/section/update/${sectionId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Sections", "Course"],
    }),
    reorderSection: builder.mutation({
      query: ({ sections, slug }: { sections: ISection[]; slug: string }) => ({
        url: `/section/reorder`,
        method: "PATCH",
        body: {
          sections: sections.map((section, index) => ({
            id: section.id,
            orderIndex: index,
          })),
        },
      }),
      async onQueryStarted({ sections, slug }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          sectionApi.util.updateQueryData("getSections", slug, (draft) => {
            sections.forEach(({ id, orderIndex }) => {
              const section = draft.find((section) => section.id === id);
              if (section) orderIndex = orderIndex;
            });
            draft.sort((a, b) => a.orderIndex - b.orderIndex);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult?.undo();
        }
      },
      invalidatesTags: ["Sections", "Course", "Lessons"],
    }),
    deleteSection: builder.mutation({
      query: (sectionId) => ({
        url: `/section/delete/${sectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sections", "Course"],
    }),
  }),
});

export const {
  useGetSectionsByCourseSlugQuery,
  useGetSectionsQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
  useReorderSectionMutation,
} = sectionApi;

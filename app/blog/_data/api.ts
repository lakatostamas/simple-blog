import { api } from "@/src/redux/api";
import { ICategory, IPost } from "./model";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<
      {
        posts: Array<IPost>;
        totalCount: number;
        pageSize: number;
      },
      string | void
    >({
      query: (query) => ({
        url: `/post?${query}`,
        method: "GET",
      }),
    }),
    getCategories: builder.query<
      {
        categories: Array<ICategory>;
      },
      void
    >({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery, useGetCategoriesQuery } = extendedApi;

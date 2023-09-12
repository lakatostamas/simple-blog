import { api } from "@/src/redux/api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<any, void>({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery } = extendedApi;

import { api } from "@/src/redux/api";
import { IPost } from "./model";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<
      {
        posts: Array<IPost>;
      },
      void
    >({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery } = extendedApi;

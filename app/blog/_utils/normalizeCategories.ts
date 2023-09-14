import { ICategory, IPost, IPostWithCategories } from "../_data/model";

export function normalizeCategories(
  post: IPost,
  categories: Array<ICategory>
): IPostWithCategories {
  return {
    ...post,
    categories: post.categories
      .map((categoryId) =>
        categories.find((category) => category.id === categoryId)
      )
      .filter(Boolean),
  };
}

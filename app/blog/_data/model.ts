export interface IBasePost {
  excerpt: string;
  id: number;
  imageUrl: string;
  slug: string;
  title: string;
}

export interface IPost extends IBasePost {
  categories: Array<number>;
}

export interface IPostWithCategories extends IBasePost {
  categories: Array<ICategory | undefined>;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
}

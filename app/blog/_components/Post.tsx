import { IPost, IPostWithCategories } from "@/app/blog/_data/model";
import Image from "next/image";
import Link from "next/link";

interface IPostProps {
  post: IPostWithCategories;
}

const Post: React.FC<IPostProps> = (props) => {
  const { post } = props;
  return (
    <article className="w-2/6 grow bg-white rounded-lg drop-shadow-lg transition ease-in-out delay-150 hover:-translate-y-2">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-60 overflow-hidden">
          <Image
            className="object-cover rounded-t-lg"
            src={post.imageUrl}
            alt={post.title}
            fill
          />
        </div>
        <div className="p-5">
          <div className="flex gap-3">
            {post.categories.map((category) => (
              <span key={category?.id} className="text-indigo-600">
                {category?.name}
              </span>
            ))}
          </div>
          <h2 className="mt-3">{post.title}</h2>
          <p className="text-gray-400 text-justify mt-5">{post.excerpt}</p>
        </div>
      </Link>
    </article>
  );
};

export default Post;

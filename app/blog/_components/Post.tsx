import { IPost, IPostWithCategories } from "@/app/blog/_data/model";
import Image from "next/image";
import Link from "next/link";

interface IPostProps {
  post: IPostWithCategories;
  variant: "page" | "list";
}

const Post: React.FC<IPostProps> = (props) => {
  const { post, variant } = props;

  const renderPostBody = () => (
    <>
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
    </>
  );

  return (
    <article
      className={`lg:${
        variant === "page" ? "w-full" : "w-2/6"
      } w-full grow bg-white rounded-lg drop-shadow-lg transition ease-in-out delay-150 hover:-translate-y-2`}
    >
      {variant === "list" ? (
        <Link href={`/blog/${post.slug}`}>{renderPostBody()}</Link>
      ) : (
        renderPostBody()
      )}
    </article>
  );
};

export default Post;

import React from "react";
import type { SanityDocument } from "@sanity/client";
import PostsCard from "./PostsCard";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWidth";

const Posts = ({
  filter,
  posts = [],
}: {
  filter: string;
  posts: SanityDocument[];
}) => {
  const { width } = useWindowWidth();
  return (
    <>
      {filter === "grid" ? (
        <ul className="flex flex-col gap-8 md:grid md:grid-cols-2 lg:px-0">
          {posts.map((post) => (
            <li key={post._id} className="rounded-3xl">
              <PostsCard sanityPosts={post} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mb-4 flex w-full flex-col lg:mb-[20vh]">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="gap-10 border-b py-6 lg:grid lg:grid-cols-coachingNutrition lg:py-10"
            >
              {width > 1024 && (
                <div className="grid h-max w-40 place-content-center rounded-full border border-white py-2 text-sm">
                  {post.tags}
                </div>
              )}
              <h2 className="overflow-hidden text-ellipsis whitespace-normal break-words break-all lg:text-2xl">
                {post.title}
              </h2>
              <span className="text-black">{post._createdAt}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;

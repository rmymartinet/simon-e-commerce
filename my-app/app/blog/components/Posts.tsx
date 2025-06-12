import React, { memo } from "react";
import type { SanityDocument } from "@sanity/client";
import PostsCard from "./PostsCard";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWidth";

interface PostsProps {
  filter: string;
  posts: SanityDocument[];
}

const Posts: React.FC<PostsProps> = memo(({ filter, posts = [] }) => {
  const { width } = useWindowWidth();

  const renderGridPosts = () => (
    <ul className="flex flex-col gap-8 md:grid md:grid-cols-3 lg:px-0" role="list">
      {posts.map((post) => {
        if (!post._id) return null;
        return (
          <li key={`grid-${post._id}`} className="rounded-3xl">
            <PostsCard sanityPosts={post} />
          </li>
        );
      })}
    </ul>
  );

  const renderListPosts = () => (
    <div className="mb-4 flex w-full flex-col gap-4" role="list">
      {posts.map((post) => {
        if (!post._id || !post.slug?.current) return null;

      

        let formattedDate;
        try {
          const dateToUse = post.publishedAt || post._createdAt;
          
          if (!dateToUse) {
            formattedDate = 'Date non disponible';
          } else {
            formattedDate = new Date(dateToUse).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          }
        } catch (error) {
          console.error('Error formatting date:', error);
          formattedDate = 'Date invalide';
        }

        return (
          <article key={`list-${post._id}`} className="border-b border-gray-200 pb-4">
            <Link
              href={`/blog/${post.slug.current}`}
              className="flex flex-col gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="grid grid-cols-[100px_1fr_100px] gap-6 items-center">
                {width > 1024 && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 grid place-content-center">
                    {post.tags}
                  </span>
                )}
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-medium">
                    {post.title}
                  </h2>
                </div>
                <time dateTime={formattedDate} className="text-sm text-gray-500">
                  {formattedDate}
                </time>
              </div>
              {post.teaser && (
                <p className="text-gray-600 line-clamp-2">
                  {post.teaser}
                </p>
              )}
            </Link>
          </article>
        );
      })}
    </div>
  );

  return filter === "grid" ? renderGridPosts() : renderListPosts();
});

Posts.displayName = 'Posts';

export default Posts;

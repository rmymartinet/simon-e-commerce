import React from "react";
import Image from "next/image";
import type { SanityDocument } from "@sanity/client";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";

const Posts = ({ posts = [] }: { posts: SanityDocument[] }) => {
  const builder = imageUrlBuilder(client);

  return (
    <ul className="flex flex-col gap-8 border-2 border-red-400 md:grid md:grid-cols-2 lg:grid-cols-2 lg:px-0">
      {posts.map((post) => (
        <li key={post._id} className="rounded-3xl">
          <Link
            href={`/blog/${post.slug.current}`}
            className="flex flex-col gap-4"
          >
            {post.mainImage && (
              <div className="h-[35vh] overflow-hidden">
                <Image
                  src={builder.image(post.mainImage).url()}
                  alt=""
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex gap-4">
              <span className="h-max w-max rounded-full bg-black px-2 py-1 text-white">
                {post.tags}
              </span>
              <h2 className="text-2xl">{post.title}</h2>
            </div>
            <p className="break-words text-slate-400">{post.teaser}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Posts;

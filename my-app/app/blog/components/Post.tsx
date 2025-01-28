"use client";

import React from "react";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

const builder = imageUrlBuilder(client);

const Post = ({ post }: { post: SanityDocument }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="container mx-auto mt-40 flex flex-col items-center px-4 py-16">
      <div className="mb-10 flex flex-col gap-4 self-start">
        <h1 className="self-start text-7xl font-semibold text-white">
          {post.title}
        </h1>
        <span>{formattedDate}</span>
      </div>
      <div className="">
        {post?.mainImage ? (
          <Image
            src={builder.image(post.mainImage).url()}
            alt={post.title}
            width={2000}
            height={2000}
            quality={100}
            layout="responsive"
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <section className="prose-custom prose prose-xl">
        {post?.body ? (
          <div className="text-white">
            <PortableText value={post.body} />
          </div>
        ) : null}
      </section>
      <div className="mb-20 mt-20 h-[1px] w-full bg-white" />
    </main>
  );
};

export default Post;

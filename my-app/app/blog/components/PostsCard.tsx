import Link from "next/link";
import React from "react";
import Images from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";

function PostsCard({ sanityPosts }: { sanityPosts: SanityDocument }) {
  const builder = imageUrlBuilder(client);

  return (
    <div className="h-full w-full">
      <div className="h-[300px] overflow-hidden rounded-md">
        <Link key={sanityPosts._id} href={`/blog/${sanityPosts.slug.current}`}>
          {sanityPosts && (
            <Images
              src={builder.image(sanityPosts.mainImage).url()}
              alt=""
              width={1000}
              height={1000}
              quality={100}
              className="h-full w-full object-cover"
            />
          )}
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="mt-10 flex flex-col gap-10">
          <div className="w-max rounded-full border border-white px-8 py-2 text-sm">
            {sanityPosts.tags}
          </div>
          <h2 className="text-2xl">{sanityPosts.title}</h2>
        </div>
        <span className="text-black">{sanityPosts._createdAt}</span>
      </div>
    </div>
  );
}

export default PostsCard;

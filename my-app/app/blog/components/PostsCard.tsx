import Link from "next/link";
import React from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { MdKeyboardArrowRight } from "react-icons/md";

function PostsCard({ sanityPosts }: { sanityPosts: SanityDocument }) {
  const builder = imageUrlBuilder(client);

  return (
    <div className="group h-full w-full rounded-xl border border-[--border-color] bg-[--card-bg] p-5 transition-all duration-300 md:p-4">
      <div className="h-[300px] overflow-hidden rounded-md">
        <Link key={sanityPosts._id} href={`/blog/${sanityPosts.slug.current}`}>
          {sanityPosts && (
            <Image
              src={builder.image(sanityPosts.mainImage).url()}
              alt=""
              width={1000}
              height={1000}
              quality={100}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
            />
          )}
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="mt-10 flex flex-col gap-10">
          <div className="w-max rounded-full border border-[--border-color] bg-[--card-bg] p-2 text-sm transition-all duration-500 group-hover:scale-105">
            {sanityPosts.tags}
          </div>
          <h2 className="md:text-xl">{sanityPosts.title}</h2>
          <button className="flex items-center gap-1 justify-self-end">
            <Link
              href={`/blog/${sanityPosts.slug.current}`}
              className="text-blue-400"
            >
              Read more
            </Link>
            <MdKeyboardArrowRight className="transform text-lg text-blue-400 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
        <span className="text-black">{sanityPosts._createdAt}</span>
      </div>
    </div>
  );
}

export default PostsCard;

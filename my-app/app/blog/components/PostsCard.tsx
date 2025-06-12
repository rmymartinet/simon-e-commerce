import Link from "next/link";
import React, { memo } from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { MdKeyboardArrowRight } from "react-icons/md";

interface PostsCardProps {
  sanityPosts: SanityDocument;
}

const PostsCard: React.FC<PostsCardProps> = memo(({ sanityPosts }) => {
  const builder = imageUrlBuilder(client);
  const imageUrl = sanityPosts.mainImage ? builder.image(sanityPosts.mainImage).url() : '';
  const formattedDate = new Date(sanityPosts._createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="group h-full w-full rounded-xl border border-[--border-color] bg-[--card-bg] p-5 transition-all duration-300 md:p-4">
      <div className="h-[300px] overflow-hidden rounded-md">
        <Link 
          href={`/blog/${sanityPosts.slug.current}`}
          aria-label={`Lire l'article : ${sanityPosts.title}`}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={sanityPosts.title}
              width={1000}
              height={1000}
              quality={100}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
              priority={false}
              loading="lazy"
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
          <div className="flex items-center gap-1 justify-self-end">
            <Link
              href={`/blog/${sanityPosts.slug.current}`}
              className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
              aria-label={`Lire l'article : ${sanityPosts.title}`}
            >
              Lire la suite
            </Link>
            <MdKeyboardArrowRight 
              className="transform text-lg text-blue-400 transition-transform duration-300 group-hover:translate-x-1" 
              aria-hidden="true"
            />
          </div>
        </div>
        <time dateTime={sanityPosts._createdAt} className="text-black">
          {formattedDate}
        </time>
      </div>
    </article>
  );
});

PostsCard.displayName = 'PostsCard';

export default PostsCard;

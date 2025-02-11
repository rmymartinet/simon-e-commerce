import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextReactComponents,
} from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { SanityDocument } from "@sanity/client";
// import PostsCard from "./PostsCard";
// import { sanityFetch } from "@/sanity/lib/fetch";
// import { postsQuery } from "@/sanity/lib/queries";
// import { useEffect, useState } from "react";

const builder = imageUrlBuilder(client);

const Post = ({ post }: { post: SanityDocument }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // const [posts, setPost] = useState<SanityDocument[]>([]);

  // useEffect(() => {
  //   const reqSanityPosts = async () => {
  //     const sanityPosts = await sanityFetch<SanityDocument[]>({
  //       query: postsQuery,
  //     });
  //     setPost(sanityPosts);
  //   };

  //   reqSanityPosts();
  // }, []);

  const myPortableTextComponents: Partial<PortableTextReactComponents> = {
    marks: {
      textColor: ({ children, value }) => (
        <strong
          style={{
            color: value?.value,
          }}
        >
          {children}
        </strong>
      ),
      highlightColor: ({ children, value }) => (
        <span
          style={{
            background: value?.value,
            padding: "2px 4px",
            borderRadius: "4px",
          }}
        >
          {children}
        </span>
      ),
    },
    types: {
      image: ({ value }) => (
        <Image
          src={builder.image(value).url()}
          alt={value.alt || "Image"}
          width={1000}
          height={1000}
          quality={100}
          layout="responsive"
        />
      ),
    },
  };
  return (
    <main className="container mx-auto mt-40 flex flex-col items-center px-4 py-16">
      <div className="mb-10 flex flex-col gap-4 self-start">
        <h1 className="self-start text-3xl font-semibold text-white lg:text-6xl">
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
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <section className="prose-custom prose prose-xl">
        {post?.body ? (
          <div className="text-white">
            <PortableText
              value={post.body}
              components={myPortableTextComponents}
            />
          </div>
        ) : null}
      </section>
      <div className="mb-20 mt-20 h-[1px] w-full bg-white" />
      {/* {posts.map((post, index) => (
        <PostsCard key={index} sanityPosts={post} />
      ))} */}
    </main>
  );
};

export default Post;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { SanityDocument } from "@sanity/client";
import { postPathsQuery, postQuery, postsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import React from "react";
import Post from "../components/Post";

export async function generateStaticParams() {
  const posts = await client.fetch(postPathsQuery);

  return posts
    .filter((post: any) => post.slug?.current)
    .map((post: any) => ({
      slug: post.slug.current,
    }));
}

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  if (!params) return null;

  const { slug } = await params;

  const post = await sanityFetch<SanityDocument>({
    query: postQuery,
    params: { slug },
  });

  const sanityPosts = await sanityFetch<SanityDocument[]>({
    query: postsQuery,
  });

  return <Post post={post} sanityPosts={sanityPosts} />;
};

export default PostPage;

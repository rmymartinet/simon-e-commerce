/* eslint-disable @typescript-eslint/no-explicit-any */
import { SanityDocument } from "@sanity/client";
import { postPathsQuery, postQuery, postsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import React from "react";
import Post from "../components/Post";

export async function generateStaticParams() {
  const posts = await client.fetch(postPathsQuery);
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

const PostPage = async ({
  params,
}: {
  params: { slug: string } | undefined;
}) => {
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

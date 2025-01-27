import React from "react";
import LatestPostsContainer from "./LatestPostsContainer";
import Posts from "./Posts";
import { SanityDocument } from "next-sanity";

function PostsContainer({ sanityPosts }: { sanityPosts: SanityDocument[] }) {
  const postsSlice = sanityPosts.slice(3);

  return (
    <>
      <LatestPostsContainer sanityPosts={sanityPosts} />
      <Posts posts={postsSlice} />
    </>
  );
}

export default PostsContainer;

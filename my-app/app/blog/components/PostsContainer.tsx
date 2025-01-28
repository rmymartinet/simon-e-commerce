import React from "react";
import LatestPostsContainer from "./LatestPostsContainer";
import Posts from "./Posts";
import { SanityDocument } from "next-sanity";

function PostsContainer({ sanityPosts }: { sanityPosts: SanityDocument[] }) {
  const postsSlice = sanityPosts.slice(3);

  return (
    <section className="flex flex-col gap-10">
      <LatestPostsContainer sanityPosts={sanityPosts} />
      <div>
        <div className="mb-10 mt-10 h-[2px] w-full bg-muted"></div>
        <Posts posts={postsSlice} />
      </div>
    </section>
  );
}

export default PostsContainer;

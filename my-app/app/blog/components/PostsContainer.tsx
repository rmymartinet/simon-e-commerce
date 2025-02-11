import React from "react";
import { SanityDocument } from "next-sanity";
import PostsContent from "./PostsContent";
import PostsHeader from "./PostsHeader";

function PostsContainer({ sanityPosts }: { sanityPosts: SanityDocument[] }) {
  return (
    <section>
      <PostsHeader />
      <PostsContent sanityPosts={sanityPosts} />
    </section>
  );
}

export default PostsContainer;

import React from "react";
import { SanityDocument } from "next-sanity";
import PostsContent from "./PostsContent";
import PostsHeader from "./PostsHeader";

interface PostsContainerProps {
  sanityPosts: SanityDocument[];
}

const PostsContainer: React.FC<PostsContainerProps> = ({ sanityPosts }) => {
  return (
    <section className="w-full max-w-7xl mx-auto">
      <PostsHeader />
      <PostsContent sanityPosts={sanityPosts} />
    </section>
  );
};

export default PostsContainer;

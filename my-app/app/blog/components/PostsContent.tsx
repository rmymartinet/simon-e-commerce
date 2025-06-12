"use client";

import React, { useState } from "react";
import { SanityDocument } from "next-sanity";
import FilterPosts from "./FilterPosts";
import Posts from "./Posts";

interface PostsContentProps {
  sanityPosts: SanityDocument[];
}

const PostsContent: React.FC<PostsContentProps> = ({ sanityPosts }) => {
  const [filter, setFilter] = useState("grid");
  const [filterByTag, setFilterByTag] = useState<string>("");
  const numberOfPosts = sanityPosts.length;

  const filteredPosts = filterByTag
    ? sanityPosts.filter((post) => post.tags.includes(filterByTag))
    : sanityPosts;

  return (
    <section>
      <FilterPosts
        sanityTags={sanityPosts}
        filter={filter}
        setFilter={setFilter}
        filterByTag={filterByTag}
        setFilterByTag={setFilterByTag}
      />
      <h3 className="mb-8 mt-10 text-2xl">
        Tous les articles ( {numberOfPosts} )
      </h3>
      <Posts posts={filteredPosts} filter={filter} />
    </section>
  );
};

export default PostsContent;

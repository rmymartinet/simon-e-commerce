"use client";

import React, { RefObject, useRef, useState } from "react";
import { SanityDocument } from "next-sanity";
import FilterPosts from "./FilterPosts";
import Posts from "./Posts";
import { useGSAP } from "@gsap/react";
import { animateBlockReveal } from "@/utils/Animation";

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

    const postsContainerRef = useRef<HTMLDivElement>(null);


    useGSAP(() => {
      if (postsContainerRef.current) {
        animateBlockReveal(postsContainerRef as RefObject<HTMLDivElement>, 0.5);
  
      }
    }, []);
  

  return (
    <section ref={postsContainerRef}>
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

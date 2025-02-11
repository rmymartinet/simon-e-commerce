"use client";

import React, { useRef, useState } from "react";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { textSplitLines } from "@/utils/common/textAnimation";
import { verticalDisplay } from "@/utils/common/moveYAxisEl";
import PostsCard from "./PostsCard";
import FilterPosts from "./FilterPosts";
import Posts from "./Posts";

gsap.registerPlugin(useGSAP);

function PostsContent({ sanityPosts }: { sanityPosts: SanityDocument[] }) {
  const [filter, setFilter] = useState("grid");
  const { width } = useWindowWidth();
  const sanityFilteredPosts = sanityPosts.slice(0, 3);
  const numberOfPosts = sanityPosts.length;
  const gridButtonRef = useRef<HTMLButtonElement>(null);
  const listButtonRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const totalArticleRef = useRef<HTMLParagraphElement>(null);
  const gridPostsContainerRef = useRef<HTMLDivElement>(null);

  const postsSlice = sanityPosts.slice(3);

  useGSAP(() => {
    const gridPostsContainerRefChildren =
      gridPostsContainerRef.current?.children;

    if (gridPostsContainerRefChildren) {
      gsap.from(gridPostsContainerRefChildren, {
        duration: 1,
        y: 100,
        opacity: 0,
        delay: 2,
        stagger: 0.1,
        ease: "power2.out",
      });
    }

    verticalDisplay(gridButtonRef as React.RefObject<HTMLElement>, 2, 100);
    verticalDisplay(listButtonRef as React.RefObject<HTMLElement>, 2, 100);
    textSplitLines(totalArticleRef as React.RefObject<HTMLElement>, 2);

    gsap.set(lineRef.current, {
      width: 0,
    });
    gsap.to(lineRef.current, {
      duration: 1,
      width: "100%",
      delay: 2,
      ease: "power2.out",
    });
  }, []);

  return (
    <>
      <FilterPosts filter={filter} setFilter={setFilter} />
      <div ref={lineRef} className="mb-10 mt-10 h-[2px] w-full bg-muted"></div>
      <h3 ref={totalArticleRef} className="mb-8 text-2xl">
        Tous les articles ( {numberOfPosts} )
      </h3>
      <div className="mb-10">
        <span>Les 3 derniers articles :</span>
      </div>
      {filter === "grid" && (
        <div
          ref={gridPostsContainerRef}
          className="flex flex-col gap-20 lg:grid lg:grid-cols-3 lg:gap-10"
        >
          <PostsCard sanityPosts={sanityPosts[0]} />
          <PostsCard sanityPosts={sanityPosts[1]} />
          <PostsCard sanityPosts={sanityPosts[2]} />
        </div>
      )}
      {filter === "list" && (
        <div className="mb-4 flex w-full flex-col">
          {sanityFilteredPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="items-center gap-10 border-b py-6 lg:grid lg:grid-cols-coachingNutrition lg:py-10"
            >
              {width > 1024 && (
                <div className="grid h-max w-40 place-content-center rounded-full border border-white py-2 text-sm">
                  {post.tags}
                </div>
              )}
              <h2 className="overflow-hidden text-ellipsis whitespace-normal break-words break-all lg:text-2xl">
                {post.title}
              </h2>
              <span className="text-black">{post._createdAt}</span>
            </Link>
          ))}
        </div>
      )}
      {width > 1024 && filter !== "list" && (
        <div className="mb-10 mt-10 h-[2px] w-full bg-muted"></div>
      )}
      <Posts posts={postsSlice} filter={filter} />
    </>
  );
}

export default PostsContent;

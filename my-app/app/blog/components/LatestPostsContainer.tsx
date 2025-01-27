"use client";

import React, { useRef, useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Images from "next/image";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { textSplitLines } from "@/utils/common/textAnimation";
import { verticalDisplay } from "@/utils/common/moveYAxisEl";

gsap.registerPlugin(useGSAP);

function LatestPostsContainer({
  sanityPosts,
}: {
  sanityPosts: SanityDocument[];
}) {
  const builder = imageUrlBuilder(client);
  const [filter, setFilter] = useState("grid");
  const { width } = useWindowWidth();
  const sanityFilteredPosts = sanityPosts.slice(0, 3);
  const numberOfPosts = sanityPosts.length;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridButtonRef = useRef<HTMLButtonElement>(null);
  const listButtonRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const totalArticleRef = useRef<HTMLParagraphElement>(null);
  const gridPostsContainerRef = useRef<HTMLDivElement>(null);

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

    verticalDisplay(titleRef as React.RefObject<HTMLElement>, 2);
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
      <div className="overflow-hidden pb-2">
        <h1 ref={titleRef} className="text-4xl lg:text-9xl">
          Blog
        </h1>
      </div>
      <div className="mt-[18vh] flex gap-4 overflow-hidden">
        <button
          ref={gridButtonRef}
          onClick={() => setFilter("grid")}
          className={`rounded-full border border-white px-8 py-2 text-sm ${filter === "grid" ? "bg-white text-black" : ""} transition-all duration-150 ease-linear`}
        >
          Grid
        </button>
        <button
          ref={listButtonRef}
          onClick={() => setFilter("list")}
          className={`rounded-full border border-white px-8 py-2 text-sm ${filter === "list" ? "bg-white text-black" : ""} transition-all duration-150 ease-linear`}
        >
          List
        </button>
      </div>
      <div ref={lineRef} className="mb-10 mt-10 h-[2px] w-full bg-muted"></div>
      <h3 ref={totalArticleRef} className="mb-8 text-2xl">
        Tous les articles ( {numberOfPosts} )
      </h3>
      {filter === "grid" && (
        <div
          ref={gridPostsContainerRef}
          className="mb-4 flex w-full flex-col lg:mb-[20vh] lg:flex-row"
        >
          <div className="h-1/2 w-full border-2 border-red-400">
            {sanityPosts[0] && (
              <Images
                src={builder.image(sanityPosts[0].mainImage).url()}
                alt=""
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            )}
            <div className="flex justify-between">
              <div className="mt-10 flex flex-col gap-10">
                <div className="w-max rounded-full border border-black px-8 py-2 text-sm">
                  {sanityPosts[0].tags}
                </div>
                <h2 className="text-4xl">{sanityPosts[0].title}</h2>
              </div>
              <span className="text-black">{sanityPosts[0]._createdAt}</span>
            </div>
          </div>
          <div className="ml-6 mr-6 h-full w-[2px] bg-red-400"></div>
          <div className="mt-4 lg:mt-0 lg:w-2/3">
            <div className="w-full border-2 border-red-400">
              {sanityPosts[0] && (
                <Images
                  src={builder.image(sanityPosts[0].mainImage).url()}
                  alt=""
                  width={500}
                  height={500}
                  quality={100}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="flex justify-between">
                <div className="mt-10 flex flex-col gap-10">
                  <div className="w-max rounded-full border border-black px-8 py-2 text-sm">
                    {sanityPosts[0].tags}
                  </div>
                  <h2 className="text-4xl">{sanityPosts[0].title}</h2>
                </div>
                <span className="text-black">{sanityPosts[0]._createdAt}</span>
              </div>
            </div>
            <div className="mt-6 w-full border-2 border-red-400">
              {sanityPosts[0] && (
                <Images
                  src={builder.image(sanityPosts[0].mainImage).url()}
                  alt=""
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="flex justify-between">
                <div className="mt-10 flex flex-col gap-10">
                  <div className="w-max rounded-full border border-black px-8 py-2 text-sm">
                    {sanityPosts[0].tags}
                  </div>
                  <h2 className="text-4xl">{sanityPosts[0].title}</h2>
                </div>
                <span className="text-black">{sanityPosts[0]._createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {filter === "list" && (
        <div className="mb-4 flex w-full flex-col lg:mb-[20vh]">
          {sanityFilteredPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="grid grid-cols-coachingNutrition gap-10 border-b py-10"
            >
              {width > 1024 && (
                <div className="grid h-max w-40 place-content-center rounded-full border border-white py-2 text-sm">
                  {post.tags}
                </div>
              )}
              <h2 className="lg:text-4xl">{post.title}</h2>
              <span className="text-black">{post._createdAt}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default LatestPostsContainer;

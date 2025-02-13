"use client";

import React, { useEffect, useRef, useState } from "react";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PostsCard from "./PostsCard";
import FilterPosts from "./FilterPosts";
import Posts from "./Posts";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

gsap.registerPlugin(useGSAP);

function PostsContent({ sanityPosts }: { sanityPosts: SanityDocument[] }) {
  const [filter, setFilter] = useState("grid");
  const [filterByTag, setFilterByTag] = useState<string>("");
  const [isHover, setIsHover] = useState<number | null>(null);
  const { width } = useWindowWidth();
  const numberOfPosts = sanityPosts.length;
  const gridPostsContainerRef = useRef<HTMLDivElement | null>(null);
  const listImgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const builder = imageUrlBuilder(client);

  useEffect(() => {
    listImgRefs.current = sanityPosts.map(() => null);
  }, [sanityPosts]);

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
  }, [gridPostsContainerRef]);

  useGSAP(() => {
    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      gsap.to(listImgRefs.current, {
        x: clientX + 100,
        y: clientY - 400,
        delay: 0.05,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const updateImageVisibility = (index: number | null) => {
    gsap.to(listImgRefs.current, { opacity: 0, duration: 0.1 });

    if (index !== null && listImgRefs.current[index]) {
      gsap.to(listImgRefs.current[index], {
        duration: 0.2,
        opacity: 1,
        ease: "power2.out",
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!listImgRefs.current[index]) return;

    setIsHover(index);

    if (index !== isHover) {
      requestAnimationFrame(() => updateImageVisibility(index));
    }
  };

  const handleMouseLeave = () => {
    setIsHover(null);
    requestAnimationFrame(() => updateImageVisibility(null));
  };

  return (
    <>
      <FilterPosts
        sanityTags={sanityPosts}
        filter={filter}
        setFilter={setFilter}
        filterByTag={filterByTag}
        setFilterByTag={setFilterByTag}
      />
      <h3 className="mb-8 mt-10 text-2xl">
        Tous les articles ({numberOfPosts})
      </h3>
      {filter === "grid" && filterByTag === "" && (
        <div className="flex flex-col">
          <div
            ref={gridPostsContainerRef}
            className="flex flex-col gap-20 lg:grid lg:grid-cols-3 lg:gap-10"
          >
            <PostsCard sanityPosts={sanityPosts[0]} />
            <PostsCard sanityPosts={sanityPosts[1]} />
            <PostsCard sanityPosts={sanityPosts[2]} />
          </div>
          {width > 1024 && (
            <div className="mb-10 mt-10 h-[2px] w-full bg-muted"></div>
          )}
          <Posts posts={sanityPosts.slice(3)} filter={filter} />
        </div>
      )}
      {filter === "grid" && filterByTag !== "" && (
        <div className="flex flex-col gap-20 lg:flex lg:flex-wrap lg:gap-10">
          <Posts
            posts={sanityPosts.filter((post) =>
              post.tags.includes(filterByTag as string),
            )}
            filter={filter}
          />
        </div>
      )}
      {filter === "list" && filterByTag === "" && (
        <div className="relative mb-4 flex w-full flex-col">
          {sanityPosts.map((post, index) => (
            <React.Fragment key={post._id}>
              <Link
                href={`/blog/${post.slug.current}`}
                className="items-center gap-10 border-b py-6 lg:grid lg:grid-cols-coachingNutrition lg:py-10"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
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

              <div
                ref={(el) => {
                  listImgRefs.current[index] = el;
                }}
                className="absolute left-0 top-0 h-[20vh] w-[15vw] overflow-hidden opacity-0"
              >
                <Image
                  src={builder.image(post.mainImage).url()}
                  alt=""
                  width={1000}
                  height={1000}
                  quality={100}
                  className="h-full w-full object-cover"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
      {filter === "list" && filterByTag !== "" && (
        <div className="relative mb-4 flex w-full flex-col">
          {sanityPosts
            .filter((post) => post.tags.includes(filterByTag as string))
            .map((post, index) => (
              <React.Fragment key={post._id}>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="items-center gap-10 border-b py-6 lg:grid lg:grid-cols-coachingNutrition lg:py-10"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="mb-4 grid h-max w-max place-content-center rounded-full border border-white px-4 py-1 text-sm lg:mb-0 lg:w-40 lg:px-0 lg:py-2">
                    {post.tags}
                  </div>
                  <h2 className="overflow-hidden text-ellipsis whitespace-normal break-words break-all lg:text-2xl">
                    {post.title}
                  </h2>
                  <span className="text-black">{post._updatedAt}</span>
                </Link>
                <div
                  ref={(el) => {
                    listImgRefs.current[index] = el;
                  }}
                  className="absolute left-0 top-0 h-[20vh] w-[15vw] overflow-hidden opacity-0"
                >
                  <Image
                    src={builder.image(post.mainImage).url()}
                    alt=""
                    width={1000}
                    height={1000}
                    quality={100}
                    className="h-full w-full object-cover"
                  />
                </div>
              </React.Fragment>
            ))}
        </div>
      )}
    </>
  );
}

export default PostsContent;

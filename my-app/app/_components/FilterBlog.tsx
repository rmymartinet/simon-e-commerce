"use client";

import { useRef } from "react";
import gsap from "gsap";
import { FilterBlogProps } from "@/types/types";

const FilterBlog = ({
  posts,
  setFilteredPosts,
  clickedIndex,
  setClickedIndex,
}: FilterBlogProps) => {
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleFilter = (tag: string, index: number) => {
    setFilteredPosts(tag);
    setClickedIndex(index);
  };

  const handleHover = (index: number, isEntering: boolean) => {
    const element = bgRefs.current[index];
    const textEl = textRefs.current[index];

    if (!element || index === clickedIndex) return;

    gsap.to(element, {
      height: isEntering ? "100%" : 0,
      duration: 0.5,
      ease: "power2.out",
    });

    const tl = gsap.timeline();

    tl.to(textEl, {
      y: isEntering ? -50 : 0,
      duration: 0.3,
      ease: "power3.inOut",
    });
    tl.set(textEl, {
      y: isEntering ? 50 : 0,
    });

    tl.to(textEl, {
      y: 0,
      duration: 0.3,
      ease: "power2.Out",
    });
  };

  return (
    <div className="flex gap-2">
      <div
        onClick={() => handleFilter("", 0)}
        onMouseEnter={() => handleHover(0, true)}
        onMouseLeave={() => handleHover(0, false)}
        className={`relative cursor-pointer overflow-hidden text-white ${
          clickedIndex === 0
            ? "bg-button-gradient font-bold"
            : "card font-medium text-black shadow-inner"
        } padding rounded-full`}
      >
        <div
          ref={(el) => {
            bgRefs.current[0] = el;
          }}
          className="bg-button absolute bottom-0 left-0 -z-10 h-0 w-full origin-bottom"
        />
        <p
          ref={(el) => {
            textRefs.current[0] = el;
          }}
          className="z-50"
        >
          Tout
        </p>
      </div>

      {/* Boutons pour les tags */}
      {[...new Set(posts.flatMap((post) => post.tags))].map((tag, index) => (
        <div
          key={index + 1}
          onClick={() => handleFilter(tag, index + 1)}
          onMouseEnter={() => handleHover(index + 1, true)}
          onMouseLeave={() => handleHover(index + 1, false)}
          className={`relative cursor-pointer overflow-hidden text-white ${
            clickedIndex === index + 1
              ? "bg-button-gradient font-bold"
              : "card font-medium text-black shadow-inner"
          } padding rounded-full`}
        >
          <div
            ref={(el) => {
              bgRefs.current[index + 1] = el;
            }}
            className="bg-button absolute bottom-0 left-0 -z-10 h-0 w-full origin-bottom"
          />
          <p
            ref={(el) => {
              textRefs.current[index + 1] = el;
            }}
            className="z-50"
          >
            {tag}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FilterBlog;

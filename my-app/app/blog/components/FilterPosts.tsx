import { SanityDocument } from "next-sanity";
import React, { useMemo, useRef } from "react";

function FilterPosts({
  sanityTags,
  filter,
  setFilter,
  filterByTag,
  setFilterByTag,
}: {
  sanityTags: SanityDocument[];
  filter: string;
  setFilter: (filter: string) => void;
  filterByTag: string;
  setFilterByTag: (filterByTag: string) => void;
}) {
  const gridButtonRef = useRef<HTMLButtonElement>(null);
  const listButtonRef = useRef<HTMLButtonElement>(null);

  const uniqueTags = useMemo(() => {
    return Array.from(new Set(sanityTags.flatMap((tag) => tag.tags)));
  }, [sanityTags]);

  return (
    <div className="mt-[18vh] flex flex-col justify-between gap-8 overflow-hidden lg:flex-row lg:gap-0">
      <div className="flex gap-4">
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
      <div className="flex gap-4">
        <button
          onClick={() => setFilterByTag("")}
          className={`rounded-full border border-white px-4 py-2 text-sm ${filterByTag === "" ? "bg-white text-black" : ""} transition-all duration-150 ease-linear`}
        >
          Tous
        </button>
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterByTag(tag)}
            className={`rounded-full border border-white px-4 py-2 text-sm ${filterByTag === tag ? "bg-white text-black" : ""} transition-all duration-150 ease-linear`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterPosts;

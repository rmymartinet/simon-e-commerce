import React, { useRef } from "react";

function FilterPosts({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) {
  const gridButtonRef = useRef<HTMLButtonElement>(null);
  const listButtonRef = useRef<HTMLButtonElement>(null);

  return (
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
  );
}

export default FilterPosts;

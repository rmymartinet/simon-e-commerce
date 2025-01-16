"use client";

import { useState, useEffect } from "react";

type Heading = {
  text: string;
  level: string;
  id: string;
};

type Blocks = {
  _type: "block";
  _key: string;
  style: string;
  children: {
    _type: string;
    text: string;
    marks?: string[];
  }[];
}[];

const extractHeadings = (blocks: Blocks) => {
  const headings: Heading[] = [];
  blocks.forEach((block) => {
    if (
      block._type === "block" &&
      (block.style === "h1" || block.style === "h2" || block.style === "h3")
    ) {
      headings.push({
        text: block.children.map((child) => child.text).join(""),
        level: block.style,
        id: block._key, // Utilisez l'_key comme id unique
      });
    }
  });
  return headings;
};

export const TableOfContents = ({
  blocks,
  minutesToRead,
}: {
  blocks: Blocks;
  minutesToRead: number;
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    setHeadings(extractHeadings(blocks));
  }, [blocks]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="toc rounded-3xl border border-slate-400 p-4">
      <ul className="flex flex-col gap-2">
        <h3 className="mb-6 text-2xl">Table des matières</h3>
        {headings.map((heading, index) => (
          <li key={heading.id} className={`toc-${heading.level} `}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(heading.id);
              }}
            >
              {index + 1}. {heading.text}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-lg font-medium">
        {minutesToRead} minutes de lecture
      </p>
    </nav>
  );
};

"use client";

import { useEffect, useRef, useState } from "react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useWindowWidth from "@/app/hooks/useWindowWidth";

gsap.registerPlugin(ScrollTrigger);

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

const extractHeadings = (blocks) => {
  const headings = [];
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

const TableOfContents = ({ headings }) => {
  const handleClick = (id) => {
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
          <li
            key={heading.id}
            className={`toc-${heading.level} text-slate-400`}
          >
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
    </nav>
  );
};

const components = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value)?.url();
      return imageUrl ? (
        <div className="w-[100%]">
          <Image
            src={imageUrl}
            alt={value.alt || "Image"}
            className="h-full w-full rounded-2xl object-cover"
            width={1000}
            height={1000}
            quality={100}
          />
        </div>
      ) : null;
    },
  },
  block: {
    h1: ({ children, node }) => <h1 id={node._key}>{children}</h1>,
    h2: ({ children, node }) => <h2 id={node._key}>{children}</h2>,
    h3: ({ children, node }) => <h3 id={node._key}>{children}</h3>,
  },
};

export default function PostPage({ params }) {
  const containerRef = useRef(null);
  const readLineRef = useRef(null);
  const { width } = useWindowWidth();
  const [post, setPost] = useState(null);
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await client.fetch(POST_QUERY, params, options);
      const postImageUrl = post.image
        ? urlFor(post.image)?.width(2000).height(2000).url()
        : null;

      setPost(post);
      setPostImageUrl(postImageUrl);
      setHeadings(extractHeadings(post.body));
    };

    fetchPost();
  }, [params]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (readLineRef.current && containerRef.current) {
        const animation = gsap.fromTo(
          readLineRef.current,
          { width: "0%" },
          {
            width: "100%",
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top center",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );

        return () => {
          animation.kill();
        };
      }
    }, 500);

    return () => clearTimeout(timeOut);
  }, [readLineRef, containerRef]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main className="mt-40 flex min-h-screen flex-col gap-4">
      <Link href="/blog" className="mb-10">
        <div className="flex w-max items-center gap-2 rounded-full bg-button py-1 pl-1 pr-3 text-white">
          <div className="rounded-full bg-white p-1">
            <IoIosArrowRoundBack size={20} color="black" />
          </div>
          <p className="font-semibold">Retour au blog</p>
        </div>
      </Link>
      <div className="mb-16 flex flex-col gap-7">
        <div className="flex flex-col justify-between gap-20">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-bold">{post.title}</h1>
              <p>
                Published: {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="max-w-xl text-pretty break-words text-lg">
              <p>{post.resume}</p>
            </div>
          </div>
          {postImageUrl && (
            <div className="h-[50vh]">
              <Image
                src={postImageUrl}
                alt={post.title}
                className="h-full w-full rounded-3xl object-cover"
                width={2000}
                height={2000}
                quality={100}
              />
            </div>
          )}
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex flex-col-reverse items-center gap-20 pl-20 pr-10 lg:grid lg:grid-cols-blogCustom lg:items-start"
      >
        <div className="prose flex flex-col items-center">
          <div className="w-full">
            {Array.isArray(post.body) && (
              <PortableText value={post.body} components={components} />
            )}
          </div>
        </div>
        <div className="top-40 flex w-max flex-col items-center gap-10 lg:sticky">
          <TableOfContents headings={headings} />
          {width > 1024 && (
            <div className="flex w-full flex-col items-center gap-4">
              <div className="h-[5px] w-full overflow-hidden rounded-lg bg-[#d1d1d150]">
                <div
                  ref={readLineRef}
                  className="h-full w-full origin-left bg-blue-500"
                ></div>
              </div>
              <div className="flex items-center gap-4">
                <IoMdTime size={24} />
                <p className="text-lg font-medium">
                  {post.minutesToRead} minutes de lecture
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowRoundBack } from "react-icons/io";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PortableTextReactComponents,
  PortableTextComponentProps,
} from "@portabletext/react";

gsap.registerPlugin(ScrollTrigger);

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
const { projectId, dataset } = client.config();

type SanityImageSource = {
  _type: "image";
  asset: {
    _ref: string; // Référence unique de l'image dans Sanity
    _type: "reference";
  };
  alt?: string; // Optionnel : texte alternatif pour l'image
};
type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: string;
  children: {
    _type: string;
    text: string;
    marks?: string[];
  }[];
};

type Blocks = PortableTextBlock[];

type Heading = {
  text: string; // Le texte du titre (ex. "Introduction")
  level: string; // Le niveau du titre (ex. "h1", "h2", "h3")
  id: string; // L'ID unique utilisé pour le DOM (souvent basé sur _key)
};

type Headings = Heading[];

interface Params {
  slug: string;
}

interface Post {
  title: string;
  publishedAt: string;
  resume: string;
  body: Blocks;
  image?: SanityImageSource;
  minutesToRead: number;
}

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

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

const TableOfContents = ({ headings }: { headings: Headings }) => {
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
    </nav>
  );
};
const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => {
      const imageUrl = urlFor(value)?.url();
      return imageUrl ? (
        <Image
          src={imageUrl}
          alt={value.alt || "Image"}
          className="h-full w-full rounded-2xl object-cover"
          width={1000}
          height={1000}
          quality={100}
        />
      ) : null;
    },
  },
  block: {
    h1: ({ children }: PortableTextComponentProps<unknown>) => (
      <h1 className="text-2xl font-bold text-violet-500">{children}</h1>
    ),
    h2: ({ children }: PortableTextComponentProps<unknown>) => (
      <h2 className="text-xl font-bold text-white">{children}</h2>
    ),
    h3: ({ children }: PortableTextComponentProps<unknown>) => (
      <h3 className="text-lg font-bold text-white">{children}</h3>
    ),
    strong: ({ children }: PortableTextComponentProps<unknown>) => (
      <strong className="text-white">{children}</strong>
    ),
    span: ({ children }: PortableTextComponentProps<unknown>) => (
      <span className="text-white">{children}</span>
    ),
  },
};

export default function PostPage({ params }: { params: Params }) {
  const containerRef = useRef(null);
  const readLineRef = useRef(null);

  const [post, setPost] = useState<Post | null>(null);
  const [postImageUrl, setPostImageUrl] = useState<string | null | undefined>(
    null,
  );
  const [headings, setHeadings] = useState<Heading[]>([]);

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
    <main className="mt-40 flex min-h-screen w-screen flex-col gap-4 overflow-hidden">
      <Link href="/blog" className="mb-10">
        <div className="bg-button flex w-max items-center gap-2 rounded-full py-1 pl-1 pr-3 text-white">
          <div className="rounded-full bg-white p-1">
            <IoIosArrowRoundBack size={20} color="black" />
          </div>
          <p className="font-semibold">Retour au blog</p>
        </div>
      </Link>
      <div className="mb-16 flex flex-col gap-7">
        <div className="flex flex-col justify-between gap-20 border-2 border-red-400">
          <div className="flex w-full flex-col items-center justify-between lg:flex-row lg:items-start">
            <div className="flex flex-col gap-4 px-10">
              <h1 className="text-4xl font-bold md:text-5xl">{post.title}</h1>
              <p>
                Published: {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-10 max-w-xl text-pretty break-words text-center text-lg md:text-start">
              <p>{post.resume}</p>
            </div>
          </div>
          {postImageUrl && (
            <Image
              src={postImageUrl}
              alt={post.title}
              className="h-full w-full rounded-3xl object-cover"
              width={2000}
              height={2000}
              quality={100}
            />
          )}
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex flex-col-reverse items-center gap-20"
      >
        <div className="prose flex w-screen flex-col items-center text-white">
          <div className="prose flex w-full max-w-5xl flex-col items-center text-white">
            <div className="w-full overflow-hidden px-4">
              {Array.isArray(post.body) && (
                <PortableText value={post.body} components={components} />
              )}
            </div>
          </div>
        </div>
        <div className="top-40 flex flex-col items-center gap-10 md:w-max">
          <TableOfContents headings={headings} />
          <p className="text-lg font-medium">
            {post.minutesToRead} minutes de lecture
          </p>
        </div>
      </div>
    </main>
  );
}

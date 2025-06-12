"use client";

import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { SanityDocument } from "@sanity/client";
import {  useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { textSplitLines } from "@/utils/common/textAnimation";


gsap.registerPlugin(ScrollTrigger, useGSAP);

const builder = imageUrlBuilder(client);

const Post = ({ post }: { post: SanityDocument }) => {
  const mainRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    textSplitLines(titleRef as unknown as React.RefObject<HTMLElement>);
    const ctx = gsap.context(() => {
      // Animation du titre
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Animation de l'image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
          }
        );
      }

      // Animation du contenu
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const myPortableTextComponents: Partial<PortableTextReactComponents> = {
    marks: {
      textColor: ({ children, value }) => (
        <strong
          style={{
            color: value?.value,
          }}
        >
          {children}
        </strong>
      ),
      highlightColor: ({ children, value }) => (
        <span
          style={{
            background: value?.value,
            padding: "2px 4px",
            borderRadius: "4px",
          }}
        >
          {children}
        </span>
      ),
    },
    types: {
      image: ({ value }) => (
        <div className="my-8 overflow-hidden rounded-lg">
          <Image
            src={builder.image(value).url()}
            alt={value.alt || "Image"}
            width={1000}
            height={1000}
            quality={100}
            className="transition-transform duration-300 hover:scale-105"
            style={{ objectFit: "cover" }}
          />
        </div>
      ),
    },
  };

  return (
    <main ref={mainRef} className="container mx-auto mt-20 flex flex-col items-center px-4 py-8 md:mt-32 md:py-16">
      <div className="mb-8 flex w-full  flex-col gap-4 self-start">
        <h1 ref={titleRef} className="text-3xl font-bold text-white md:text-5xl">
          {post.title}
        </h1>
        <span className="text-gray-400">{formattedDate}</span>
      </div>

      {post?.mainImage && (
        <div ref={imageRef} className="mb-12 w-full max-w-4xl overflow-hidden rounded-xl">
          <Image
            src={builder.image(post.mainImage).url()}
            alt={post.title}
            width={2000}
            height={1000}
            quality={100}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
      )}

      <section ref={contentRef} className="prose-custom prose prose-lg w-full max-w-4xl md:prose-xl">
        {post?.body && (
          <div className="text-white">
            <PortableText
              value={post.body}
              components={myPortableTextComponents}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default Post;

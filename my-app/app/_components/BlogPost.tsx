import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/types";
import { urlFor } from "@/sanity/lib/image";

const BlogPost = ({
  posts,
  clickedIndex,
}: {
  posts: Post[];
  clickedIndex: number;
}) => {
  const postsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [isHoverIndex, setIsHoverIndex] = useState<number | null>(null);
  const [isHover, setIsHover] = useState(false);
  const imgRef = useRef<(HTMLImageElement | null)[]>([]);
  const [animationKey, setAnimationKey] = useState(0); // Clé pour forcer l'animation

  const handleIndex = (index: number) => {
    setIsHoverIndex(index);
    setIsHover(true);
  };

  // Déclenchement des animations au survol
  useEffect(() => {
    imgRef.current.forEach((post, index) => {
      if (!post) return;

      const isCurrentHover = isHoverIndex === index && isHover;
      const isOtherHover = isHoverIndex !== index && isHover;

      gsap.to(post, {
        scale: isCurrentHover ? 1.1 : 1,
        rotate: isCurrentHover ? -2 : 0,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(postsRef.current[index], {
        opacity: isCurrentHover ? 1 : isOtherHover ? 0.5 : 1,
        filter: isOtherHover ? "brightness(0.4)" : "brightness(1)",
      });
    });
  }, [isHoverIndex, isHover]);

  // Animation sur changement de clickedIndex
  useEffect(() => {
    if (clickedIndex !== null) {
      // Incrémentez la clé pour forcer l'animation
      setAnimationKey((prev) => prev + 1);
    }

    console.log("clickedIndex", clickedIndex);
  }, [clickedIndex]);

  // Gestion des animations basées sur la clé
  useEffect(() => {
    postsRef.current.forEach((post, index) => {
      if (!post) return;

      // Stopper toute animation existante pour éviter les conflits
      gsap.killTweensOf(post);

      // Animation avec GSAP
      gsap.fromTo(
        post,
        { y: 200, opacity: 0 },
        {
          delay: index * 0.05,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
      );
    });
  }, [animationKey]);

  return (
    <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 lg:px-0">
      {posts.map((post, index) => (
        <li
          className="rounded-3xl p-10"
          key={post._id}
          onMouseEnter={() => handleIndex(index)}
          onMouseLeave={() => {
            setIsHoverIndex(null);
            setIsHover(false);
          }}
          ref={(el) => {
            postsRef.current[index] = el;
          }}
        >
          <Link
            href={`/blog/${post.slug.current}`}
            className="flex flex-col gap-4"
          >
            <div className="h-[20vh] overflow-hidden rounded-3xl">
              <Image
                ref={(el) => {
                  imgRef.current[index] = el;
                }}
                src={urlFor(post.image).url()}
                alt=""
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="w-max rounded-full bg-black px-2 py-1 text-white">
              {post.tags}
            </span>
            <h2 className="text-2xl">{post.title}</h2>
            <p className="break-words text-slate-400">{post.teaser}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BlogPost;

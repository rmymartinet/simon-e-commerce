"use client";

import { useEffect, useState } from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import BlogPost from "../_components/BlogPost";
import FilterBlog from "../_components/FilterBlog";
import { Post } from "@/types/types";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, image, slug, publishedAt, teaser, tags}`;

export default function IndexPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState<string>("");
  const [clickedIndex, setClickedIndex] = useState<number>(0);

  const options = { next: { revalidate: 30 } }; // Définissez les options ici

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await client.fetch(POSTS_QUERY, {}, options);

      // Transformer en Post[]
      const formattedPosts: Post[] = result.map((doc: SanityDocument) => ({
        ...doc, // Copier toutes les propriétés existantes
        tags: doc.tags || [], // Ajouter tags par défaut si manquant
      }));

      setPosts(formattedPosts);
      setItems(formattedPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredItems = () => {
      if (filteredPosts.length === 0) {
        setItems(posts);
      } else {
        const filtered = posts.filter((post) =>
          post.tags.includes(filteredPosts),
        );
        setItems(filtered);
      }
    };

    filteredItems();
  }, [filteredPosts, posts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto mt-40 flex min-h-screen flex-col items-center">
      <div className="mb-40 flex flex-col items-center gap-4 text-center">
        <h1 className="text-6xl font-semibold">
          Explorez mon univers : musculation, nutrition et inspiration
        </h1>
      </div>
      <div className="lg:self-start">
        <FilterBlog
          posts={posts}
          filteredPosts={filteredPosts}
          setFilteredPosts={setFilteredPosts}
          clickedIndex={clickedIndex}
          setClickedIndex={setClickedIndex}
        />
      </div>
      <BlogPost posts={items} clickedIndex={clickedIndex} />
    </main>
  );
}

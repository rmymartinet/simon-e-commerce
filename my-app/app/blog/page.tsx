import { SanityDocument } from "@sanity/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsQuery } from "@/sanity/lib/queries";
import PostsContainer from "./components/PostsContainer";

export default async function Page() {
  const sanityPosts = await sanityFetch<SanityDocument[]>({
    query: postsQuery,
  });

  return (
    <main className="flex min-h-screen flex-col px-4 pt-[30vh]">
      <PostsContainer sanityPosts={sanityPosts} />
    </main>
  );
}

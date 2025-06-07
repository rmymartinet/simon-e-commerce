// app/blog/[slug]/page.tsx
import { SanityDocument } from "@sanity/client";
import { postQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import Post from "../components/Post";

export const dynamic = "force-static"; // ← important

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>; // tu gardes ta structure
}) {
  const { slug } = await params; // mais tu l'await en-dehors du rendu
  return <PostPageContent slug={slug} />;
}

async function PostPageContent({ slug }: { slug: string }) {
  const post = await sanityFetch<SanityDocument>({
    query: postQuery,
    params: { slug },
  });

  if (!post) return <div>❌ Article non trouvé</div>;

  return <Post post={post} />;
}

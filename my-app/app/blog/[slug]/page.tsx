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

// import { sanityFetch } from "@/sanity/lib/fetch";
// import { postQuery } from "@/sanity/lib/queries";
// import { SanityDocument } from "@sanity/client";

// export const dynamic = "force-static"; // 👈 IMPORTANT : force un rendu statique

// export default async function PostPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const post = await sanityFetch<SanityDocument | null>({
//     query: postQuery,
//     params: { slug: (await params).slug },
//   });

//   if (!post) {
//     return <div>❌ Article non trouvé</div>;
//   }

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>{post.title}</h1>
//       <p>Slug : {(await params).slug}</p>
//       <p>
//         Publié le : {new Date(post.publishedAt).toLocaleDateString("fr-FR")}
//       </p>
//     </div>
//   );
// }

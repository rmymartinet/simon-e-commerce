import { SanityDocument } from "@sanity/client";
import { postQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import Post from "../components/Post";
import { Suspense } from "react";
import Loading from "@/components/Loading";


export const dynamic = "force-static";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PostPageContent slug={slug} />;
}

async function PostPageContent({ slug }: { slug: string }) {
  const post = await sanityFetch<SanityDocument>({
    query: postQuery,
    params: { slug },
  });

  if (!post) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Article non trouvé
        </h2>
        <p className="text-gray-400">
          L&apos;article que vous recherchez n&apos;existe pas ou a été supprimé.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Post post={post} />
    </Suspense>
  );
}

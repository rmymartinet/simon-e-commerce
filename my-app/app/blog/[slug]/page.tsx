import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { TableOfContents } from "../components/TableOfContent";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export const generateStaticParams = async () => {
  const posts = await client.fetch(`*[_type == "post"]{slug}`);
  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch(POST_QUERY, { slug });
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(2000).height(2000).url()
    : null;

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
        <div className="flex flex-col justify-between gap-20">
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
      <div className="flex flex-col-reverse items-center gap-20">
        <div className="prose flex w-screen flex-col items-center text-white">
          <div className="prose flex w-full max-w-5xl flex-col items-center text-white">
            <div className="w-full overflow-hidden px-4">
              <PortableText value={post.body} />
            </div>
          </div>
        </div>
        {/* Composant client pour le Table of Contents */}
        <TableOfContents
          blocks={post.body}
          minutesToRead={post.minutesToRead}
        />
      </div>
    </main>
  );
}

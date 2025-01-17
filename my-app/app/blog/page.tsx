import { SanityDocument } from "@sanity/client";
import Posts from "./components/Posts";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsQuery } from "@/sanity/lib/queries";
export default async function Page() {
  // const [filteredPosts, setFilteredPosts] = useState<string>("");
  // const [clickedIndex, setClickedIndex] = useState<number>(0);
  // const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   fetchPosts();
  // }, [fetchPosts]);

  // useEffect(() => {
  //   const filteredItems = () => {
  //     if (filteredPosts.length === 0) {
  //       setPosts(posts);
  //     } else {
  //       const filtered = posts.filter((post) =>
  //         post.tags.includes(filteredPosts),
  //       );
  //       setPosts(filtered);
  //     }
  //   };

  //   filteredItems();
  // }, [filteredPosts, posts]);

  const sanityPosts = await sanityFetch<SanityDocument[]>({
    query: postsQuery,
  });

  return (
    <main className="container mx-auto mt-40 flex min-h-screen flex-col items-center">
      <div className="mb-40 flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-semibold md:text-6xl">
          Explorez mon univers : musculation, nutrition et inspiration
        </h1>
      </div>
      <div className="lg:self-start">
        {/* <FilterBlog
          // posts={posts}
          filteredPosts={filteredPosts}
          setFilteredPosts={setFilteredPosts}
          clickedIndex={clickedIndex}
          setClickedIndex={setClickedIndex}
        /> */}
      </div>
      <Posts posts={sanityPosts} />
    </main>
  );
}

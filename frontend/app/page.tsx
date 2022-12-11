import { Footer, Navbar } from "@components/common";
import { cookies } from "next/headers";
import { Post } from "@components/home";
import styles from "@styles/components/home/styles.module.scss";
import services from "@services";
import { IPost } from "@Types/";
import { redirect } from "next/navigation";

export default async function HomePage({ searchParams: { category } }: any) {
  const posts = await getAllPostsSS(category);

  return (
    <>
      <Navbar />
      <main className={`${styles.feed} container`}>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </main>
      <Footer />
    </>
  );
}

async function getAllPostsSS(category: any) {
  const token = cookies().get("accessToken")?.value;
  if (!token) redirect("/auth/login");

  try {
    const response = await services.getAllPosts(category, token);
    if (response.status !== 200) redirect("/auth/login");

    return response.data.posts;
  } catch {
    return [] as IPost[];
  }
}

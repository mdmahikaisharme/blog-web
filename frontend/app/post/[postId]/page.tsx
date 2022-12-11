import { cookies } from "next/headers";
import { Footer, Navbar } from "@components/common";
import { Post, Suggestion } from "@components/post";
import services from "@services";
import styles from "@styles/components/post/styles.module.scss";
import { redirect } from "next/navigation";
import { IPost } from "@Types/";

export default async function PostPage({ params: { postId } }: any) {
  const post = await getPostSSR(postId);
  const user = await getUserSSR();
  const suggestions = await getSuggestionSSR(post.category);

  return (
    <>
      <Navbar />
      <main className={`${styles.postPage} container`}>
        <div className={styles.postLeft}>
          <Post post={post} currentUser={user.id}/>
        </div>

        <div className={styles.postRight}>
          <Suggestion posts={suggestions} />
        </div>
      </main>
      <Footer />
    </>
  );
}

async function getPostSSR(postId: string) {
  const token = cookies().get("accessToken")?.value;

  // get post
  const response = await services.getPost(postId, token);
  if (response.status !== 200) redirect("/");

  return response.data.post;
}
async function getUserSSR() {
  const token = cookies().get("accessToken")?.value;

  // get post
  const response = await services.getCurrentUser(token);
  if (response.status !== 200) redirect("/");

  return response.data.user;
}
async function getSuggestionSSR(category: string) {
  const token = cookies().get("accessToken")?.value;

  // get posts
  const response = await services.getAllPosts(category, token);
  if (response.status !== 200) return [] as IPost[];

  return response.data.posts;
}

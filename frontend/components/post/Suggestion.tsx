import React from "react";
import styles from "@styles/components/post/Suggestion.module.scss";
import { IPost } from "@Types/";
import Link from "next/link";

export default function Suggestion({ posts }: { posts: IPost[] }) {
  return (
    <div className={styles.suggestion}>
      <h3 className={styles.suggestionTitle}>Other posts you my like</h3>

      <div className={styles.suggestionContent}>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}

function Post({ post }: { post: IPost }) {
  return (
    <div className={styles.post}>
      <div className={styles.postImgContainer}>
        <img src={post.img} alt={post.title} className={styles.postImg} />
      </div>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <Link href={`/post/${post.id}`} className={styles.postRead}>
        Read More
      </Link>
    </div>
  );
}

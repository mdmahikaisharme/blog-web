import Link from "next/link";
import { IPost } from "@Types/";
import React from "react";
import styles from "@styles/components/home/Post.module.scss";

export default function Post({ post }: { post: IPost }) {
  return (
    <div className={styles.post}>
      <div className={styles.postTextContainer}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postContent}>{post.describtion}</p>
        <Link className={styles.postRead} href={`/post/${post.id}`}>
          Read More
        </Link>
      </div>

      <div className={styles.postImgContainer}>
        <img src={post.img} alt={post.title} className={styles.postImg} />
      </div>
    </div>
  );
}

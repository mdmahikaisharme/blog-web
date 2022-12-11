"use client";
import React from "react";
import styles from "@styles/components/post/Post.module.scss";
import { IPost } from "@Types/";
import { FaTimes, FaEdit } from "react-icons/fa";
import Link from "next/link";
import services from "@services";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function Post({
  post,
  currentUser,
}: {
  post: IPost;
  currentUser: string;
}) {
  const router = useRouter();

  const handleDeletePost = async () => {
    const token = jsCookie.get("accessToken");
    const response = await services.deletePost(post.id, token);
    if (response.status !== 200) return;

    router.push("/");
  };

  return (
    <div className={styles.post}>
      {/* post image */}
      <div className={styles.postImgContainer}>
        <img src={post.img} alt={post.title} className={styles.postImg} />
      </div>

      {/* post Info */}
      <div className={styles.postInfo}>
        <div className={styles.postUserImgContainer}>
          <img
            src={post.userImg}
            alt={post.userName}
            className={styles.postUserImg}
          />
        </div>

        <div className={styles.postInfoText}>
          <h3 className={styles.postUserName}>{post.userName}</h3>
          <span className={styles.postPostedAt}>{post.createdAt}</span>
        </div>

        {currentUser === post.userId && (
          <div className={styles.postActionContainer}>
            <Link
              className={`${styles.postAction} ${styles.postActionEdit}`}
              href={`/edit/${post.id}`}
            >
              <FaEdit />
            </Link>
            <button
              className={`${styles.postAction} ${styles.postActionDelete}`}
              onClick={handleDeletePost}
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>

      <div className={styles.postTextContainer}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postContent}>{post.describtion}</p>
      </div>
    </div>
  );
}

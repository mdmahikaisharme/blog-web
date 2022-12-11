"use client";
import React, { useEffect, useState } from "react";
import styles from "@styles/components/create/styles.module.scss";
import { Footer, Navbar } from "@components/common";
import { Category, Editor, Publish } from "@components/create";
import services from "@services";
import { useRouter } from "next/navigation";
import jsCookie from "js-cookie";
import { IPost } from "@Types/";

export default function EditPage({ params: { postId } }: any) {
  const router = useRouter();
  const token = jsCookie.get("accessToken");
  const [post, setPost] = useState({} as IPost);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [describtion, setDescribtion] = useState("");
  const [category, setCategory] = useState("");

  const handleUpdate = async () => {
    const input = {
      img,
      title,
      describtion,
      category,
      createdAt: post.createdAt,
      userId: post.userId,
    };

    // update post
    const token = jsCookie.get("accessToken");
    const response = await services.updatePost(post.id, input, token);
    if (response.status !== 200) return;

    router.push("/");
  };

  useEffect(() => {
    const getPost = async () => {
      const response = await services.getPost(postId, token);
      if (response.status !== 200) router.push("/");

      const post = response.data.post;
      setPost(post);
      setTitle(post.title);
      setDescribtion(post.describtion);
      setCategory(post.category);
      setImg(post.img);
    };

    getPost();
  }, []);

  return (
    <>
      <Navbar />
      <main className={`${styles.createPage} container`}>
        <div className={styles.createLeft}>
          {/* title */}
          <input
            type="text"
            className={styles.createInput}
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />

          {/* img */}
          <input
            type="text"
            className={styles.createInput}
            name="image"
            placeholder="Image"
            value={img}
            onChange={(e: any) => setImg(e.target.value)}
          />

          {/* EDITOR */}
          <Editor value={describtion} onChange={setDescribtion} />
        </div>
        <div className={styles.createRight}>
          <Publish handleUpdate={handleUpdate} />
          <Category activeCategory={category} setCategory={setCategory} />
        </div>
      </main>
      <Footer />
    </>
  );
}

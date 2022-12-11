"use client";
import { useState } from "react";
import styles from "@styles/components/create/styles.module.scss";
import { Footer, Navbar } from "@components/common";
import { Category, Publish, Editor } from "@components/create";
import services from "@services";
import { useRouter } from "next/navigation";
import jsCookie from "js-cookie";

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [describtion, setDescribtion] = useState("");
  const [category, setCategory] = useState("art");

  const handleUpload = async () => {
    const input = {
      img,
      title,
      describtion,
      category,
    };

    // create post
    const token = jsCookie.get("accessToken");
    const response = await services.createPost(input, token);
    if (response.status !== 200) return;

    router.push("/");
  };

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
          <Publish handleUpload={handleUpload} />
          <Category activeCategory={category} setCategory={setCategory} />
        </div>
      </main>
      <Footer />
    </>
  );
}

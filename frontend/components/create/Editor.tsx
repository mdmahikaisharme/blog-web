"use client";
import { useState, useEffect } from "react";
import styles from "@styles/components/create/styles.module.scss";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Editor(props: { value: string; onChange: any }) {
  const [found, setFound] = useState(false);
  useEffect(() => {
    if (typeof window === "object") {
      setFound(true);
    }
  }, []);

  return found ? (
    <ReactQuill className={styles.editor} theme="snow" {...props} />
  ) : (
    <div>Loading...</div>
  );
}

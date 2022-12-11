import React from "react";
import styles from "@styles/components/create/Category.module.scss";

export default function Category({
  activeCategory,
  setCategory,
}: {
  activeCategory: string;
  setCategory: (value: string) => void;
}) {
  const categories = [
    "art",
    "science",
    "technology",
    "cinema",
    "design",
    "food",
  ];

  return (
    <div className={styles.category}>
      <h2 className={styles.categoryTitle}>Category</h2>

      <div className={styles.categoryContent}>
        {categories.map((categroy) => (
          <div className={styles.categoryRow} key={categroy}>
            <input
              type="radio"
              name="category"
              id={categroy}
              checked={categroy === activeCategory}
              onChange={() => setCategory(categroy)}
            />
            <label htmlFor={categroy}>{categroy}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

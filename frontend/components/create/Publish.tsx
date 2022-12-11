import React from "react";
import styles from "@styles/components/create/Publish.module.scss";

interface IPublish {
  handleUpload?: () => void;
  handleUpdate?: () => void;
}

export default function Publish({ handleUpload, handleUpdate }: IPublish) {
  return (
    <div className={styles.publish}>
      <h2 className={styles.publishTitle}>Publish</h2>

      <div className={styles.publishContent}>
        <div className={styles.pulishRow}>
          <strong>Status: </strong> Darft
        </div>
        <div className={styles.pulishRow}>
          <strong>Visibility: </strong> Public
        </div>
      </div>

      <div className={styles.publishAction}>
        <button className={styles.publishDarft}>Save as a darft</button>
        <button
          className={styles.publishUpload}
          onClick={handleUpload || handleUpdate}
        >
          {handleUpload ? "Upload" : "Update"}
        </button>
      </div>
    </div>
  );
}

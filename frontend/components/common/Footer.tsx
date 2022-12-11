import React from "react";
import styles from "@styles/components/common/Footer.module.scss";

export default function Footer() {
  return (
    <div className={`${styles.footer} container`}>
      <div className={styles.footerLogoContainer}>
        <img src="/image/logo.svg" alt="logo" className={styles.footerLogo} />
      </div>
      <div className={styles.footerText}>
        Made with ❤ and <strong>NextJs</strong>
      </div>
    </div>
  );
}

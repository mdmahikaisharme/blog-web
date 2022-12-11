"use client";
import Link from "next/link";
import styles from "@styles/components/common/Navbar.module.scss";
import { useAuthContext } from "context/Auth";
import services from "@services";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const authContext = useAuthContext();

  const logout = async () => {
    try {
      const response = await services.logout();
      if (response.status !== 200) return;

      // clear token
      jsCookie.set("accessToken", "");
    } catch {
      jsCookie.set("accessToken", "");
    }

    // clear user
    router.push("/auth/login");
  };

  return (
    <div className={`${styles.navBar} container`}>
      <div className={styles.logoContainer}>
        <img src="" alt="" className={styles.logo} />
      </div>

      <div className={styles.navMenu}>
        <NavItem name={"art"} />
        <NavItem name={"sceince"} />
        <NavItem name={"technology"} />
        <NavItem name={"cinema"} />
        <NavItem name={"design"} />
        <NavItem name={"food"} />

        <div className={styles.navActionContainer}>
          {authContext.user?.id ? (
            <>
              <button className={styles.navActionItem} onClick={logout}>
                Logout
              </button>
              <Link
                className={`${styles.navActionItem} ${styles.navActionWrite}`}
                href="/create"
              >
                Write
              </Link>
            </>
          ) : (
            <>
              <Link className={styles.navActionItem} href="/auth/login">
                Login
              </Link>
              <Link
                className={`${styles.navActionItem} ${styles.navActionWrite}`}
                href="/auth/signup"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
function NavItem({ name }: { name: string }) {
  const router = useRouter();

  return (
    <Link
      className={styles.navItem}
      href={`?category=${name}`}
      onClick={() => router.refresh()}
    >
      {name}
    </Link>
  );
}

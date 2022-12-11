"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@styles/components/auth/styles.module.scss";
import Link from "next/link";
import { IAuthLogin } from "@Types/";
import services from "@services";
import jsCookie from "js-cookie";
import { useAuthContext } from "context/Auth";

export default function LoginPage() {
  const router = useRouter();
  const authContext = useAuthContext();
  const [input, setInput] = useState<IAuthLogin>({ email: "", password: "" });
  const [error, setError] = useState("");
  const hanldeChangeInput = (e: any) => {
    setInput((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await services.login(input);
      if (response.status !== 200) return;

      // setToken
      jsCookie.set("accessToken", response.data.accessToken);
      router.push("/");
      authContext.loadUser();
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className={styles.auth}>
      <h1 className={styles.authTitle}>Login</h1>

      <form className={styles.authForm} onSubmit={handleSubmit}>
        <input
          type="email"
          className={styles.authInput}
          name="email"
          placeholder="Email"
          onChange={hanldeChangeInput}
        />
        <input
          type="password"
          className={styles.authInput}
          name="password"
          placeholder="Password"
          onChange={hanldeChangeInput}
        />
        <button className={styles.authSubmit}>Login</button>
        {error && <p className={styles.authError}>Some error occord</p>}
        <span className={styles.authRedirect}>
          Havn't any account?
          <Link className={styles.authLink} href="/auth/signup">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import styles from "@styles/components/auth/styles.module.scss";
import Link from "next/link";
import { IAuthSignup } from "@Types/";
import { useRouter } from "next/navigation";
import jsCookie from "js-cookie";
import services from "@services";
import { useAuthContext } from "context/Auth";

export default function SignupPage() {
  const authContext = useAuthContext();
  const router = useRouter();
  const [input, setInput] = useState<IAuthSignup>({
    name: "",
    email: "",
    password: "",
    img: "",
  });
  const [error, setError] = useState("");
  const hanldeChangeInput = (e: any) => {
    setInput((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await services.signup(input);
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
      <h1 className={styles.authTitle}>Signup</h1>

      <form className={styles.authForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.authInput}
          name="name"
          placeholder="Username"
          onChange={hanldeChangeInput}
        />
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
        <input
          type="text"
          className={styles.authInput}
          name="img"
          placeholder="Image"
          onChange={hanldeChangeInput}
        />
        <button className={styles.authSubmit}>Signup</button>
        {error && <p className={styles.authError}>Some error occord</p>}
        <span className={styles.authRedirect}>
          Have an account?
          <Link className={styles.authLink} href="/auth/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAuthState } from "@Types/context";
import { IAuthLogin, IUser } from "@Types/";
import services from "@services";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";

const AuthContext = createContext({} as IAuthState);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const authValues = useAuth();

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

function useAuth(): IAuthState {
  const router = useRouter();
  const [user, setUser] = useState<IUser | undefined>();

  const loadUser = async () => {
    try {
      const token = jsCookie.get("accessToken");
      if (!token) router.push("/auth/login");

      // get current user
      const response = await services.getCurrentUser(token);
      if (response.status !== 200) return;

      setUser(response.data.user);
    } catch {
      router.refresh();
    }
  };

  // effect
  useEffect(() => {
    user || loadUser();
  }, []);

  return { user, loadUser };
}

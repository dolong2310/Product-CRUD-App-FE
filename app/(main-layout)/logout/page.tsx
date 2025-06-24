"use client";

import { authApi } from "@/apis/auth";
import { handleErrorApi } from "@/lib/utils";
import { useUserStore } from "@/stores/userStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

type Props = {};

const LogoutChild = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionToken = searchParams?.get("sessionToken");
  const { setUser } = useUserStore();

  useEffect(() => {
    const controller = new AbortController();

    const handleLogout = async () => {
      try {
        await authApi.logoutFromNextClientToServer({
          force: false,
          signal: controller.signal,
        });
      } catch (error) {
        handleErrorApi({ error });
        await authApi.logoutFromNextClientToServer({
          force: true,
          signal: controller.signal,
        });
      } finally {
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("sessionTokenExpiresAt");
        setUser(null);
        router.push("/login");
      }
    };

    if (sessionToken === localStorage.getItem("sessionToken")) {
      handleLogout();
    }

    return () => {
      controller.abort();
    };
  }, [sessionToken]);

  return null;
};

const Logout = () => {
  return (
    <Suspense>
      <LogoutChild />
    </Suspense>
  );
};

export default Logout;

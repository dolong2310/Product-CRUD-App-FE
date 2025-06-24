"use client";

import { authApi } from "@/apis/auth";
import { handleErrorApi } from "@/lib/utils";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const router = useRouter();

  const { setUser } = useUserStore();

  const handleLogout = async () => {
    try {
      await authApi.logoutFromNextClientToServer({ force: false });
      toast.success("Logout successful!", {
        description: "You have successfully logged out.",
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      handleErrorApi({
        error,
      });
      await authApi.logoutFromNextClientToServer({
        force: true,
      });
      router.push("/login");
    } finally {
      setUser(null);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;

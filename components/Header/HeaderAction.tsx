"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatName } from "@/lib/utils";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import LogoutButton from "../LogoutButton";

const HeaderAction = () => {
  const { user } = useUserStore();

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/me" className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage
              src={user.avatar || ""}
              alt={`@${user.name}`}
              className="object-cover"
            />
            <AvatarFallback>{formatName(user.name)}</AvatarFallback>
          </Avatar>
          <h2 className="text-blue-500 hover:underline">{user.name}</h2>
        </Link>

        <LogoutButton />
      </div>
    );
  }

  return (
    <div>
      <Link href="/login" className="py-2 px-4 text-blue-500 hover:underline">
        Login
      </Link>
      <Link
        href="/register"
        className="py-2 px-4 text-blue-500 hover:underline"
      >
        Register
      </Link>
    </div>
  );
};

export default HeaderAction;

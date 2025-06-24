"use client";

import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { Button } from "./ui/button";

const AddProductButton = () => {
  const { user } = useUserStore();
  if (!user) return null;
  return (
    <Link href="/products/add">
      <Button>Add Product</Button>
    </Link>
  );
};

export default AddProductButton;

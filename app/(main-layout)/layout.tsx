import Header from "@/components/Header";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Providers>
      <Header />
      <main>{children}</main>
      <Toaster />
    </Providers>
  );
};

export default MainLayout;

import { cookies } from "next/headers";
import React from "react";
import AuthProvider from "./AuthProvider";
import InitProvider from "./InitProvider";
import { ThemeProvider } from "./ThemeProvider";

type Props = {
  children: React.ReactNode;
};

const Providers = async ({ children }: Props) => {
  return (
    <InitProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </InitProvider>
  );
};

export default Providers;

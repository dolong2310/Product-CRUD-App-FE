import React from "react";
import AuthProvider from "./AuthProvider";
import InitProvider from "./InitProvider";
import QueryProvider from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

type Props = {
  children: React.ReactNode;
};

const Providers = async ({ children }: Props) => {
  return (
    <QueryProvider>
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
    </QueryProvider>
  );
};

export default Providers;

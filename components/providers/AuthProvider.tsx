"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  return children;
};

export default AuthProvider;

import React from "react";

type Props = {
  children: React.ReactNode;
};

const EmptyLayout = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default EmptyLayout;

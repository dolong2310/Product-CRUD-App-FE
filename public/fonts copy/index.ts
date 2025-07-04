import localFont from "next/font/local";

export const poppins = localFont({
  src: [
    {
      path: "./poppins/Poppins-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./poppins/Poppins-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./poppins/Poppins-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./poppins/Poppins-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

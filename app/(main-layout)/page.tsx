import HomePage from "@/views/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

const Home = () => {
  return <HomePage />;
};

export default Home;

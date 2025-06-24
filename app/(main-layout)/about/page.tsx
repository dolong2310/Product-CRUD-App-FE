import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About",
};

const About = () => {
  return (
    <section className="container py-8">
      <h1 className="text-2xl font-bold">About</h1>
    </section>
  );
};

export default About;

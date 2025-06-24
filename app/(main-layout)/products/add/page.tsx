import ProductForm from "@/components/views/ProductForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product",
};

const Product = async () => {
  return (
    <section className="container py-8">
      <h1 className="text-2xl font-bold">Add Product</h1>
      <ProductForm />
    </section>
  );
};

export default Product;

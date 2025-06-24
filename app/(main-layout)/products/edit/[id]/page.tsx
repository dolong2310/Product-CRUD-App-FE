import { productApi } from "@/apis/product";
import ProductForm from "@/components/views/ProductForm";
import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Edit Product",
};

const getProductDetail = async (id: string) => {
  try {
    const response = await productApi.getProductDetail(id);
    return response.data;
  } catch (error) {
    redirect("/products");
  }
};

const Product = async ({ params }: Props) => {
  const id = (await params).id;
  const productData = await getProductDetail(id);

  return (
    <section className="container py-8">
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <ProductForm productData={productData} />
    </section>
  );
};

export default Product;

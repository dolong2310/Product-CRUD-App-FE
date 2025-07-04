import { productApi } from "@/apis/product";
import AddProductButton from "@/components/AddProductButton";
import ProductList from "@/components/views/ProductList";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

const Products = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => productApi.getProductList(),
  });

  return (
    <section className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <AddProductButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductList dehydratedState={dehydrate(queryClient)} />
      </div>
    </section>
  );
};

export default Products;

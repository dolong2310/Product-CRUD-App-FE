"use client";

import { productApi } from "@/apis/product";
import {
  DehydratedState,
  HydrationBoundary,
  useQuery,
} from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";

type Props = {
  dehydratedState: DehydratedState;
};

const ProductList = ({ dehydratedState }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => productApi.getProductList(),
  });

  if (isLoading) {
    return Array(8)
      .fill(null)
      .map((_, index) => <ProductCardSkeleton key={index} />);
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      {data?.data?.map((product) => (
        <ProductCard key={product.id} productData={product} />
      ))}
    </HydrationBoundary>
  );
};

export default ProductList;

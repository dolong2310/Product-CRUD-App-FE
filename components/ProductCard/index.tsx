import { ProductType } from "@/schemaValidations/product.schema";
import Image from "next/image";
import ProductAction from "./ProductAction";
import Link from "next/link";

type Props = {
  productData: ProductType;
};

const ProductCard = ({ productData }: Props) => {
  return (
    <article key={productData.id} className="flex flex-col">
      <Link href={`/products/${productData.id}`} className="flex">
        <div className="relative w-full h-[300px]">
          <Image
            src={productData.image}
            alt={productData.name}
            fill
            className="object-cover rounded"
          />
        </div>
      </Link>
      <Link href={`/products/${productData.id}`} className="flex">
        <h2 className="text-xl text-blue-500 mt-4">{productData.name}</h2>
      </Link>
      <p>{productData.description}</p>
      <p>Price: ${productData.price.toFixed(2)}</p>

      <ProductAction productData={productData} />
    </article>
  );
};

export default ProductCard;

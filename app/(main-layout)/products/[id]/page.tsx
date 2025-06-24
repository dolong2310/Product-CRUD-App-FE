import { ApiTags } from "@/apis/apiTags";
import { productApi } from "@/apis/product";
import { openGraphBase } from "@/app/shared-metadata";
import envConfig from "@/config/envConfig";
import type { Metadata, ResolvingMetadata } from "next";
import { unstable_cache } from "next/cache";

type MetadataProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getProductDetail = unstable_cache(
  async (id: string) => {
    try {
      const response = await productApi.getProductDetail(id);
      return response.data;
    } catch (error) {
      throw new Error("Product not found");
    }
  },
  ["product-detail"],
  { tags: [ApiTags.PRODUCTS] }
);

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;
  const detailData = await getProductDetail(id);

  return {
    title: detailData.name,
    description: detailData.description,
    openGraph: {
      ...openGraphBase,
      title: detailData.name,
      description: detailData.description,
      siteName: detailData.name,
      images: [
        {
          type: "image/jpg",
          width: "2400",
          height: "1260",
          alt: detailData.name,
          url: detailData.image,
          secureUrl: detailData.image,
        },
      ],
    },
    alternates: {
      canonical: envConfig.NEXT_PUBLIC_URL,
    },
  };
}

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const detailData = await getProductDetail(id);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Product Detail</h1>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Product Image */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={detailData.image || "/placeholder.png"}
            alt={detailData.name}
            className="object-contain h-80 w-full rounded"
          />
        </div>
        {/* Right: Product Info */}
        <div className="md:w-1/2 flex flex-col">
          <h2 className="text-2xl font-semibold">{detailData.name}</h2>
          <p className="mt-4">{detailData.description}</p>
          <div className="text-xl font-bold text-blue-600 mt-4">
            ${detailData.price}
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

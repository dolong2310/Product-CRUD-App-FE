import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <article className="flex flex-col">
      {/* Image skeleton */}
      <div className="flex">
        <div className="relative w-full h-[300px]">
          <Skeleton className="w-full h-full rounded" />
        </div>
      </div>

      {/* Product name skeleton */}
      <div className="flex mt-4">
        <Skeleton className="h-7 w-3/4" />
      </div>

      {/* Description skeleton */}
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Price skeleton */}
      <div className="mt-2">
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Action buttons skeleton */}
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </article>
  );
};

export default ProductCardSkeleton;

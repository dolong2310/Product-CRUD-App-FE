"use client";

import { deleteProductAndRevalidate } from "@/app/actions/productActions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProductType } from "@/schemaValidations/product.schema";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useUserStore } from "@/stores/userStore";

type Props = { productData: ProductType };

const ProductAction = ({ productData }: Props) => {
  const { user } = useUserStore();

  const handleDeleteProduct = async () => {
    try {
      await deleteProductAndRevalidate(`${productData.id}`);
      toast.success(`Product "${productData.name}" deleted successfully!`, {
        description: "Your product has been removed from our servers.",
      });
    } catch (error) {
      toast.error(`Failed to delete product "${productData.name}".`, {
        description: "Please try again later.",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="mt-auto pt-4">
      <div className="flex items-center justify-between gap-2">
        <Link href={`/products/edit/${productData.id}`} className="flex-1">
          <Button className="w-full">Edit</Button>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="flex-1" variant="destructive">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your{" "}
                <strong>"{productData.name}"</strong> and remove your data from
                our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProduct}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ProductAction;

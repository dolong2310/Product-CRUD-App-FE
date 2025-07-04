"use client";

import { productApi } from "@/apis/product";
import {
  createProductAndRevalidate,
  updateProductAndRevalidate,
} from "@/app/actions/productActions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleErrorApi } from "@/lib/utils";
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import UploadImage from "../UploadImage";

type ProductFormType = CreateProductBodyType | UpdateProductBodyType;
type Props = {
  productData?: ProductType;
};

const ProductForm = ({ productData }: Props) => {
  const IS_EDIT_MODE = !!productData;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<ProductFormType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: productData?.name ?? "",
      description: productData?.description ?? "",
      price: productData?.price ?? 0,
      image: productData?.image ?? "",
    },
  });

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    setError,
  } = form;

  const formImage = form.watch("image");

  const handleCreateProduct = async (values: ProductFormType) => {
    const imageUrl = (await productApi.uploadImage(imageFile!)).data;
    const response = await createProductAndRevalidate({
      ...values,
      image: imageUrl,
    });
    return response.data;
  };

  const handleUpdateProduct = async (values: ProductFormType) => {
    const imageUrl = imageFile
      ? (await productApi.uploadImage(imageFile!)).data
      : formImage;
    const response = await updateProductAndRevalidate(`${productData?.id}`, {
      ...values,
      image: imageUrl,
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: async (values: ProductFormType) => {
      setLoading(true);
      const methods = [handleCreateProduct, handleUpdateProduct];
      const method = methods[Number(IS_EDIT_MODE)];
      const response = await method(values);
      return response;
    },
    onSuccess: (response) => {
      const title = IS_EDIT_MODE ? "updated" : "created";
      toast.success(`Product ${title} successfully!`, {
        description: `You have successfully ${title} a new product.`,
      });
      router.push("/products");
    },
    onError: (error) => {
      handleErrorApi({
        error,
        setError,
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = (values: ProductFormType) => mutation.mutate(values);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md mx-auto mt-8"
      >
        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <UploadImage
                    src={formImage}
                    onChange={(file) => {
                      setImageFile(file);
                      field.onChange(window.location.origin + "/" + file.name);
                    }}
                    onRemove={() => {
                      setImageFile(null);
                      form.setValue("image", "");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product price"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-4 py-5 text-lg font-semibold"
          disabled={(!isDirty && !isValid) || loading}
          // loading={loading}
        >
          {IS_EDIT_MODE ? "Update" : "Create"} Product
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;

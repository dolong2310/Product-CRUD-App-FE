import http from "@/lib/http";
import { MessageResType } from "@/schemaValidations/common.schema";
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";
import { UploadFileType } from "@/types";
import { ApiTags } from "./apiTags";

export const productApi = {
  getProductList: async () => {
    const response = await http.get<ProductListResType>("/products", {
      cache: "force-cache",
      next: { tags: [ApiTags.PRODUCTS], revalidate: 30 },
    });
    console.log("response products: ", response.data);
    return response.data;
  },
  getProductDetail: async (id: string) => {
    const response = await http.get<ProductResType>(`/products/${id}`);
    return response.data;
  },
  createProduct: async (data: CreateProductBodyType, sessionToken: string) => {
    const response = await http.post<ProductResType>("/products", data, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    return response.data;
  },
  updateProduct: async (
    id: string,
    data: UpdateProductBodyType,
    sessionToken: string
  ) => {
    const response = await http.put<ProductResType>(`/products/${id}`, data, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    return response.data;
  },
  deleteProduct: async (id: string, sessionToken: string) => {
    const response = await http.delete<MessageResType>(
      `/products/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    return response.data;
  },
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await http.post<UploadFileType>("/media/upload", formData);
    return response.data;
  },
};

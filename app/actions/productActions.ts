"use server";

import { ApiTags } from "@/apis/apiTags";
import { productApi } from "@/apis/product";
import { CreateProductBodyType } from "@/schemaValidations/product.schema";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function createProductAndRevalidate(body: CreateProductBodyType) {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken")?.value;

  if (!sessionToken) {
    throw new Error("Session token is missing");
  }
  const response = await productApi.createProduct(body, sessionToken);
  revalidateTag(ApiTags.PRODUCTS);

  return response;
}

export async function updateProductAndRevalidate(
  id: string,
  body: CreateProductBodyType
) {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken")?.value;

  if (!sessionToken) {
    throw new Error("Session token is missing");
  }
  const response = await productApi.updateProduct(id, body, sessionToken);
  revalidateTag(ApiTags.PRODUCTS);

  return response;
}

export async function deleteProductAndRevalidate(id: string) {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken")?.value;

  if (!sessionToken) {
    throw new Error("Session token is missing");
  }
  const response = await productApi.deleteProduct(id, sessionToken);
  revalidateTag(ApiTags.PRODUCTS);

  return response;
}

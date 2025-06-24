import { IS_CLIENT, IS_SERVER } from "@/common/contants";
import envConfig from "@/config/envConfig";
import { LoginResType } from "@/schemaValidations/auth.schema";
import { redirect } from "next/navigation";
import { normalizePath } from "./utils";
import { merge } from "lodash-es";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  data: {
    message: string;
    [key: string]: any;
  };

  constructor({ status, data }: { status: number; data: any }) {
    super("HTTP Error");
    this.status = status;
    this.data = data;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;

  constructor({ status, data }: { status: 422; data: EntityErrorPayload }) {
    super({ status, data });
    this.status = status;
    this.payload = data;
  }
}

const handleLogoutClientTokenExpired = async () => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify({ force: true }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
  } finally {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("sessionTokenExpiresAt");
    window.location.href = "/login";
  }
};

const handleLogoutServerTokenExpired = (sessionToken: string) => {
  redirect(`/logout?sessionToken=${sessionToken}`);
};

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions
) => {
  const isFormData = options?.body instanceof FormData;
  const baseHeaders: { [key: string]: string } = isFormData
    ? {}
    : { "Content-Type": "application/json" };
  if (IS_CLIENT()) {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) baseHeaders.Authorization = `Bearer ${sessionToken}`;
  }

  let body = options?.body;
  if (body && !isFormData) {
    body = JSON.stringify(body);
  }
  const baseUrl = options?.baseUrl || envConfig.NEXT_PUBLIC_API_URL;
  const fullUrl = new URL(url, baseUrl).toString();

  // console.log({ fullUrl, method, headers: baseHeaders, body, options });
  const response = await fetch(fullUrl, {
    ...options,
    method,
    headers: merge(baseHeaders, options?.headers),
    body,
  });

  const data: Response = await response.json();
  const result = {
    status: response.status,
    data,
  };

  if (!response.ok) {
    if (response.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        result as {
          status: 422;
          data: EntityErrorPayload;
        }
      );
    } else if (response.status === AUTHENTICATION_ERROR_STATUS) {
      if (IS_SERVER()) {
        handleLogoutServerTokenExpired(
          (options?.headers as any)?.Authorization.split(" ")[1]
        );
      } else {
        handleLogoutClientTokenExpired();
      }
    } else {
      throw new HttpError(result);
    }
  }

  if (IS_CLIENT()) {
    if (
      ["auth/login", "auth/register"].some(
        (item) => item === normalizePath(url)
      )
    ) {
      const { token, expiresAt } = (data as LoginResType).data;
      localStorage.setItem("sessionToken", token);
      localStorage.setItem("sessionTokenExpiresAt", expiresAt);
    } else if (["auth/logout"].some((item) => item === normalizePath(url))) {
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("sessionTokenExpiresAt");
    }
  }

  return result;
};

const http = {
  get<Response>(url: string, options?: CustomOptions) {
    return request<Response>("GET", url, options);
  },
  post<Response>(url: string, body: any, options?: CustomOptions) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: CustomOptions) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(url: string, body: any, options?: CustomOptions) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default http;

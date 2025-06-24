// import { IS_SERVER } from "@/common/contants";
// import envConfig from "@/config/envConfig";
// import { LoginResType } from "@/schemaValidations/auth.schema";
// import { redirect } from "next/navigation";
// import { normalizePath } from "./utils";

// type CustomOptions = Omit<RequestInit, "method"> & {
//   baseUrl?: string;
// };

// const ENTITY_ERROR_STATUS = 422;
// const AUTHENTICATION_ERROR_STATUS = 401;

// type EntityErrorPayload = {
//   message: string;
//   errors: {
//     field: string;
//     message: string;
//   }[];
// };

// export class HttpError extends Error {
//   status: number;
//   data: {
//     message: string;
//     [key: string]: any;
//   };

//   constructor({ status, data }: { status: number; data: any }) {
//     super("HTTP Error");
//     this.status = status;
//     this.data = data;
//   }
// }

// export class EntityError extends HttpError {
//   status: 422;
//   payload: EntityErrorPayload;

//   constructor({ status, data }: { status: 422; data: EntityErrorPayload }) {
//     super({ status, data });
//     this.status = status;
//     this.payload = data;
//   }
// }

// class SessionToken {
//   private token: string = "";
//   private _expiresAt: string = new Date().toISOString();

//   get value() {
//     return this.token;
//   }
//   set value(newToken: string) {
//     if (IS_SERVER()) {
//       throw new Error("Cannot set session token on the server side");
//     }
//     this.token = newToken;
//   }

//   get expiresAt() {
//     return this._expiresAt;
//   }
//   set expiresAt(newExpiresAt: string) {
//     if (IS_SERVER()) {
//       throw new Error("Cannot set session token expiration on the server side");
//     }
//     this._expiresAt = newExpiresAt;
//   }
// }

// export const clientSessionToken = new SessionToken();

// const handleLogoutClientTokenExpired = async () => {
//   await fetch("/api/auth/logout", {
//     method: "POST",
//     body: JSON.stringify({ force: true }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   clientSessionToken.value = "";
//   clientSessionToken.expiresAt = new Date().toISOString();
//   window.location.href = "/login";
// };

// const handleLogoutServerTokenExpired = (sessionToken: string) => {
//   redirect(`/logout?sessionToken=${sessionToken}`);
// };

// const request = async <Response>(
//   method: "GET" | "POST" | "PUT" | "DELETE",
//   url: string,
//   options?: CustomOptions
// ) => {
//   const isFormData = options?.body instanceof FormData;
//   const headers = {
//     ...(isFormData ? {} : { "Content-Type": "application/json" }),
//     Authorization: clientSessionToken.value
//       ? `Bearer ${clientSessionToken.value}`
//       : "",
//     ...options?.headers,
//   };
//   let body = options?.body;
//   if (body && !isFormData) {
//     body = JSON.stringify(body);
//   }
//   const baseUrl = options?.baseUrl || envConfig.NEXT_PUBLIC_API_URL;
//   const fullUrl = new URL(url, baseUrl).toString();

//   console.log({ fullUrl, method, headers, body, options });
//   const response = await fetch(fullUrl, {
//     ...options,
//     method,
//     headers,
//     body,
//   });

//   const data: Response = await response.json();
//   const result = {
//     status: response.status,
//     data,
//   };

//   if (!response.ok) {
//     if (response.status === ENTITY_ERROR_STATUS) {
//       throw new EntityError(
//         result as {
//           status: 422;
//           data: EntityErrorPayload;
//         }
//       );
//     } else if (response.status === AUTHENTICATION_ERROR_STATUS) {
//       if (IS_SERVER()) {
//         handleLogoutServerTokenExpired(
//           (options?.headers as any)?.Authorization.split(" ")[1]
//         );
//       } else {
//         handleLogoutClientTokenExpired();
//       }
//     } else {
//       throw new HttpError(result);
//     }
//   }

//   if (IS_CLIENT()) {
//     if (
//       ["auth/login", "auth/register"].some(
//         (item) => item === normalizePath(url)
//       )
//     ) {
//       clientSessionToken.value = (data as LoginResType).data.token || "";
//       clientSessionToken.expiresAt = (data as LoginResType).data.expiresAt;
//     } else if (["auth/logout"].some((item) => item === normalizePath(url))) {
//       clientSessionToken.value = "";
//       clientSessionToken.expiresAt = new Date().toISOString();
//     }
//   }

//   return result;
// };

// const http = {
//   get<Response>(url: string, options?: CustomOptions) {
//     return request<Response>("GET", url, options);
//   },
//   post<Response>(url: string, body: any, options?: CustomOptions) {
//     return request<Response>("POST", url, { ...options, body });
//   },
//   put<Response>(url: string, body: any, options?: CustomOptions) {
//     return request<Response>("PUT", url, { ...options, body });
//   },
//   delete<Response>(url: string, body: any, options?: CustomOptions) {
//     return request<Response>("DELETE", url, { ...options, body });
//   },
// };

// export default http;

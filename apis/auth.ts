import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  SlideSessionResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

export const authApi = {
  login: async ({ email, password }: LoginBodyType) => {
    const response = await http.post<LoginResType>("/auth/login", {
      email,
      password,
    });
    const sessionToken = response.data.data.token;
    const expiresAt = response.data.data.expiresAt;
    await authApi.auth(sessionToken, expiresAt); // submit sessionToken to next server => server will set session token into cookie
    return response.data;
  },
  register: async ({
    email,
    name,
    password,
    confirmPassword,
  }: RegisterBodyType) => {
    const response = await http.post<RegisterResType>("/auth/register", {
      name,
      email,
      password,
      confirmPassword,
    });
    const sessionToken = response.data.data.token;
    const expiresAt = response.data.data.expiresAt;
    await authApi.auth(sessionToken, expiresAt); // submit sessionToken to next server => server will set session token into cookie
    return response.data;
  },
  auth: async (sessionToken: string, expiresAt: string) => {
    const response = await http.post(
      "/api/auth",
      { sessionToken, expiresAt },
      {
        baseUrl: window.location.origin, // url call api next server
      }
    );
    return response.data;
  },
  logoutFromNextClientToServer: async ({
    force,
    signal,
  }: {
    force?: boolean;
    signal?: AbortSignal;
  }) => {
    const response = await http.post<MessageResType>(
      "/api/auth/logout",
      { force },
      {
        baseUrl: window.location.origin, // url call api next server
        signal,
      }
    );
    return response;
  },
  logoutFromNextServerToServer: async (sessionToken: string) => {
    const response = await http.post<MessageResType>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    return response;
  },
  slideSessionFromNextServerToServer: async (sessionToken: string) => {
    const response = await http.post<SlideSessionResType>(
      "/auth/slide-session",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    return response.data;
  },
  slideSesstionFromNextClientToServer: async ({
    signal,
  }: {
    signal?: AbortSignal;
  }) => {
    const response = await http.post<SlideSessionResType>(
      "/api/auth/slide-session",
      {},
      {
        baseUrl: window.location.origin, // url call api next server
        signal,
      }
    );
    return response.data;
  },
};

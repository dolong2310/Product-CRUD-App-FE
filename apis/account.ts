import http from "@/lib/http";
import {
  AccountResType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

export const accountApi = {
  me: async (sessionToken: string) => {
    const response = await http.get<AccountResType>("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        // Cookie: `sessionToken=${sessionToken}`,
      },
    });
    return response.data;
  },
  meClient: async () => {
    const response = await http.get<AccountResType>("/account/me");
    return response.data;
  },
  updateProfile: async (data: UpdateMeBodyType) => {
    const response = await http.put<AccountResType>("/account/me", data);
    return response.data;
  },
};

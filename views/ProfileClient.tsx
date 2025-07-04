"use client";

import { accountApi } from "@/apis/account";
import { AccountResType } from "@/schemaValidations/account.schema";
import { useQuery } from "@tanstack/react-query";

type Props = {
  profileData: AccountResType["data"];
};

const ProfileClient = ({ profileData }: Props) => {
  const { data, isLoading, isFetching } = useQuery<AccountResType["data"]>({
    queryKey: ["profileClient"],
    queryFn: async () => {
      const response = await accountApi.meClient();
      return response.data;
    },
    enabled: true,
    initialData: profileData,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile Client</h1>
      <pre className="mt-4">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProfileClient;

"use client";

import { accountApi } from "@/apis/account";
import { AccountResType } from "@/schemaValidations/account.schema";
import React, { useEffect, useState } from "react";

type Props = {};

const ProfileClient = (props: Props) => {
  const [profileData, setProfileData] = useState<AccountResType | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const response = await accountApi.meClient();
      setProfileData(response);
    };
    getProfile();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile Client</h1>
      <pre className="mt-4">{JSON.stringify(profileData?.data, null, 2)}</pre>
    </div>
  );
};

export default ProfileClient;

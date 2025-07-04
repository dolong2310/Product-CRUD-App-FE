import { accountApi } from "@/apis/account";
import ProfileForm from "@/components/views/ProfileForm";
import ProfileClient from "@/views/ProfileClient";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Profile Edit",
};

const ProfileEdit = async () => {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken")!.value;
  const profileData = await accountApi.me(sessionToken);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold">Update Profile</h1>

      <Suspense fallback={<h2>Loading client form profile...</h2>}>
        <ProfileForm profileData={profileData.data} />
      </Suspense>
    </div>
  );
};

export default ProfileEdit;

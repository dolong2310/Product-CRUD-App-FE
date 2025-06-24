import { accountApi } from "@/apis/account";
import ProfileForm from "@/components/views/ProfileForm";
import ProfileClient from "@/pages/ProfileClient";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Profile",
};

const Profile = async () => {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken")!.value;
  const profileData = await accountApi.me(sessionToken);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold">Profile</h1>
      <pre className="mt-4">{JSON.stringify(profileData.data, null, 2)}</pre>

      <Suspense fallback={<h2>Loading client profile...</h2>}>
        <ProfileClient />
      </Suspense>

      <Suspense fallback={<h2>Loading client form profile...</h2>}>
        <ProfileForm profileData={profileData.data} />
      </Suspense>
    </div>
  );
};

export default Profile;

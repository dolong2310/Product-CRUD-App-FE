import { accountApi } from "@/apis/account";
import { Button } from "@/components/ui/button";
import ProfileClient from "@/views/ProfileClient";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button>
          <Link href="/me/edit">Edit</Link>
        </Button>
      </div>
      <pre className="mt-4">{JSON.stringify(profileData.data, null, 2)}</pre>

      <Suspense fallback={<h2>Loading client profile...</h2>}>
        <ProfileClient profileData={profileData.data} />
      </Suspense>
    </div>
  );
};

export default Profile;

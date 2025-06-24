import { authApi } from "@/apis/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();

  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken")?.value;

  if (!sessionToken) {
    return Response.json(
      { error: "Session token is missing" },
      { status: 401 }
    );
  }

  try {
    const response = await authApi.slideSessionFromNextServerToServer(
      sessionToken
    );
    const newExpiresDate = new Date(response.data.expiresAt).toUTCString();

    return Response.json(
      { res },
      {
        status: 200,
        headers: {
          "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${newExpiresDate}; SameSite=Lax; Secure`,
        },
      }
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.data, {
        status: error.status,
      });
    } else {
      return Response.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}

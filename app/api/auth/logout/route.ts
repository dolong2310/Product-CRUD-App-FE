import { authApi } from "@/apis/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force || false;

  if (force) {
    return Response.json(
      {
        message: "Force logout successful",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-Age=0`, // Clear the session token
        },
      }
    );
  }

  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken")?.value;

  if (!sessionToken) {
    return Response.json(
      { error: "Session token is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await authApi.logoutFromNextServerToServer(sessionToken);
    return Response.json(response.data, {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-Age=0`, // Clear the session token
      },
    });
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

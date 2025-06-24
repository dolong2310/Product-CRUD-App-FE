export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res?.sessionToken as string;
  const expiresAt = res?.expiresAt as string;
  const expiresDate = new Date(expiresAt).toUTCString();

  if (!sessionToken) {
    return Response.json(
      { error: "Session token is missing" },
      { status: 400 }
    );
  }

  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
      },
    }
  );
}

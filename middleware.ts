import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];
const productPathRegex = /^\/products\/(add|edit)(\/.*)?$/;

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const sessionToken = request.cookies.get("sessionToken")?.value;

  if (privatePaths.includes(pathName) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authPaths.includes(pathName) && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (productPathRegex.test(pathName) && !sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/me",
    "/products/add",
    "/products/edit/:id*",
  ],
};

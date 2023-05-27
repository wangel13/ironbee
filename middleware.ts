import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const checkAdminPaths = (path: string) => {
  return (
    path === "/admin" || path === "/admin/analytics" || path === "/admin/editor"
  );
};

const checkAuthorizedPaths = (path: string) => {
  return path === "/projects" || path === "/projects/my";
};

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (
    (!session && checkAuthorizedPaths(path)) ||
    (!session && checkAdminPaths(path))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/projects/my", req.url));
  } else if (
    (session?.role === "USER" && path === "/projects") ||
    (session?.role === "USER" && checkAdminPaths(path))
  ) {
    return NextResponse.redirect(new URL("/projects/my", req.url));
  }
  return NextResponse.next();
}

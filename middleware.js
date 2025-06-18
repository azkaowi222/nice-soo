import { NextResponse } from "next/server";
import { checkoutMiddleware } from "@/middleware-checkout";

const middleware = async (req) => {
  const token = req.cookies.get("token")?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  const admin = await isAdmin(token);
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!admin) {
      return NextResponse.redirect(
        new URL("http://localhost:3000/login"),
        req.url
      );
    }
  }
  if (req.nextUrl.pathname === "/checkout") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const cartsLength = await checkoutMiddleware(token);
    if (cartsLength <= 0) {
      return NextResponse.redirect(new URL("http://localhost:3000/"), req.url);
    }
    return NextResponse.next();
  }

  if (
    (token && req.nextUrl.pathname === "/login") ||
    (token && req.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("http://localhost:3000/"), req.url);
  }

  if (response.status !== 200 && req.nextUrl.pathname !== "/login") {
    if (req.nextUrl.pathname === "/register") {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL("http://localhost:3000/login"),
      req.url
    );
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/profile/:path*",
    "/register",
    "/checkout",
    "/order/:path*",
  ],
};

export default middleware;

const isAdmin = async (token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  const { is_admin } = await response.json();
  return is_admin === 1;
};

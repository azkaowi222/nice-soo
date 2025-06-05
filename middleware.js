import { NextResponse } from "next/server";
import { checkoutMiddleware } from "@/middleware-checkout";

const middleware = async (req) => {
  const token = req.cookies.get("token")?.value;
  const response = await fetch("http://localhost:8000/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

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
  ],
};

export default middleware;

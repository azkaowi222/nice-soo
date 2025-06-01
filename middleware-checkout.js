// middleware-checkout.ts
import { NextResponse } from "next/server";

export async function checkoutMiddleware(token) {
  console.log("middlewae checkout");
  const cartRes = await fetch("http://localhost:8000/api/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  const { items } = await cartRes.json();
  //   if (!items || items.length === 0) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  console.log(items.length);
  return items?.length;
}

export const config = {
  matcher: ["/checkout"],
};

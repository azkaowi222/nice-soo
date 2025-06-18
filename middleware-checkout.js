export async function checkoutMiddleware(token) {
  const cartRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  const { items } = await cartRes.json();
  return items?.length;
}

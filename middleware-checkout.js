export async function checkoutMiddleware(token) {
  const cartRes = await fetch("http://localhost:8000/api/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  const { items } = await cartRes.json();
  return items?.length;
}

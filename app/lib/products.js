const products = async () => {
  const response = await fetch("https://fakestoreapi.com/products?limit=6");
  const data = await response.json();
  return data;
};

export default products;

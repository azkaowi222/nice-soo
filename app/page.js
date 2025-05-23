import TopSlider from "./components/top-slider/slider";
import Category from "./components/category-product/Category";
import NewProduct from "./components/new-product/NewProduct";
import products from "./lib/products";
import React from "react";
const Home = async () => {
  const data = await products();
  return (
    <div>
      <TopSlider />
      <Category />
      <NewProduct data={data} newProduct={true} />
    </div>
  );
};

export default Home;

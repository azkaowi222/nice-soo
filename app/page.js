import TopSlider from "./components/top-slider/slider";
import Category from "./components/category-product/Category";
import NewProduct from "./components/new-product/NewProduct";
import products from "./lib/products";
import TopNavbar from "./components/navbar/top-nav/TopNav";
import Navbar from "./components/navbar/Navbar";
const Home = async () => {
  const data = await products();
  return (
    <div>
      <TopNavbar />
      <TopSlider />
      <Category />
      <NewProduct data={data} newProduct={true} />
      <Navbar />
    </div>
  );
};

export default Home;

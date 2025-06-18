import TopSlider from "./components/top-slider/slider";
import Category from "./components/category-product/Category";
import NewProduct from "./components/new-product/NewProduct";
import TopNavbar from "./components/navbar/top-nav/TopNav";
import Navbar from "./components/navbar/Navbar";
const Home = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "no-store",
  });
  const data = await response.json();
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

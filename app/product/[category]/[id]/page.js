import DetailPage from "@/app/components/detail-page/DetailPage";
import Navbar from "@/app/components/navbar/Navbar";
import TopNavbar from "@/app/components/navbar/top-nav/TopNav";
import NewProduct from "@/app/components/new-product/NewProduct";
import { cookies } from "next/headers";
const Product = async ({ params }) => {
  const cookieList = await cookies();
  const token = cookieList.get("token");
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  const { product } = await response.json();
  const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "no-store",
  });
  const data = await response2.json();
  const filterProducts = data?.filter((item) => {
    return item.name.includes(product.name.split(" ")[0]);
  });
  return (
    <>
      <TopNavbar />
      <section className="mt-2 relative">
        <DetailPage product={product} token={token} />
        <NewProduct newProduct={false} data={filterProducts} />
      </section>
      <Navbar />
    </>
  );
};

export default Product;

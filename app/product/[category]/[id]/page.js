import DetailPage from "@/app/components/detail-page/DetailPage";
import Navbar from "@/app/components/navbar/Navbar";
import TopNavbar from "@/app/components/navbar/top-nav/TopNav";
import { cookies } from "next/headers";
const Product = async ({ params }) => {
  const cookieList = await cookies();
  const token = cookieList.get("token");
  const { id } = await params;
  const response = await fetch(`http://localhost:8000/api/products/${id}`, {
    headers: {
      accept: "application/json",
    },
  });
  const { product } = await response.json();

  return (
    <>
      <TopNavbar />
      <section className="mt-2 relative">
        <DetailPage product={product} token={token} />
      </section>
      <Navbar />
    </>
  );
};

export default Product;

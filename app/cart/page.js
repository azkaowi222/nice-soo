// "use client";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Coupon from "@/app/components/coupon/Coupon";
import { TrashButton } from "@/app/components/trash-button/TrashButton";
import Title from "@/app/components/title/Title";
import Link from "next/link";
import { cookies } from "next/headers";
import TopNavbar from "../components/navbar/top-nav/TopNav";
import Navbar from "../components/navbar/Navbar";

const Cart = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const response = await fetch("http://localhost:8000/api/cart", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      accept: "application/json",
    },
    cache: "no-store",
  });
  const { items } = await response.json();
  const carts = items;
  //   const token = localStorage.getItem("token");
  //   if (!token) return;
  //   const response = await fetch(`http://localhost:8000/api/cart`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const { items } = await response.json();
  //   const newCarts = items?.map((item) => {
  //     return {
  //       id: item?.id,
  //       name: item?.product?.name,
  //       size: item?.size,
  //       price: item?.product?.price,
  //       quantity: item?.quantity,
  //       description: item?.product?.description,
  //       rating: item?.product?.rating,
  //       images: item?.product.images,
  //     };
  //   });
  //   // setCarts(newCarts);
  // };

  // useEffect(() => {
  //   // const cart = JSON.parse(localStorage.getItem("cart"));
  //   // setCarts(cart);
  //   // setSubTotal(
  //   //   cart?.reduce(
  //   //     (acc, product) => acc + Number(product.price) * product.quantity,
  //   //     0
  //   //   )
  //   // );
  //   getCart();
  // }, []);

  return (
    <>
      <TopNavbar />
      <Title title={"Keranjang Belanja"} />
      {!carts || carts?.length === 0 ? (
        <div className="flex flex-col gap-8 justify-center items-center h-[458px]">
          <div className="flex flex-col gap-3">
            <ShoppingCart size={150} color="gray" />
            <p>Keranjang Belanja Kosong</p>
          </div>
        </div>
      ) : (
        <div className="container p-4 max-w-none">
          <div className="content-box flex flex-col gap-7">
            <div className="back-btn mt-2 flex justify-center">
              <Link
                href="/"
                className="px-4 py-2 rounded-md cursor-pointer flex items-center border border-black gap-2"
              >
                <ChevronLeft size={22} />
                Lanjutkan Belanja
              </Link>
            </div>
            <div className="cart-items mt-16 flex flex-col gap-6">
              {carts?.map((item, index) => {
                return (
                  <div
                    className="cart flex flex-col gap-4 justify-center"
                    key={index}
                  >
                    <hr className="w-full text-gray-300" />
                    <div className="item-box flex gap-4">
                      <div className="img-box w-[120px] border-b-2 border-t-2 border-gray-300 flex items-center rounded-md">
                        <Image
                          src={`/${item?.product?.images[0]?.image_path}`}
                          width={0}
                          height={0}
                          layout="responsive"
                          // fill
                          alt="Product Image Cart"
                          className="object-cover aspect-square rounded-md"
                        />
                      </div>
                      <div className="item-info w-full relative">
                        <div>
                          <h2 className="text-lg font-semibold max-w-52">
                            {item.name}
                          </h2>
                          <p className="mt-3">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(item?.product?.price)}
                          </p>
                          <p className="mt-3">Ukuran: {item.size}</p>
                        </div>
                        <div className="price flex justify-between items-center mt-3">
                          <span>Total Produk: {item.quantity}</span>
                          <p className="text-xl">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(item?.product?.price * item?.quantity)}
                          </p>
                        </div>
                        <TrashButton id={item?.id} />
                      </div>
                    </div>
                    <hr className="w-full text-gray-300" />
                  </div>
                );
              })}
              <Coupon />
              <Link
                href={"/checkout"}
                className="bg-[#282828] text-white p-4 cursor-pointer text-center"
              >
                Lanjutkan
              </Link>
            </div>
          </div>
        </div>
      )}
      <Navbar />
    </>
  );
};

export default Cart;

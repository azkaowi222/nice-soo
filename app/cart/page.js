"use client";
import { ShoppingCart } from "react-feather";
import { ChevronLeft, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Title from "../components/title/Title";
import React from "react";
import Link from "next/link";
const Cart = () => {
  const [carts, setCarts] = useState([
    {
      id: null,
      name: null,
      size: null,
      price: null,
      quantity: null,
      description: null,
      rating: null,
      images: [],
    },
  ]);
  const [subTotal, setSubTotal] = useState(null);
  const [showCoupoButton, setshowCoupoButton] = useState(false);

  const handleDelete = async (id) => {
    // const cart = JSON.parse(localStorage.getItem("cart"));
    // const newCart = cart.filter((product) => product.id !== id);
    // localStorage.setItem("cart", JSON.stringify(newCart));
    // setCarts(newCart);
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/api/cart/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { items } = await response.json();
    const newCarts = items?.map((item) => {
      return {
        id: item?.id,
        name: item?.product?.name,
        size: item?.size,
        price: item?.product?.price,
        quantity: item?.quantity,
        description: item?.product?.description,
        rating: item?.product?.rating,
        images: item?.product.images,
      };
    });
    setCarts(newCarts);
  };

  const getCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await fetch(`http://localhost:8000/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { items } = await response.json();
    const newCarts = items?.map((item) => {
      return {
        id: item?.id,
        name: item?.product?.name,
        size: item?.size,
        price: item?.product?.price,
        quantity: item?.quantity,
        description: item?.product?.description,
        rating: item?.product?.rating,
        images: item?.product.images,
      };
    });
    setCarts(newCarts);
  };

  useEffect(() => {
    // const cart = JSON.parse(localStorage.getItem("cart"));
    // setCarts(cart);
    // setSubTotal(
    //   cart?.reduce(
    //     (acc, product) => acc + Number(product.price) * product.quantity,
    //     0
    //   )
    // );
    getCart();
  }, []);

  useEffect(() => {
    if (!carts) return;
    const subtotal = carts.reduce(
      (acc, product) => acc + Number(product.price) * product.quantity,
      0
    );
    setSubTotal(subtotal);
  }, [carts]);

  // console.log(cart);

  return (
    <>
      <Title title={"Keranjang Belanja"} />
      {!carts || !carts?.[0]?.name ? (
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
                          src={
                            !item.images || item.images.length === 0
                              ? "/images/no-image.png"
                              : `/${item?.images[0]?.image_path}`
                          }
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
                          <p className="mt-3">Rp. {item.price}</p>
                          <p className="mt-3">Ukuran: {item.size}</p>
                        </div>
                        <div className="price flex justify-between items-center mt-3">
                          <span>Total Produk: {item.quantity}</span>
                          <p className="text-xl">
                            Rp. {item.price * item.quantity}
                          </p>
                        </div>
                        <Trash2
                          size={20}
                          color="red"
                          onClick={() => handleDelete(item.id)}
                          className="cursor-pointer absolute top-2 right-2"
                        />
                      </div>
                    </div>
                    <hr className="w-full text-gray-300" />
                  </div>
                );
              })}
              <div className="cupon relative">
                <input
                  type="text"
                  name="cupon"
                  onChange={(e) => {
                    const isHasValue = e.target.value.length > 0;
                    if (isHasValue) {
                      setshowCoupoButton(true);
                    } else {
                      setshowCoupoButton(false);
                    }
                  }}
                  className="border focus:outline-black border-gray-300 p-4 text-xl w-full"
                  placeholder="Kode kupon (Opsional)"
                />
                <button
                  disabled={showCoupoButton}
                  className={`absolute ${
                    showCoupoButton
                      ? "bg-[#282828] text-white"
                      : "bg-[#E0E0E0] text-[#A6A6A6] "
                  } transition-all duration-500 ease-in-out top-3 cursor-pointer py-2 px-4 right-2`}
                >
                  Gunakan
                </button>
              </div>
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
    </>
  );
};

export default Cart;

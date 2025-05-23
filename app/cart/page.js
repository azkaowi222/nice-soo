"use client";
import { ShoppingCart } from "react-feather";
import { ChevronLeft, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Title from "../components/title/Title";
import React from "react";
import Link from "next/link";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(null);
  const [showCoupoButton, setshowCoupoButton] = useState(false);

  const handleDelete = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.filter((product) => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setProducts(newCart);
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    setProducts(cart);
    setSubTotal(
      cart?.reduce(
        (acc, product) => acc + Number(product.price) * product.quantity,
        0
      )
    );
  }, []);

  useEffect(() => {
    if (!products) return;
    const subtotal = products.reduce(
      (acc, product) => acc + Number(product.price) * product.quantity,
      0
    );
    setSubTotal(subtotal);
  }, [products]);

  return (
    <>
      <Title title={"Keranjang Belanja"} />
      {!products || products.length === 0 ? (
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
              {products.map((product, index) => {
                return (
                  <div
                    className="cart flex flex-col gap-4 justify-center"
                    key={index}
                  >
                    <hr className="w-full text-gray-300" />
                    <div className="item-box flex gap-4">
                      <div className="img-box w-[120px] border-b-2 border-t-2 border-gray-300 flex items-center rounded-md">
                        <Image
                          src={"/images/tupperware.jpg"}
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
                          <h2 className="text-lg font-semibold">
                            {product.name}
                          </h2>
                          <p className="mt-3">Rp. {product.price}</p>
                          <p className="mt-3">Ukuran: {product.size}</p>
                        </div>
                        <div className="price flex justify-between items-center mt-3">
                          <span>Total Produk: {product.quantity}</span>
                          <p className="text-xl">
                            Rp. {product.price * product.quantity}
                          </p>
                        </div>
                        <Trash2
                          size={20}
                          color="red"
                          onClick={() => handleDelete(product.id)}
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

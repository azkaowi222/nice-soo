"use client";
import { Link, ShoppingCart } from "react-feather";
import { ChevronLeft, Trash2, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Title from "../components/title/Title";
import React from "react";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(null);

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
      {true ? (
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
              <a
                href="/"
                className="px-4 py-2 rounded-md cursor-pointer flex items-center border border-black gap-2"
              >
                <ChevronLeft size={22} />
                Lanjutkan Belanja
              </a>
            </div>
            <div className="cart-items mt-16 flex flex-col gap-10">
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

              <div className="cupon flex flex-col gap-4">
                <input
                  type="text"
                  name="cupon"
                  className="border border-gray-300 p-4 text-xl"
                  placeholder="Kode kupon"
                />
                <button className="bg-[#282828] text-white p-4 cursor-pointer">
                  Pakai Kupon
                </button>
              </div>
            </div>
            <div className="receipt border flex flex-col gap-4 px-6 py-8">
              <h1 className="text-xl text-center mb-7">Kwitansi Belanja</h1>
              <hr className="w-full text-gray-300" />
              <div className="subtotal flex justify-between items-center">
                <h2>Subtotal</h2>
                <p>Rp. {subTotal}</p>
              </div>
              <hr className="w-full text-gray-300" />
              <div className="admin-tax flex justify-between items-center">
                <h2>Biaya Admin</h2>
                <p>Rp. 5000</p>
              </div>
              <hr className="w-full text-gray-300" />

              <div className="delivery flex justify-between items-center">
                <div>
                  <h2>Alamat Pengambilan :</h2>
                  <p>Jl. Ks. Khozim No.9, Serang, Banten 42117</p>
                </div>
                <a
                  href="https://www.google.com/maps/place/Nice+So+Ciceri+Serang/@-6.1248856,106.1713132,21z/data=!4m14!1m7!3m6!1s0x2e41f51b5ac86ea7:0xe5465472d5a74830!2sNice+So+Ciceri+Serang!8m2!3d-6.1249213!4d106.1713893!16s%2Fg%2F11q2xfnn6q!3m5!1s0x2e41f51b5ac86ea7:0xe5465472d5a74830!8m2!3d-6.1249213!4d106.1713893!16s%2Fg%2F11q2xfnn6q?entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoASAFQAw%3D%3D"
                  className="flex gap-1 items-center"
                >
                  <MapPin
                    size={20}
                    color="#282828"
                    className="cursor-pointer"
                  />
                  Maps
                </a>
              </div>
              <hr className="w-full text-gray-300" />

              <div className="total flex justify-between items-center mb-4">
                <h2>Total</h2>
                <p>Rp. {subTotal + 5000}</p>
              </div>
              <button className="bg-[#282828] text-white p-4 cursor-pointer rounded-md">
                Bayar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

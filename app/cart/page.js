"use client";
import { ShoppingCart } from "react-feather";
import { ChevronLeft, Trash2, MapPin } from "lucide-react";
import Image from "next/image";
import Quantity from "../components/quantity-selector/Quantity";
import { useState } from "react";
const Cart = ({ products = true }) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  return (
    <>
      <div className="px-2 py-5 shadow-md bg-white">
        <h1 className="text-xl font-semibold spacing tracking-wider text-center">
          Keranjang Belanja
        </h1>
      </div>
      {!products ? (
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
                className="px-4 py-2 rounded-md cursor-pointer flex items-center border gap-2"
              >
                <ChevronLeft size={22} />
                Lanjutkan Belanja
              </a>
            </div>
            <div className="cart-items mt-16 flex flex-col gap-10">
              <div className="cart flex flex-col gap-4 justify-center">
                <hr className="w-full text-gray-300" />
                <div className="item-box flex gap-4">
                  <Image
                    src={"/images/tupperware.jpg"}
                    width={150}
                    height={150}
                    alt="Product Image Cart"
                    className="object-cover aspect-square rounded-md"
                  />
                  <div className="item-info w-full relative">
                    <div>
                      <h2 className="text-xl font-semibold">Tupperware Emak</h2>
                      <p className="mt-3 mb-6 text-lg">Rp. 10.000</p>
                    </div>
                    <div className="price flex justify-between items-center">
                      <Quantity
                        decreaseQuantity={decreaseQuantity}
                        quantity={quantity}
                        increaseQuantity={increaseQuantity}
                      />
                      <p className="text-xl">Rp. {10000 * quantity}</p>
                    </div>
                    <Trash2
                      size={20}
                      color="red"
                      className="cursor-pointer absolute top-2 right-2"
                    />
                  </div>
                </div>
                <hr className="w-full text-gray-300" />
              </div>
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
                <p>Rp. {10000 * quantity}</p>
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
                <p>Rp. {10000 * quantity + 5000}</p>
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

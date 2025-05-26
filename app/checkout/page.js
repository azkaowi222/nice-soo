"use client";

import React from "react";
import Title from "../components/title/Title";
import { Ellipsis, Notebook, Trash2, TicketPercent, Truck } from "lucide-react";
import Image from "next/image";
import { ChevronRight, MapPin } from "react-feather";

const Checkout = () => {
  const product = {};
  const user = {};

  // Misalnya di file: pages/checkout.tsx atau komponen CheckoutForm.tsx
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // accept: "application/json", // jika pakai auth token
        },
        body: JSON.stringify({
          shipping_address: "Jl. Merdeka No. 123, Jakarta",
          shipping_cost: 10000,
          promo_code: null,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log("Checkout sukses:", data);
        // redirect user ke Midtrans payment page:
        window.location.href = data.payment_url;
      } else {
        console.error("Gagal checkout:", data.message);
      }
    } catch (error) {
      console.error("Error saat checkout:", error);
    }
  };

  return (
    <div>
      <Title title={"Checkout"} center={false} hasIcon={true} />
      <div className="mt-5 p-3 shadow-md bg-white">
        <h1 className="text-xl font-medium">Alamat Pengiriman</h1>
        <div className="flex justify-between mt-5">
          <div className="flex items-center gap-1.5">
            <MapPin size={18} />
            <p>
              {user?.address ?? "Jl. Salira indah kp.kedungsoka, Pulo Ampel"}
            </p>
          </div>
          <ChevronRight />
        </div>
      </div>
      <div className="cart flex flex-col gap-4 justify-center mt-4 bg-white shadow-md mb-5 py-4">
        <hr className="w-full text-gray-300" />
        <div className="item-box flex gap-4 px-4">
          <div className="img-box w-[120px] border-b-2 border-t-2 border-gray-300 flex items-center rounded-md">
            <Image
              src={"/images/tupperware.jpg"}
              width={0}
              height={0}
              layout="responsive"
              alt="Product Image Cart"
              className="object-cover aspect-square rounded-md"
            />
          </div>
          <div className="item-info w-full relative">
            <div>
              <h2 className="text-lg font-semibold">
                {product?.name ?? "Tupperware emak"}
              </h2>
              <p className="mt-3">Rp. {product?.price ?? 10000}</p>
              <p className="mt-3">Ukuran: {product?.size ?? "XL"}</p>
            </div>
            <div className="price flex justify-between items-center mt-3">
              <span>Total Produk: {product?.quantity ?? 4}</span>
              <p className="text-xl">
                Rp. {product?.price * product?.quantity}
              </p>
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
      <div
        id="data-user-order"
        className="p-4 flex flex-col gap-4 bg-white shadow-md mb-5"
      >
        <h1 className="font-semibold text-xl tracking-wide mb-3">
          Detail Pemesan
        </h1>
        <div className="nameOfOrder-box relative">
          <input
            type="text"
            id="nameOfOrder"
            className="border-2 p-3 w-full bg-white"
            required
            value={"Arman Maulana"}
            readOnly
          ></input>
          <label
            htmlFor="nameOfOrder"
            className="absolute top-3 left-4 transition-all duration-300 ease-in-out pointer-events-none"
          >
            Nama Pemesan *
          </label>
        </div>
        <div className="message-box relative">
          <input
            type="text"
            id="message"
            className="border-2 p-3 w-full bg-white"
            required
          ></input>
          <label
            htmlFor="message"
            className="absolute top-3 left-4 transition-all duration-300 ease-in-out pointer-events-none"
          >
            Pesan untuk Penjual
          </label>
        </div>
      </div>

      <div id="delivery" className="p-4 flex flex-col gap-4 bg-white shadow-md">
        <div id="delivey-courier" className="flex justify-between">
          <h1 className="font-semibold text-xl tracking-wide mb-3">
            Opsi Pengiriman
          </h1>
          <Ellipsis />
        </div>
        <div id="shipment" className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h3 id="description" className="font-bold">
              Regular
            </h3>
            <div className="flex gap-2 items-center">
              <p className="cost">Rp16.000</p>
              <TicketPercent size={22} color="green" />
            </div>
          </div>
          <span className="etd flex gap-2 text-green-600">
            <Truck color="green" />
            Estimasi tiba: 2-3 hari
          </span>
          <p className="offer">
            Dapatkan Voucher s/d Rp10.000 jika pesanan belum tiba lebih dari 3
            hari.
          </p>
        </div>
      </div>

      <div className="receipt border flex flex-col gap-4 px-6 py-8 mt-8">
        <div className="flex gap-2 items-center">
          <Notebook className="border-yellow-500" />
          <h1 className="text-xl">Rincian Pembayaran</h1>
        </div>
        <hr className="w-full text-gray-300" />
        <div className="subtotal flex justify-between items-center">
          <h2>Subtotal</h2>
          <p>Rp. {0}</p>
        </div>
        <hr className="w-full text-gray-300" />
        <div className="admin-tax flex justify-between items-center">
          <h2>Biaya Admin</h2>
          <p>Rp. 5000</p>
        </div>
        <hr className="w-full text-gray-300" />

        <div className="total flex justify-between items-center mb-4">
          <h2>Total</h2>
          <p>Rp. {0 + 5000}</p>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-[#282828] text-white p-4 cursor-pointer rounded-md"
        >
          Bayar
        </button>
      </div>
    </div>
  );
};

export default Checkout;

"use client";

import React from "react";
import { useState } from "react";
import { Ellipsis, TicketPercent, Truck, Notebook } from "lucide-react";
import Loader from "../loader/Loader";
export const Delivery = ({ shipping, subtotal }) => {
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [isShowCourierBox, setIsShowCourierBox] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(shipping[0]);
  const [otherShipping, setOtherShipping] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      console.log(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/checkout`);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "application/json", // jika pakai auth token
          },
          body: JSON.stringify({
            shipping_cost: selectedShipping?.cost,
          }),
        }
      );

      const { transaction, message } = await response.json();
      setIsLoading(false);
      if (transaction?.token) {
        snap.pay(transaction.token);
      } else {
        console.error("Gagal checkout:", message);
      }
    } catch (error) {
      console.error("Error saat checkout:", error);
    }
  };

  return (
    <div>
      <div id="delivery" className="p-4 flex flex-col gap-4 bg-white shadow-md">
        <div id="delivey-courier" className="flex justify-between">
          <h1 className="font-semibold text-xl tracking-wide mb-3">
            Opsi Pengiriman
          </h1>
          <Ellipsis
            onClick={() => {
              setIsShowOverlay(true);
              setIsShowCourierBox(true);
            }}
          />
        </div>
        <div id="shipment" className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h3 id="description" className="font-bold tracking-wider">
              {selectedShipping?.description}
            </h3>
            <div className="flex gap-2 items-center">
              <p className="cost">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(selectedShipping?.cost ?? 0)}
              </p>
              <TicketPercent size={22} color="green" />
            </div>
          </div>
          <span className="etd flex gap-2 text-green-600">
            <Truck color="green" />
            Estimasi tiba:{" "}
            {!selectedShipping?.etd ? "± 3 day" : selectedShipping?.etd}
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
          <p>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(subtotal)}
          </p>
        </div>
        <hr className="w-full text-gray-300" />
        <div className="admin-tax flex justify-between items-center">
          <h2>Ongkos Kirim</h2>
          <p>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(selectedShipping?.cost)}
          </p>
        </div>
        <hr className="w-full text-gray-300" />

        <div className="total flex justify-between items-center mb-4">
          <h2>Total</h2>
          <p>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(subtotal + selectedShipping?.cost)}
          </p>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-[#282828] text-white p-4 cursor-pointer rounded-md"
        >
          Bayar
        </button>
      </div>
      <Loader isLoading={isLoading} />
      <div
        id="courierBox"
        className={`bg-[#393E46] rounded-t-sm fixed bottom-0 w-full z-20 ${
          isShowCourierBox ? "translate-y-0" : "translate-y-full"
        }  transition-all duration-300 ease-in-out`}
      >
        <div className="h-full px-2.5 py-4">
          <h3 className="font-semibold tracking-wide mb-4 text-white">
            Opsi Pengiriman Lainnya
          </h3>
          <ul>
            {shipping?.map((item, index) => {
              return (
                <li
                  onClick={() => setOtherShipping(item)}
                  key={index}
                  className={`p-2 border-2 ${
                    item?.description === otherShipping?.description
                      ? "border-blue-500"
                      : "border-gray-300"
                  } mb-4 rounded-sm text-white`}
                >
                  <div className="flex justify-between mb-2">
                    <p>{item?.description}</p>
                    <p>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(item?.cost)}
                    </p>
                  </div>
                  <span className="etd flex gap-2 text-green-600">
                    <Truck color="green" />
                    Estimasi tiba: {!item?.etd ? "± 3 day" : item?.etd}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-evenly gap-4">
            <button
              onClick={() => {
                setIsShowOverlay(false);
                setIsShowCourierBox(false);
                setSelectedShipping(otherShipping);
              }}
              className="py-3  bg-blue-500 text-white rounded-md w-full"
            >
              Ganti Opsi Pengiriman
            </button>
            <button
              onClick={() => {
                setIsShowOverlay(false);
                setIsShowCourierBox(false);
                setOtherShipping(selectedShipping);
              }}
              className="py-3  bg-red-500 text-white rounded-md w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          isShowOverlay ? "block" : "hidden"
        } overlay fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center`}
      ></div>
    </div>
  );
};

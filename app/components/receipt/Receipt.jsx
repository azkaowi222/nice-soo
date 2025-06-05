import { useState } from "react";
import { Notebook } from "lucide-react";
export const Receipt = ({ subtotal }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
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
    </div>
  );
};

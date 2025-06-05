import Title from "@/app/components/title/Title";
import Image from "next/image";
import { ChevronRight, MapPin } from "react-feather";
import Link from "next/link";
import { cookies } from "next/headers";
import { Delivery } from "@/app/components/delivery/Delivery";

const Checkout = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  let user, cartItems, shipping, subtotal;

  try {
    const [userResponse, cartItemsResponse, shippingResponse] =
      await Promise.all([
        fetch("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token.value}`,
            Accept: "application/json",
          },
          cache: "no-store",
        }),
        fetch("http://localhost:8000/api/cart", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
          cache: "no-store",
        }),
        fetch("http://localhost:3000/api/shipping", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
          cache: "no-store",
        }),
      ]);
    [user, { items: cartItems }, { data: shipping }] = await Promise.all([
      userResponse.json(),
      cartItemsResponse.json(),
      shippingResponse.json(),
    ]);
    subtotal = cartItems?.reduce(
      (acc, product) => acc + product.product.price * product.quantity,
      0
    );
    // console.log(cartItems, shipping);
  } catch (error) {
    console.error(`Error message: ${error?.message}`);
    return (
      <div className="h-screen flex items-center, justify-center">
        <p>Ada yang error: {error?.message}</p>
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden -my-20">
      <Title title={"Checkout"} center={false} hasIcon={true} />
      <div className="mt-5 p-3 shadow-md bg-white">
        <h1 className="text-xl font-medium">Alamat Pengiriman</h1>
        <Link href={"/profile/info-profile"}>
          <div className="flex justify-between mt-5">
            <div className="flex items-center gap-1.5">
              <MapPin size={18} />
              <p>{user?.address}</p>
            </div>
            <ChevronRight />
          </div>
        </Link>
      </div>
      <div className="cart flex flex-col gap-4 justify-center mt-4 bg-white shadow-md mb-5 py-4">
        {cartItems?.map((item, index) => {
          return (
            <div key={index}>
              <hr className="w-full text-gray-300 mb-4" />
              <div className="item-box flex gap-4 px-4">
                <div className="img-box w-[120px] border-b-2 border-t-2 border-gray-300 flex items-center rounded-md">
                  <Image
                    src={`http://localhost:8000/storage/${item?.product?.images?.[0]?.image_path}`}
                    width={0}
                    height={0}
                    layout="responsive"
                    alt="Product Image Cart"
                    className="object-cover aspect-square rounded-md"
                  />
                </div>
                <div className="item-info w-full relative">
                  <div>
                    <h2 className="text-lg font-semibold ">
                      {item?.product?.name}
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
                    <span>Quantity: {item?.quantity}</span>
                    <p className="text-xl">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(item?.product?.price * item?.quantity)}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="w-full text-gray-300 mt-4" />
            </div>
          );
        })}
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
            value={user?.first_name ?? "Customer"}
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
      <Delivery shipping={shipping} subtotal={subtotal} />

      {/* <div id="delivery" className="p-4 flex flex-col gap-4 bg-white shadow-md">
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
      </div> */}

      {/* <div className="receipt border flex flex-col gap-4 px-6 py-8 mt-8">
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
      </div> */}
      {/* <div
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
      </div> */}
      {/* <div
        className={`${
          isShowOverlay ? "block" : "hidden"
        } overlay fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center`}
      ></div> */}
      {/* <Loader isLoading={isLoading} /> */}
    </div>
  );
};

export default Checkout;

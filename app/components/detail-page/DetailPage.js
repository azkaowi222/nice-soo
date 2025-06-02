"use client";
import { ChevronLeft, ChevronRight, ChevronDown, Heart } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Tabs from "@/app/components/tabs/Tabs";
import Image from "next/image";
import Quantity from "@/app/components/quantity-selector/Quantity";
import { useEffect, useState, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DetailPage = ({ product }) => {
  const [imageWidth, setImageWidth] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const imageRef = useRef(null);

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8000/api/cart/items", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: id,
        size,
        quantity,
      }),
    });
    if (response.status !== 200) {
      return alert("produk gagal ditambahkan");
    }
    alert("produk success ditambahkan");
  };

  useEffect(() => {
    if (typeof window !== "undefined" && imageRef.current) {
      const height = imageRef.current.clientWidth / 2;
      const size = Math.floor(height);
      setImageWidth(size.toString() + "px");
    }
    // getProductById();
  }, []);
  if (!product) return null;
  return (
    <div>
      <div
        className={`nav-btns absolute ${
          !imageWidth ? "hidden" : ""
        } w-full flex justify-between items-center z-[5] px-7`}
        style={{ top: imageWidth }}
      >
        <div className="prev-btn hover:bg-[#abb8c3] hover:rounded-full hover:opacity-50 p-1">
          <ChevronLeft
            size={25}
            className="custom-prev hover:text-yellow-300"
          />
        </div>
        <div className="next-btn hover:bg-[#abb8c3] hover:rounded-full hover:opacity-50 p-1">
          <ChevronRight
            size={25}
            className="custom-next hover:text-yellow-300"
          />
        </div>
      </div>

      <Swiper
        loop
        slidesPerView={1}
        allowTouchMove={false}
        draggable={false}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true,
        }}
      >
        <SwiperSlide>
          <Image
            src={
              !product.images
                ? "/images/no-image.png"
                : `/${product.images[0].image_path}`
            }
            alt="Product Image"
            ref={imageRef}
            priority
            width={200}
            height={200}
            className="w-[90%] object-cover aspect-square mx-auto"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={
              !product.images
                ? "/images/no-image.png"
                : `/${product.images[0].image_path}`
            }
            alt="Product Image"
            width={200}
            priority
            height={200}
            className="w-[90%] object-cover aspect-square mx-auto"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={
              !product.images
                ? "/images/no-image.png"
                : `/${product.images[0].image_path}`
            }
            alt="Product Image"
            width={200}
            priority
            height={200}
            className="w-[90%] object-cover aspect-square mx-auto"
          />
        </SwiperSlide>
      </Swiper>
      <div className="details p-4 flex flex-col gap-4">
        <h3 className="text-2xl font-semibold">{product.name}</h3>
        <p>
          {new Intl.NumberFormat("en-ID", {
            style: "currency",
            currency: "IDR",
          }).format(Number(product.price))}
        </p>
        <div className="size flex gap-6 relative items-center">
          <h3>Ukuran</h3>
          <ChevronDown
            size={18}
            id="ukuran"
            className="absolute left-40 translate-x-2 top-2.5 pointer-events-none"
          />
          <select
            className="cursor-pointer p-2 text-sm appearance-none pr-8 outline-none border border-gray-300 rounded-md"
            id="ukuran"
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="pilih">Pilih ukuran</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <Quantity quantity={quantity} setQuantity={setQuantity} />
        <div className="btn-act flex gap-4 items-center">
          <Heart size={30} className="text-red-600 cursor-pointer" />
          <button
            onClick={() => handleAddToCart(product.id)}
            className="border border-gray-300 w-full p-2 rounded-md bg-[#585858] text-white hover:bg-[#484848] cursor-pointer"
          >
            Tambah ke Keranjang
          </button>
        </div>
        <hr className="border-gray-300" />
        <h2>Kategori: {product.category.name}</h2>
      </div>
      <Tabs />
    </div>
  );
};

export default DetailPage;

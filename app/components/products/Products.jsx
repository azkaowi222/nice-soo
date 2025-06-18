"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Loader from "../loader/Loader";
export const Products = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="box-product grid grid-cols-2 gap-4 mt-4 md:flex md:gap-2">
      {data?.map((item, index) => {
        const price = new Intl.NumberFormat("en-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(Number(item.price));
        return (
          <Link
            href={`/product/${item.category.slug}/${item.id}`}
            key={index}
            onClick={() => setIsLoading(true)}
            className="box-item md:w-40"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.images[0]?.image_path}`}
              width={400}
              height={400}
              alt="product"
              className="bg-white shadow-md rounded-md md:w-60 md:h-40 aspect-square object-contain p-4 border"
            />
            <div>
              <h2 className="text-sm font-semibold mt-2">{item.name}</h2>
            </div>
            <p className="text-sm mt-2">{price}</p>
          </Link>
        );
      })}
      <Loader isLoading={isLoading} />
    </div>
  );
};

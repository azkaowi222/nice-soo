import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Products } from "@/app/components/products/Products";
const NewProduct = ({ data, newProduct }) => {
  return (
    <div className="p-4 products-box">
      <div>
        <h1
          className={`text-xl font-semibold mb-2 products-title ${
            !newProduct && "text-center mt-8"
          }`}
        >
          {newProduct ? "Product Terbaru" : "---- Kamu Mungkin Juga Suka ----"}
        </h1>
      </div>
      <Products data={data} />
    </div>
  );
};

export default NewProduct;

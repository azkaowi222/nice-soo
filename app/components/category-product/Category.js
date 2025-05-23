import Image from "next/image";
import React from "react";

const Category = () => {
  return (
    <div
      className="w-full mt-2 p-4 pb-10 category-box md:relative"
      style={{ backgroundColor: "#D61F31" }}
    >
      <div className="title flex items-center justify-between pr-2">
        <h1 className="text-xl font-semibold text-white">Kategori Produk</h1>
        <span className="text-4xl text-white arrow md:hidden">&rarr;</span>
      </div>
      <div className="box-category flex gap-3 overflow-x-auto overflow-y-hidden mt-4">
        <Image
          src={
            "https://dorangadget.com/wp-content/uploads/2023/04/Category-HOME-ELEC.jpg"
          }
          alt="home-electronic"
          width={169}
          height={169}
          className="rounded-md box-item"
        />
        <Image
          src={
            "https://dorangadget.com/wp-content/uploads/2023/04/Category-HOME-ELEC.jpg"
          }
          alt="home-electronic"
          width={169}
          height={169}
          className="rounded-md box-item"
        />
        <Image
          src={
            "https://dorangadget.com/wp-content/uploads/2023/04/Category-SMARTPHONE-TABLET-400x400.jpg"
          }
          alt="smartphone-tablet"
          width={169}
          height={169}
          className="rounded-md box-item"
        />
        <Image
          src={
            "https://dorangadget.com/wp-content/uploads/2023/04/Category-SMARTPHONE-TABLET-400x400.jpg"
          }
          alt="smartphone-tablet"
          width={169}
          height={169}
          className="rounded-md box-item"
        />
        <Image
          src={
            "https://dorangadget.com/wp-content/uploads/2023/04/Category-SMARTPHONE-TABLET-400x400.jpg"
          }
          alt="smartphone-tablet"
          width={169}
          height={169}
          className="rounded-md box-item"
        />
      </div>
    </div>
  );
};

export default Category;

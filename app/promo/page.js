import Image from "next/image";
import Title from "../components/title/Title";
import React from "react";
const Promo = ({ products }) => {
  return (
    <>
      <Title title={"Promo Hari Ini"} />
      {!products ? (
        <div className="flex flex-col gap-8 justify-center items-center h-[458px]">
          <div className="flex flex-col gap-3 justify-center items-center">
            <Image
              src={"/images/promotion.png"}
              width={150}
              height={150}
              alt="promotion"
            />
            <p>Maaf, belum ada promo untuk saat ini</p>
          </div>
        </div>
      ) : (
        <div>product ada</div>
      )}
    </>
  );
};

export default Promo;

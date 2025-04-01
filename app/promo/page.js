import Image from "next/image";
const Promo = ({ products }) => {
  return (
    <>
      <div className="px-2 py-5 shadow-md bg-white">
        <h1 className="text-xl font-semibold spacing tracking-wider text-center">
          Promo Hari Ini
        </h1>
      </div>
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

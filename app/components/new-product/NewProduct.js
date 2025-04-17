import Image from "next/image";
const NewProduct = ({ data, newProduct }) => {
  //   console.log(data);
  return (
    <div className="p-4 products-box">
      <h1 className="text-xl font-semibold mb-2 products-title">
        Produk {newProduct ? "Terbaru" : "Serupa"}
      </h1>
      <div className="box-product grid grid-cols-2 gap-4 mt-4 md:flex md:gap-2">
        {data?.map((item, index) => {
          const price = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(Number(item.price));
          return (
            <a href="/product" key={index} className="box-item md:w-40">
              <Image
                src={item.image}
                width={400}
                height={400}
                alt="product"
                className="bg-white shadow-md rounded-md md:w-60 md:h-40 aspect-square object-contain p-4 border"
              />
              <div>
                <h2 className="text-sm font-semibold mt-2">{item.title}</h2>
              </div>
              <p className="text-sm mt-2">{price}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default NewProduct;

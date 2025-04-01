import Image from "next/image";

const TopSlider = () => {
  return (
    <div className="top-slider w-full">
      <Image
        src={"/images/slider-img.webp"}
        width={600}
        height={400}
        alt="placeholder"
        className="object-cover w-full max-h-96"
      />
    </div>
  );
};

export default TopSlider;

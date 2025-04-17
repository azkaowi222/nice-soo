import Image from "next/image";
import { ChevronLeft } from "lucide-react";
const Review = () => {
  return (
    <div className="p-4">
      <div className="back-btn flex justify-center">
        <a
          href="/profile"
          className="px-4 py-2 rounded-md cursor-pointer flex items-center border gap-2"
        >
          <ChevronLeft size={22} />
          Kembali
        </a>
      </div>
      <div className="flex items-center justify-center flex-col mt-16 gap-4">
        <Image
          src={"https://makanbang.id/static/images/decoration/empty_data.svg"}
          width={150}
          height={150}
          alt="empty-review"
          style={{ objectFit: "cover" }}
        />
        <p className="text-lg text-gray-500">Belum ada Ulasan</p>
      </div>
    </div>
  );
};

export default Review;

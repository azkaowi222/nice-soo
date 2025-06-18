import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import React from "react";
import TopNavbar from "@/app/components/navbar/top-nav/TopNav";
import Navbar from "@/app/components/navbar/Navbar";
import Link from "next/link";
import { cookies } from "next/headers";
import { Star, UserCircle } from "lucide-react";
const Review = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-reviews`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }
  );
  const reviews = await response.json();
  return (
    <>
      <TopNavbar />
      <div className="p-4">
        <div className="back-btn flex justify-center">
          <Link
            href="/profile"
            className="px-4 py-2 rounded-md cursor-pointer flex items-center border gap-2"
          >
            <ChevronLeft size={22} />
            Kembali
          </Link>
        </div>
        <div className="flex items-center justify-center flex-col mt-16 gap-4">
          {reviews?.length === 0 ? (
            <>
              <Image
                src={
                  "https://makanbang.id/static/images/decoration/empty_data.svg"
                }
                width={150}
                height={150}
                alt="empty-review"
                style={{ objectFit: "cover" }}
              />
              <p className="text-lg text-gray-500">Belum ada Ulasan</p>
            </>
          ) : (
            reviews?.map((review) => {
              return (
                <div key={review.id} className="mt-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <UserCircle size={30} strokeWidth={1.5} />
                      <p>
                        {review.user.first_name} {review.user.last_name}
                      </p>
                    </div>
                    <div>
                      <div className="flex gap-1">
                        <p>Rating : </p>
                        <Star
                          fill={review.rating >= 1 ? "#FFD700" : "white"}
                          className="cursor-pointer"
                          size={25}
                          strokeWidth={1.5}
                          stroke={review.rating >= 1 ? "#FFD700" : "black"}
                        />
                        <Star
                          fill={review.rating >= 2 ? "#FFD700" : "white"}
                          className="cursor-pointer"
                          size={25}
                          strokeWidth={1.5}
                          stroke={review.rating >= 2 ? "#FFD700" : "black"}
                        />
                        <Star
                          fill={review.rating >= 3 ? "#FFD700" : "white"}
                          className="cursor-pointer"
                          size={25}
                          strokeWidth={1.5}
                          stroke={review.rating >= 3 ? "#FFD700" : "black"}
                        />
                        <Star
                          fill={review.rating >= 4 ? "#FFD700" : "white"}
                          className="cursor-pointer"
                          size={25}
                          stroke={review.rating >= 4 ? "#FFD700" : "black"}
                          strokeWidth={1.5}
                        />
                        <Star
                          fill={review.rating >= 5 ? "#FFD700" : "white"}
                          className="cursor-pointer"
                          size={25}
                          strokeWidth={1.5}
                          stroke={review.rating >= 5 ? "#FFD700" : "black"}
                        />
                      </div>
                      <p>Komentar : {review.comment}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Review;

"use client";
import { useState } from "react";
import { Star, User, UserCircle } from "lucide-react";
import React from "react";
import { redirect } from "next/navigation";
const Tabs = ({ description, reviews, id }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [activeStar, setActiveStar] = useState(0);
  const [review, setReview] = useState({
    rating: activeStar,
    comment: "",
  });

  const handleAddReview = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/login");
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reviews`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(review),
      }
    );
    const { message } = await response.json();
    alert(!message ? "success" : message);
  };

  return (
    <div className="tab-content-box flex items-center justify-center">
      <div className="nav-details px-4 mt-2 flex flex-col items-center gap-1 w-full">
        <div className="flex flex-col items-center">
          <button
            className={`font-semibold tracking-wide cursor-pointer ${
              activeTab === "description" ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Deskripsi Produk
          </button>
          <hr
            className={`hr-tab bg-black ${
              activeTab === "description" ? "active" : ""
            }`}
          />
          {/* {activeTab === "description" && <hr className={`bg-black hr-tab`} />} */}
        </div>
        <div className="flex flex-col items-center">
          <button
            className={`font-semibold tracking-wide cursor-pointer ${
              activeTab === "information" ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("information")}
          >
            Informasi Lainnya
          </button>
          <hr
            className={`hr-tab bg-black ${
              activeTab === "information" ? "active" : ""
            }`}
          />
        </div>
        <div className="flex flex-col items-center">
          <button
            className={`font-semibold tracking-wide cursor-pointer ${
              activeTab === "rating" ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("rating")}
          >
            Rating & Ulasan
          </button>
          <hr
            className={`hr-tab bg-black ${
              activeTab === "rating" ? "active" : ""
            }`}
          />
        </div>
        <div className="tab-content w-full">
          {activeTab === "description" && (
            <div className="description-tab">
              <h2 className="mt-4 font-semibold text-lg">Deskripsi</h2>
              <p>{description}</p>
            </div>
          )}
          {activeTab === "information" && (
            <div className="information-tab">
              <h2 className="mt-4 font-semibold text-lg">Informasi</h2>
              <p>Tidak ada Informasi lainnya mengenai produk ini.</p>
            </div>
          )}
          {activeTab === "rating" && (
            <div className="rating-tab flex flex-col mt-4 gap-2">
              <h2 className="font-semibold text-lg">Rating & Ulasan</h2>
              {reviews.length === 0 ? (
                <p>
                  Belum ada rating dan ulasan untuk produk ini. Ayo jadi yang
                  pertama memberikan rating dan ulasan.
                </p>
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

              <div className="rate flex flex-col justify-center items-center gap-2">
                <div className="stars flex bg-[#F8F8F8] gap-4 p-4">
                  <h3 className="font-semibold">Rating:</h3>
                  <Star
                    fill={activeStar >= 1 ? "#FFD700" : "white"}
                    className="cursor-pointer"
                    size={25}
                    onClick={() => {
                      setActiveStar(1);
                      setReview({ ...review, rating: 1 });
                    }}
                  />
                  <Star
                    fill={activeStar >= 2 ? "#FFD700" : "white"}
                    className="cursor-pointer"
                    size={25}
                    onClick={() => {
                      setActiveStar(2);
                      setReview({ ...review, rating: 2 });
                    }}
                  />
                  <Star
                    fill={activeStar >= 3 ? "#FFD700" : "white"}
                    className="cursor-pointer"
                    size={25}
                    onClick={() => {
                      setActiveStar(3);
                      setReview({ ...review, rating: 3 });
                    }}
                  />
                  <Star
                    fill={activeStar >= 4 ? "#FFD700" : "white"}
                    className="cursor-pointer"
                    size={25}
                    onClick={() => {
                      setActiveStar(4);
                      setReview({ ...review, rating: 4 });
                    }}
                  />
                  <Star
                    fill={activeStar >= 5 ? "#FFD700" : "white"}
                    className="cursor-pointer"
                    size={25}
                    onClick={() => {
                      setActiveStar(5);
                      setReview({ ...review, rating: 5 });
                    }}
                  />
                </div>
                <textarea
                  name="rating"
                  id="rating"
                  value={review.comment}
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                  placeholder="Tulis ulasan anda disini..."
                  className="border-3 rounded-md outline-none border-gray-300 pb-20 px-3 py-3 text-xl w-full focus:border-black"
                ></textarea>
              </div>
              <div className="text-center mt-3">
                <button
                  onClick={handleAddReview}
                  className="bg-[#585858] w-fit text-white p-3.5 rounded-md cursor-pointer"
                >
                  Kirim Ulasan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

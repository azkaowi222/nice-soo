import { useState } from "react";
import { Star } from "lucide-react";
import React from "react";
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [activeStar, setActiveStar] = useState(0);
  return (
    <div className="tab-content-box flex items-center justify-center">
      <div className="nav-details px-4 mt-2 flex flex-col items-center gap-1 w-fit">
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
        <div className="tab-content">
          {activeTab === "description" && (
            <div className="description-tab">
              <h2 className="mt-4 font-semibold text-lg">Deskripsi</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Inventore sed quas iusto molestiae consequuntur ea?
              </p>
            </div>
          )}
          {activeTab === "information" && (
            <div className="information-tab">
              <h2 className="mt-4 font-semibold text-lg">Informasi</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Inventore sed quas iusto molestiae consequuntur ea?
              </p>
            </div>
          )}
          {activeTab === "rating" && (
            <div className="rating-tab flex flex-col mt-4 gap-2">
              <h2 className="font-semibold text-lg">Rating & Ulasan</h2>
              <p>
                Belum ada rating dan ulasan untuk produk ini. Ayo jadi yang
                pertama memberikan rating dan ulasan.
              </p>
              <div className="rate flex flex-col justify-center items-center gap-2">
                <div className="stars flex bg-[#F8F8F8] gap-4 p-4">
                  <h3 className="font-semibold">Rating:</h3>
                  <Star
                    fill={activeStar >= 1 ? "#FFD700" : "white"}
                    className="cursor-pointer"
                    size={25}
                    onClick={() => setActiveStar(1)}
                  />
                  <Star
                    fill={activeStar >= 2 ? "#FFD700" : "white"}
                    className="cursor-pointer"
                    size={25}
                    onClick={() => setActiveStar(2)}
                  />
                  <Star
                    fill={activeStar >= 3 ? "#FFD700" : "white"}
                    className="cursor-pointer"
                    size={25}
                    onClick={() => setActiveStar(3)}
                  />
                  <Star
                    fill={activeStar >= 4 ? "#FFD700" : "white"}
                    className="cursor-pointer"
                    size={25}
                    onClick={() => setActiveStar(4)}
                  />
                  <Star
                    fill={activeStar >= 5 ? "#FFD700" : "white"}
                    className="cursor-pointer"
                    size={25}
                    onClick={() => setActiveStar(5)}
                  />
                </div>
                <textarea
                  name="rating"
                  id="rating"
                  placeholder="Tulis ulasan anda disini..."
                  className="border-3 rounded-md outline-none border-gray-300 pb-20 px-3 py-3 text-xl w-full focus:border-black"
                ></textarea>
              </div>
              <div className="text-center mt-3">
                <button className="bg-[#585858] w-fit text-white p-3.5 rounded-md cursor-pointer">
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

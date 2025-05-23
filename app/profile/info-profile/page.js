"use client";

import getUser from "@/app/utils/getUser";
import Image from "next/image";
import {
  ChevronLeft,
  CircleUserRoundIcon,
  SquarePen,
  Phone,
  Mail,
  Mars,
  CalendarDays,
  MapPinned,
  Venus,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

const InfoProfile = () => {
  const [user, setUser] = useState({
    first_name: null,
    last_name: null,
    email: null,
    address: null,
    phone: null,
    gender: null,
    birth_place: null,
    birth_date: null,
  });
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [isEditGender, setIsEditGender] = useState(false);
  const [activeGender, setActiveGender] = useState("male");
  const [shouldSave, setShouldSave] = useState(false);
  const [isInputDate, setIsInputDate] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const ref = useRef(null);

  const handleEdit = (field, value) => {
    setUser((prev) => ({
      ...prev,
      last_name: null,
      [field]: value,
    }));
  };

  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  const handleSave = async (isRef = true) => {
    setIsShowOverlay(false);
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...user,
        gender: activeGender,
        birth_date: birthDate ?? user.birth_date,
      }),
    });
    const data = await response.json();
    console.log(data);
    setUser((prev) => ({
      ...prev,
      gender: data?.user?.gender,
      birth_date: data?.user?.birth_date,
      birth_place: data?.user?.birth_place,
    }));
    if (isRef) {
      ref.current.value = null;
    }
    setBirthDate(null);
  };

  const handleGenderChange = (gender) => {
    setUser((prev) => ({
      ...prev,
      gender,
    }));
  };

  const renderEditField = () => {
    let title = "";
    let label = "";
    let fieldKey = "";

    switch (editingField) {
      case "address":
        title = "Ganti Alamat";
        label = "Alamat Lengkap *";
        fieldKey = "address";
        break;
      case "fullName":
        title = "Ganti Nama";
        label = "Nama Lengkap *";
        fieldKey = "first_name";
        break;
      case "phone":
        title = "Ganti No.HP";
        label = "Nomer *";
        fieldKey = "phone";
        break;
      case "ttl":
        title = "Tempat & Tanggal Lahir";
        label = "Tempat Lahir *";
        fieldKey = "birth_place";
        break;

      default:
        return null;
    }
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current.value.trim() === "") return;
          handleEdit(fieldKey, ref.current.value);
          setShouldSave(true);
        }}
      >
        <div className="flex flex-col gap-3">
          <h3 className="font-bold tracking-wide">{title}</h3>
          <p>Masukkan {label}</p>
          <div className="email-box relative mt-3">
            <input
              type="text"
              ref={ref}
              id="email"
              // value={FormData[fieldKey] || ""}
              className="border p-3 rounded-sm w-full bg-white"
              required
            ></input>
            {isInputDate && (
              <input
                type="date"
                onChange={handleBirthDateChange}
                id="date"
                className="border p-3 rounded-sm w-full bg-white mt-5"
                required
              ></input>
            )}
            <label
              htmlFor={fieldKey}
              className="absolute top-3 left-4 transition-all duration-300 ease-in-out pointer-events-none"
            >
              {label}
            </label>
          </div>
          <div className="flex gap-8 mt-4 justify-end">
            <button
              onClick={() => {
                setIsShowOverlay(false);
                setEditingField(null);
                setIsInputDate(false);
              }}
              className="text-[#808080] font-medium"
            >
              Batal
            </button>
            <button type="submit" className="text-[#F54336] font-medium">
              Simpan
            </button>
          </div>
        </div>
      </form>
    );
  };

  useEffect(() => {
    getUser()
      .then(
        ({
          first_name,
          last_name,
          email,
          address,
          phone,
          gender,
          birth_place,
          birth_date,
        }) => {
          setUser({
            first_name,
            last_name,
            email,
            address,
            phone,
            gender,
            birth_place,
            birth_date,
          });
        }
      )
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (shouldSave) {
      handleSave(editingField ? true : false);
      setShouldSave(false); // reset agar tidak loop
    }
  }, [user]);

  // useEffect(() => {
  //   handleGenderChange(activeGender);
  // }, [activeGender]);
  return (
    <>
      <div className="p-4 relative">
        <div className="back-btn flex justify-center">
          <a
            href="/profile"
            className="px-4 py-2 rounded-md cursor-pointer flex items-center border gap-2"
          >
            <ChevronLeft size={22} />
            Kembali
          </a>
        </div>
        <div className="info-profile mt-16">
          <div className="name-box flex gap-3 items-center p-4 rounded-md bg-white">
            <CircleUserRoundIcon size={40} />
            <div className="w-full flex justify-between items-center">
              <div>
                <span className="text-gray-400">Nama Lengkap</span>
                <p>{`${
                  !user?.first_name && !user?.last_name
                    ? "-"
                    : `${user?.first_name} ${user?.last_name ?? ""}`
                }`}</p>
              </div>
              <SquarePen
                size={22}
                className="cursor-pointer"
                onClick={() => {
                  setIsShowOverlay(true);
                  setEditingField("fullName");
                }}
              />
            </div>
          </div>
          <hr className="w-full text-gray-300" />
          <div className="mail-box flex gap-3 items-center p-4 rounded-md bg-white">
            <Mail size={38} />
            <div className="w-full flex justify-between items-center">
              <div>
                <span className="text-gray-400">Email</span>
                <h3 className="text-gray-500">{user?.email ?? "-"}</h3>
              </div>
            </div>
          </div>
          <hr className="w-full text-gray-300" />
          <div className="address-box flex gap-3 items-center p-4 rounded-md bg-white">
            <MapPinned size={38} />
            <div className="w-full flex justify-between items-center">
              <div>
                <span className="text-gray-400">Alamat</span>
                <h3>{user?.address ?? "-"}</h3>
              </div>
              <SquarePen
                size={22}
                className="cursor-pointer"
                onClick={() => {
                  setIsShowOverlay(true);
                  setEditingField("address");
                }}
              />
            </div>
          </div>
          <hr className="w-full text-gray-300" />
          <div className="phone-box flex gap-3 items-center p-4 rounded-md bg-white">
            <Phone size={38} />
            <div className="w-full flex justify-between items-center">
              <div>
                <span className="text-gray-400">No Handphone</span>
                <h3>{user?.phone ?? "-"}</h3>
              </div>
              <SquarePen
                size={22}
                className="cursor-pointer"
                onClick={() => {
                  setIsShowOverlay(true);
                  setEditingField("phone");
                }}
              />
            </div>
          </div>
          <hr className="w-full text-gray-300" />
          <div className="mail-box flex gap-3 items-center p-4 rounded-md bg-white">
            <Image
              src={"/images/gender.png"}
              alt="gender"
              width={40}
              height={40}
            />
            <div className="w-full flex justify-between items-center">
              <div>
                <span className="text-gray-400">Jenis Kelamin</span>
                <h3>
                  {!user?.gender
                    ? "-"
                    : user?.gender === "male"
                    ? "Laki-Laki"
                    : "Perempuan"}
                </h3>
              </div>
              <SquarePen
                size={22}
                className="cursor-pointer"
                onClick={() => {
                  setIsShowOverlay(true);
                  setIsEditGender(true);
                  handleGenderChange(user?.gender);
                }}
              />
            </div>
          </div>
          <hr className="w-full text-gray-300" />
          <div className="born-date-box flex gap-3 items-center p-4 rounded-md bg-white">
            <CalendarDays size={38} />
            <div className="w-full flex justify-between items-center">
              <div>
                <span className="text-gray-400">Tempat & Tanggal Lahir</span>
                <h3>{`${
                  !user?.birth_place || !user?.birth_date
                    ? "-"
                    : `${user?.birth_place}, ${user?.birth_date?.split("T")[0]}`
                }`}</h3>
              </div>
              <SquarePen
                size={22}
                className="cursor-pointer"
                onClick={() => {
                  setIsShowOverlay(true);
                  setEditingField("ttl");
                  setIsInputDate(true);
                }}
              />
            </div>
          </div>
          <hr className="w-full text-gray-300" />
        </div>
      </div>
      <div
        className={`${
          isShowOverlay ? "block" : "hidden"
        } overlay fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center`}
      >
        <div className="bg-[#FFFFFF] w-5/6 transition-all duration-700 ease-in-out p-4 z-60 rounded-sm ">
          {isEditGender ? (
            <div className="flex flex-col gap-3">
              <h3 className="font-bold tracking-wide text-xl">Jenis Kelamin</h3>
              <div className="email-box mt-3 flex gap-8 justify-evenly items-center">
                <button
                  onClick={() => {
                    // handleGenderChange("male");
                    setActiveGender("male");
                  }}
                >
                  <div
                    className={`bg-white shadow-md border-2 p-2 ${
                      activeGender === "male" && "border-blue-600"
                    }`}
                  >
                    <Mars className="text-center w-full " />
                    <span>Laki-Laki</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    // handleGenderChange("female");
                    setActiveGender("female");
                  }}
                >
                  <div
                    className={`border-2 p-2 bg-white shadow-md ${
                      activeGender === "female" && "border-pink-600"
                    }`}
                  >
                    <Venus className="text-center w-full" />
                    <span>Perempuan</span>
                  </div>
                </button>
              </div>
              <div className="flex gap-8 mt-4 justify-end">
                <button
                  onClick={() => {
                    setIsShowOverlay(false);
                    setEditingField(null);
                    setIsEditGender(false);
                  }}
                  className="text-[#808080] font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    handleSave(false);
                    setShouldSave(true);
                    setIsEditGender(false);
                  }}
                  className="text-[#F54336] font-medium"
                >
                  Simpan
                </button>
              </div>
            </div>
          ) : (
            renderEditField()
          )}
        </div>
      </div>
    </>
  );
};

export default InfoProfile;

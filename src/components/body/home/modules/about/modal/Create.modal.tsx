import { getHoroscope } from "@/components/tools/horoscope/Horoscope";
import { getChineseZodiac } from "@/components/tools/zodiac/Zodiac";
import useToast from "@/components/toast/useToast";
import ApiService from "@/lib/service/api/ApiService";
import { convertToBase64 } from "@/lib/service/file/FileService";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";

interface CreateProps {
  data: {
    name: string;
    gender: string;
    birthDate: string;
    horoscope: string;
    zodiac: string;
    height: number;
    weight: number;
  };
  onClose: () => void;
}

const CreateModal: React.FC<CreateProps> = ({ data, onClose }) => {
  const [createData, setCreateData] = useState({
    name: data.name,
    gender: data.gender,
    birthDate: data.birthDate,
    horoscope: data.horoscope,
    zodiac: data.zodiac,
    height: data.height,
    weight: data.weight,
  });

  const [image, setImage] = useState("");

  const { addToast } = useToast();

  const handleImagePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImage(base64);
    }
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCreateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (isNaN(date.getTime())) {
      setCreateData((prevData) => ({
        ...prevData,
        birthDate: "",
        horoscope: "--",
        zodiac: "--",
      }));
    } else {
      setCreateData((prevData) => ({
        ...prevData,
        birthDate: formatDate(date),
        horoscope: getHoroscope(date),
        zodiac: getChineseZodiac(date.getFullYear()),
      }));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCreateData((prevData) => ({
      ...prevData,
      height: isNaN(value) ? 0 : value,
    }));
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCreateData((prevData) => ({
      ...prevData,
      weight: isNaN(value) ? 0 : value,
    }));
  };

  const createProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = ApiService.getData();

    const payload = {
      name: createData.name,
      birthday: createData.birthDate,
      height: createData.height,
      weight: createData.weight,
      interest: "string",
    };

    try {
      const url = data
        ? "https://techtest.youapp.ai/api/updateProfile"
        : "https://techtest.youapp.ai/api/createProfile";

      const method = data ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        addToast(
          "success",
          "The profile has been successfully updated or created"
        );

        onClose();

        const formData = new FormData();
        formData.append("name", createData.name);
        formData.append("gender", createData.gender);
        formData.append("birthDate", createData.birthDate);
        formData.append("horoscope", createData.horoscope);
        formData.append("zodiac", createData.zodiac);
        if (image) {
          formData.append("image", image);
        }

        const fileResponse = await fetch("/api/fileService", {
          method: "POST",
          body: formData,
        });

        if (!fileResponse.ok) {
          addToast("error", "Failed to upload image");
        } else {
          addToast("success", "Image uploaded successfully");
        }
      } else {
        addToast("error", "Failed to update profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={createProfile}
        className="w-full h-fit flex flex-col items-center justify-between gap-4"
      >
        {/* Header */}
        <div className="w-full h-fit flex flex-row items-center justify-between">
          <label className="text-sm font-bold text-white">About</label>
          <button type="submit" className="text-sm font-bold text-[gold]">
            Save & Update
          </button>
        </div>

        <div className="w-full h-fit flex flex-col items-center justify-center gap-3">
          {/* Image */}
          <div className="w-full h-fit flex flex-row items-center justify-start gap-4">
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-14 h-14 object-cover object-center rounded-2xl"
              />
            ) : (
              <div className="w-14 h-14 flex items-center justify-center bg-white/25 rounded-2xl">
                <label
                  htmlFor="ImagePick"
                  className="w-full h-full flex items-center justify-center bg-transparent cursor-pointer"
                >
                  <BiPlus size={20} color="gold" />
                  <input
                    id="ImagePick"
                    type="file"
                    onChange={handleImagePick}
                    className="hidden"
                  />
                </label>
              </div>
            )}
            <label className="text-white text-sm">Add Image</label>
          </div>

          {/* Name */}
          <div className="w-full h-fit flex flex-row items-center justify-between">
            <label className="w-2/5 h-full items-center justify-start text-black/50">
              Display Name:
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={createData.name}
              onChange={handleChange}
              className="w-3/5 px-4 py-1 text-right rounded-lg focus:outline-none border border-white/[.3] bg-white/[.09] text-white"
            />
          </div>

          {/* Gender */}
          <div className="w-full h-fit flex flex-row items-center justify-between">
            <label className="w-2/5 h-full items-center justify-start text-black/50">
              Gender:
            </label>
            <select
              name="gender"
              value={createData.gender}
              onChange={handleChange}
              className="w-3/5 px-2 py-1.5 text-right rounded-lg focus:outline-none border border-white/[.3] bg-white/[.09] text-white"
            >
              <option value="" hidden>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Birth Date */}
          <div className="w-full h-fit flex flex-row items-center justify-between">
            <label className="w-2/5 h-full items-center justify-start text-black/50">
              Birthday:
            </label>
            <input
              type="date"
              name="birthDate"
              value={createData.birthDate}
              onChange={handleDateChange}
              className="w-3/5 px-4 py-1 text-right rounded-lg focus:outline-none border border-white/[.3] bg-white/[.09] text-white"
            />
          </div>

          {/* Horoscope */}
          <div className="w-full h-fit flex flex-row items-center justify-between">
            <label className="w-2/5 h-full items-center justify-start text-black/50">
              Horoscope:
            </label>
            <label className="w-3/5 px-4 py-1 text-right rounded-lg bg-white focus:outline-none border border-white/[.3] bg-white/[.09] text-white">
              {createData.horoscope !== null ? createData.horoscope : "--"}
            </label>
          </div>

          {/* Zodiac */}
          <div className="w-full h-fit flex flex-row items-center justify-between">
            <label className="w-2/5 h-full items-center justify-start text-black/50">
              Zodiac:
            </label>
            <label className="w-3/5 px-4 py-1 text-right rounded-lg bg-white focus:outline-none border border-white/[.3] bg-white/[.09] text-white">
              {createData.zodiac !== null ? createData.zodiac : "--"}
            </label>
          </div>

          {/* Height */}
          <div className="w-full h-fit flex flex-row items-center justify-between">
            <label className="w-2/5 h-full items-center justify-start text-black/50">
              Height:
            </label>
            <div className="w-3/5 bg-white flex flex-row items-center justify-end px-4 py-1 text-right rounded-lg gap-2 border border-white/[.3] bg-white/[.09] text-white">
              <input
                type="number"
                name="height"
                value={createData.height}
                onChange={handleHeightChange}
                className="w-full text-right focus:outline-none bg-transparent"
              />
              <span>cm</span>
            </div>
          </div>

          {/* Weight */}
          <div className="w-full h-fit flex flex-row items-center justify-between">
            <label className="w-2/5 h-full items-center justify-start text-black/50">
              Weight:
            </label>
            <div className="w-3/5 bg-white flex flex-row items-center justify-end px-4 py-1 text-right rounded-lg gap-2 border border-white/[.3] bg-white/[.09] text-white">
              <input
                type="number"
                name="weight"
                value={createData.weight}
                onChange={handleWeightChange}
                className="w-full text-right focus:outline-none bg-transparent"
              />
              <span>kg</span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateModal;

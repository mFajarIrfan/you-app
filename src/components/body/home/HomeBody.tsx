"use client";

import AboutComponent from "./modules/about/About.module";
import InterestComponent from "./modules/interest/Interest.module";
import ProfileComponent from "./modules/profile/Profile.module";
import ApiService from "@/lib/service/api/ApiService";
import React, { useState } from "react";
import { BsChevronLeft, BsX } from "react-icons/bs";
import Loading from "@/components/loading/SpinLoading";
import { useAuth } from "@/components/routes/provider/AuthProvider";

interface UserDAO {
  username: string;
  name: string;
  height: number;
  weight: number;
  interests: string[];
}

interface LocalDataDAO {
  image: string;
  birthDate: string;
  gender: string;
  horoscope: string;
  zodiac: string;
}

const fetchUserData = async () => {
  const token = ApiService.getData();
  const response = await fetch("https://techtest.youapp.ai/api/getProfile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  });

  const data = await response.json();
  return data.data;
};

const fetchLocalData = async () => {
  const response = await fetch("/api/fileService", {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserDAO | null>(null);
  const [localData, setLocalData] = useState<LocalDataDAO | null>(null);
  const [loading, setLoading] = useState(true);

  const { logout } = useAuth();

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await fetchUserData();
        const localData = await fetchLocalData();
        setUserData(userData);
        setLocalData(localData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!userData || !localData) {
    return null;
  }

  return (
    <>
      <div className="w-96 h-fit flex flex-col items-start justify-center gap-6">
        <div className="relative w-full h-fit flex items-center justify-center text-white">
          <span
            onClick={logout}
            className="absolute left-0 w-fit h-full flex flex-row items-center justify-center gap-1.5 cursor-pointer"
          >
            <BsChevronLeft size={14} strokeWidth={2} />
            <span className="text-sm font-bold">Logout</span>
          </span>
          <label className="text-sm font-semibold">{userData.username}</label>
        </div>
        <div className="w-full h-fit flex flex-col items-start justify-center gap-2">
          <ProfileComponent
            username={userData.username}
            image={localData.image}
            birthDate={localData.birthDate}
            gender={localData.gender}
            horoscope={localData.horoscope}
            zodiac={localData.zodiac}
          />
          <AboutComponent
            data={{
              name: userData.name,
              birthDate: localData.birthDate,
              horoscope: localData.horoscope,
              zodiac: localData.zodiac,
              height: userData.height,
              weight: userData.weight,
              gender: localData.gender,
            }}
          />
          <InterestComponent interest={userData.interests} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;

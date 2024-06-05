import { ageCalculate } from "@/components/tools/age/AgeCalculator";
import { getHoroscopeIcon } from "@/components/tools/horoscope/Horoscope";
import { getChineseZodiacIcon } from "@/components/tools/zodiac/Zodiac";
import React from "react";

interface ProfileProps {
  username: string;
  image: string;
  birthDate: string;
  gender: string;
  horoscope: string;
  zodiac: string;
}

const ProfileComponent: React.FC<ProfileProps> = ({
  username,
  image,
  birthDate,
  gender,
  horoscope,
  zodiac,
}) => {
  return (
    <>
      <div
        className="relative w-full h-48 bg-white/[.2] shadow-inner bg-clip-border bg-origin-border bg-center shadow-black rounded-2xl"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute bottom-2 left-4 w-fit h-fit flex flex-col gap-2 items-start justify-start text-white">
          <label className="text-base font-bold">
            @{username}, {ageCalculate(birthDate)}
          </label>
          <label className="text-sm font-medium">{gender}</label>
          <div className="w-fit h-fit flex flex-row items-center justify-center gap-2">
            <div className="w-fit h-fit flex flex-row items-center justify-center gap-2 bg-black/60 px-3 py-1 rounded-full">
              <span>{getHoroscopeIcon(horoscope)}</span>
              <span>{horoscope}</span>
            </div>
            <div className="w-fit h-fit flex flex-row items-center justify-center gap-2 bg-black/60 px-3 py-1 rounded-full">
              <span>{getChineseZodiacIcon(zodiac)}</span>
              <span>{zodiac}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;

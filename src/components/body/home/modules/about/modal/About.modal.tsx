import { ageCalculate } from "@/components/tools/age/AgeCalculator";
import React from "react";

interface AboutBodyProp {
  data: {
    birthDate: string;
    horoscope: string;
    zodiac: string;
    height: number;
    weight: number;
  };
}

const AboutModal: React.FC<AboutBodyProp> = ({ data }) => {
  return (
    <>
      <div className="w-full h-full flex flex-col items-start justify-start gap-2 text-sm font-medium">
        <div className="w-fit h-fit flex flex-row items-center justify-center gap-1">
          <span className="text-white/50">Birthday:</span>
          <span className="text-white">
            {data.birthDate} {`(age ${ageCalculate(data.birthDate)})`}
          </span>
        </div>

        <div className="w-fit h-fit flex flex-row items-center justify-center gap-1">
          <span className="text-white/50">Horoscope:</span>
          <span className="text-white">{data.horoscope}</span>
        </div>

        <div className="w-fit h-fit flex flex-row items-center justify-center gap-1">
          <span className="text-white/50">Zodiac:</span>
          <span className="text-white">{data.zodiac}</span>
        </div>

        <div className="w-fit h-fit flex flex-row items-center justify-center gap-1">
          <span className="text-white/50">Height:</span>
          <span className="text-white">{data.height} cm</span>
        </div>

        <div className="w-fit h-fit flex flex-row items-center justify-center gap-1">
          <span className="text-white/50">Weight:</span>
          <span className="text-white">{data.weight} kg</span>
        </div>
      </div>
    </>
  );
};

export default AboutModal;

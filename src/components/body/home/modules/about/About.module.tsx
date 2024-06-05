"use client";

import React, { useState } from "react";
import AboutModal from "./modal/About.modal";
import { BiEditAlt } from "react-icons/bi";
import CreateModal from "./modal/Create.modal";

interface AboutProps {
  data: {
    name: string;
    birthDate: string;
    horoscope: string;
    zodiac: string;
    height: number;
    weight: number;
    gender: string;
  };
}

const AboutComponent: React.FC<AboutProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full h-fit flex items-center justify-center bg-white/[.06] p-4 rounded-2xl">
        {!isModalOpen ? (
          <div className="w-full h-fit flex flex-col items-center justify-center gap-4">
            <div className="w-full h-fit flex flex-row items-center justify-between text-white">
              <span className="text-sm font-bold">About</span>
              <span onClick={handleClickModal}>
                <BiEditAlt size={20} />
              </span>
            </div>
            <div className="w-full h-fit">
              {data !== null ? (
                <AboutModal data={data} />
              ) : (
                <div className="w-full h-fit my-4 text-slate-400">
                  Add in your your to help others know you better
                </div>
              )}
            </div>
          </div>
        ) : (
          <CreateModal data={data} onClose={handleCloseModal} />
        )}
      </div>
    </>
  );
};

export default AboutComponent;

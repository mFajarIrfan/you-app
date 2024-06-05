import Link from "next/link";
import React from "react";
import { BiEditAlt } from "react-icons/bi";

interface InterestProp {
  interest: string[];
}

const InterestComponent: React.FC<InterestProp> = ({ interest }) => {
  return (
    <>
      <div className="w-full h-fit flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[.06] gap-4">
        <div className="w-full h-fit flex flex-row items-center justify-between">
          <span className="text-sm font-bold text-white">Interest</span>
          <Link href="/interest">
            <BiEditAlt size={20} color="white" />
          </Link>
        </div>

        <div className="w-full h-fit">
          {interest && interest.length > 0 ? (
            <div className="w-full h-fit flex flex-wrap gap-2">
              {interest.map((tag, index) => (
                <span
                  key={index}
                  className="w-fit h-fit px-3 py-1 bg-white/[.2] rounded-full text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <div className="w-full h-fit flex items-center justify-start my-4">
              Add in your interest to find a better match
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InterestComponent;

"use client";

import useToast from "@/components/toast/useToast";
import ApiService from "@/lib/service/api/ApiService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsX } from "react-icons/bs";

const InterestBody: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputTags, setInputTags] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    if (inputTags.trim() !== "" && !tags.includes(inputTags.trim())) {
      setTags([...tags, inputTags.trim()]);
      setInputTags("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const router = useRouter();

  const { addToast } = useToast();

  useEffect(() => {
    getInterestTags();
  }, []);

  const getInterestTags = async () => {
    const token = ApiService.getData();

    try {
      const response = await fetch(
        "https://techtest.youapp.ai/api/getProfile",
        {
          method: "GET",
          headers: {
            "x-access-token": token,
          },
        }
      );
      const responseData = await response.json();
      setTags(responseData.data.interests);
    } catch (error) {
      console.log(error);
    }
  };

  const createInterestTag = async (e: FormEvent) => {
    e.preventDefault();
    const token = ApiService.getData();

    const payload = { interests: tags };

    try {
      const response = await fetch(
        "https://techtest.youapp.ai/api/updateProfile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();
      console.log(responseData.message);

      if (response.ok) {
        router.push("/");
        addToast("success", `${responseData.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={createInterestTag}
        className="relative w-96 h-[600px] flex flex-col items-center justify-center"
      >
        {/* Header */}
        <div className="absolute top-0 w-full h-fit flex flex-row items-center justify-between">
          <Link
            href="/"
            className="w-fit h-fit flex flex-row items-center justify-center gap-1 text-white"
          >
            <BsChevronLeft size={16} strokeWidth={1} /> Back
          </Link>
          <button
            type="submit"
            className="bg-clip-text text-transparent bg-gradient-to-tl from-blue-500 from-30% via-blue-100 via-70% to-white text-sm font-semibold"
          >
            Save
          </button>
        </div>

        {/* Body */}
        <div className="w-full h-full flex flex-col items-center justify-center gap-8">
          <div className="w-full h-fit flex flex-col items-start justify-start gap-2">
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">
              Tell everyone about yourself
            </span>
            <label className="text-xl font-bold text-white">
              What interest you?
            </label>
          </div>

          <div
            onClick={focusInput}
            className="w-full h-fit flex flex-col items-center justify-center gap-4 bg-white/[.08] p-2 rounded-[10px] text-white text-xs font-semibold"
          >
            <div className="w-full h-fit flex flex-wrap items-center justify-start gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="w-fit h-fit flex flex-row items-center justify-center px-2 py-1 gap-2 bg-white/[.1] rounded-lg"
                >
                  <span>{tag}</span>
                  <span onClick={() => removeTag(index)}>
                    <BsX size={20} />
                  </span>
                </div>
              ))}
              <input
                ref={inputRef}
                type="text"
                value={inputTags}
                onChange={(e) => setInputTags(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-fit h-fit bg-transparent my-1 focus:outline-none cursor-default"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default InterestBody;

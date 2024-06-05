"use client";

import useToast from "@/components/toast/useToast";
import Link from "next/link";
import { useState } from "react";
import { PiEye, PiEyeSlash } from "react-icons/pi";

const RegisterBody = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      addToast("failed", "Passwords do not match");
      return;
    }

    const payload = { email, username, password };

    try {
      const response = await fetch("https://techtest.youapp.ai/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      if (response.status === 201) {
        addToast("success", "Account created successfully");
      } else {
        const responseData = await response.json();
        console.error("Error response data:", responseData);
        addToast("failed", responseData.message || "Failed to create account");
      }
    } catch (error) {
      console.error("Network error:", error);
      addToast("failed", "Network error. Please try again.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-96 h-fit flex flex-col items-center justify-center gap-6 my-20"
      >
        <label className="w-full h-fit text-2xl font-bold text-white text-left">
          Register
        </label>

        <div className="w-full h-fit flex flex-col gap-4">
          <input
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-lg bg-white/[.07] text-white focus:outline-none"
          />
          <input
            required
            type="text"
            placeholder="Create Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-4 rounded-lg bg-white/[.07] text-white focus:outline-none"
          />
          <div className="relative w-full h-fit flex items-center justify-center">
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full p-4 rounded-lg bg-white/[.07] text-white focus:outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 cursor-pointer"
            >
              {showPassword ? (
                <PiEye size={20} color="gold" />
              ) : (
                <PiEyeSlash size={20} color="gold" />
              )}
            </span>
          </div>
          <div className="relative w-full h-fit flex items-center justify-center">
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-full p-4 rounded-lg bg-white/[.07] text-white focus:outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 cursor-pointer"
            >
              {showPassword ? (
                <PiEye size={20} className="text-yellow-400" />
              ) : (
                <PiEyeSlash size={20} className="text-yellow-400" />
              )}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-fit text-white bg-gradient-to-tr from-teal-400 to-blue-500 text-lg font-bold p-3 rounded-lg shadow-lg shadow-teal-400/50"
        >
          Register
        </button>

        <div className="flex flex-row gap-4 text-white">
          Have an account?
          <Link
            href="/login"
            className="border-b border-yellow-400 text-yellow-400"
          >
            Login Here
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterBody;

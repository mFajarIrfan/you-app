"use client";

import { useAuth } from "@/components/routes/provider/AuthProvider";
import useToast from "@/components/toast/useToast";
import Link from "next/link";
import React, { useState } from "react";
import { PiEye, PiEyeSlash } from "react-icons/pi";

const LoginBody = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { addToast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await login(email, username, password);

      addToast("success", "User has been logged in");
    } catch (error) {
      addToast("failed", (error as Error).message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="w-full md:w-96 h-3/4 flex flex-col items-center justify-center gap-6 my-20"
      >
        <label className="w-full text-2xl font-bold text-left text-white">
          Login
        </label>

        <div className="w-full h-fit flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-lg bg-white/[.07] text-white focus:outline-none"
          />
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-4 rounded-lg bg-white/[.07] text-white focus:outline-none"
          />
          <div className="relative w-full h-fit flex items-center justify-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full p-4 rounded-lg bg-white/[.07] text-white focus:outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4"
            >
              {showPassword ? (
                <PiEye size={20} color="gold" />
              ) : (
                <PiEyeSlash size={20} color="gold" />
              )}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-fit bg-gradient-to-tr from-teal-400 to-blue-500 text-lg font-bold p-3 rounded-lg shadow-lg shadow-teal-400/50 text-white"
        >
          Login
        </button>

        <div className="flex flex-row gap-4 text-white">
          No Account?
          <Link href="/register" className="border-b border-[gold] text-[gold]">
            Register Here
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginBody;

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

//add show password feature here

const Login: React.FC<LoginProps>= ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const handleFormSubmit = async (data: LoginFormData) => {
    setLoading(true);
    await onSubmit(data);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
       onSubmit={handleSubmit(handleFormSubmit)}
       className="bg-white shadow-xl md:w-1/2 lg:w-1/3 2xl:w-1/4 p-8 rounded-3xl">
        <p className="text-2xl font-extrabold mt-2 mb-6 text-black text-center">
          Welcome back!
        </p>

        <input
          type="text"
          {...register("phone", {
            required: true,
            pattern: /^(?:\+254|254|0)?([17][0-9]{8})$/,
          })}
          placeholder="Phone number"
          className="bg-[#e8ebf6] rounded-full h-12 w-full mb-3 text-sm px-5 py-2 focus:border-[#a1b2d8] text-black"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs ml-2 mb-1">
            Phone number is required
          </p>
        )}

        <input
          type="password"
          id="email"
          {...register("password", { required: true })}
          placeholder="Password"
          value={password}
          className="bg-[#e8ebf6] rounded-full h-12 w-full mb-3 text-sm px-5 py-2 focus:border-[#a1b2d8] text-black"
        />
        <button
          type="submit"
          className="bg-[#395290] hover:bg-[#6e89c2] rounded-full h-12 w-full mb-3 text-sm px-5 py-2 font-bold "
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};
export default Login;

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

const Signup: React.FC<SignupProps> = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleFormSubmit = async (data: FormData) => {
    setLoading(true);
    await onSubmit(data);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white shadow-xl md:w-1/2 lg:w-1/3 2xl:w-1/4 p-8 rounded-3xl"
      >
        <p className="text-2xl font-extrabold mt-2 mb-6 text-black text-center">
          Sign Up to WorkSphere
        </p>
        <div className="flex gap-4 w-full mb-3 h-full">
          <div className="flex flex-col h-full">
            <div className="h-12">
              <input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="First name"
                className="basis-1/2 bg-[#e8ebf6] rounded-full h-full w-full text-sm px-5 py-2 focus:border-[#a1b2d8] text-black"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs ml-2 mb-1">
                First name is required
              </p>
            )}
          </div>

          <div className="flex flex-col h-full">
            <div className="h-12">
              <input
                type="text"
                {...register("lastName", { required: true })}
                placeholder="Last name"
                className="basis-1/2 bg-[#e8ebf6] rounded-full h-full w-full text-sm px-5 py-2 focus:border-[#a1b2d8] text-black"
              />
            </div>

            {errors.lastName && (
              <p className="text-red-500 text-xs ml-2  mb-1">
                Last name is required.
              </p>
            )}
          </div>
        </div>
        <input
          type="email"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          })}
          placeholder="Email"
          className="bg-[#cdd5ea] rounded-full h-12 w-full mb-3 text-sm px-5 py-2 focus:border-[#a1b2d8] text-black"
        />
        {errors.email && (
          <p className="text-red-500 text-xs ml-2 -mt-3 mb-2">
            Please enter a valid email address.
          </p>
        )}

        <input
          type="text"
          {...register("phone", {
            required: true,
            pattern: /^(?:\+254|254|0)?([17][0-9]{8})$/,
          })}
          placeholder="Phone number eg. 0712345678"
          className="bg-[#e8ebf6] rounded-full h-12 w-full mb-3 text-sm px-5 py-2 focus:border-[#a1b2d8] text-black"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs ml-2 -mt-3 mb-1">
            Please enter a valid phone number.
          </p>
        )}

        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: 8,
            pattern:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          })}
          placeholder="Password"
          className="bg-[#cdd5ea] rounded-full h-12 w-full mb-3 text-sm px-5 py-2 focus:border-[#a1b2d8] text-black"
        />
        {errors.password && (
          <p className="text-red-500 text-xs ml-2 -mt-3 mb-1">
            Password must be at least 8 characters long and include a number and
            a special character.
          </p>
        )}

        <select
          className="bg-[#e8ebf6] rounded-full h-12 w-full mb-3 text-sm px-5 py-2 focus:border-[#a1b2d8] text-black p-2"
          {...register("role", { required: true })}
        >
          <option value="">Select Role</option>
          <option value="Intern">Intern/ Attachee</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-xs ml-2 -mt-3 mb-1">
            Please select a role.
          </p>
        )}

        <button
          type="submit"
          className="bg-[#395290] hover:bg-[#6e89c2] rounded-full h-12 w-full mb-3 text-sm px-5 py-2 font-bold flex justify-center items-center"
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
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;

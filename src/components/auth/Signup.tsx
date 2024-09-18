"use client";

import { useForm, SubmitHandler } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl md:w-1/2 lg:w-1/3 2xl:w-1/4 p-8 rounded-3xl"
      >
        <p className="text-2xl font-extrabold mt-2 mb-6 text-black text-center">
          Sign Up to WorkSphere
        </p>
        <div className="flex gap-4 w-full mb-3">
          <input
            type="text"
            {...register("firstName", { required: true })}
            placeholder="First name"
            className="basis-1/2 bg-[#e8ebf6] rounded-full h-12 w-full text-sm px-5 py-2 focus:border-[#a1b2d8] text-black"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs ml-2 -mt-3 mb-1">First name is required</p>
          )}

          <input
            type="text"
            {...register("lastName", { required: true })}
            placeholder="Last name"
            className="basis-1/2 bg-[#e8ebf6] rounded-full h-12 w-full text-sm px-5 py-2 focus:border-[#a1b2d8] text-black"
          />

          {errors.lastName && (
            <p className="text-red-500 text-xs ml-2 -mt-3 mb-1">Last name is required.</p>
          )}
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
          <p className="text-red-500 text-xs ml-2 -mt-3 mb-1">
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
          <p className="text-red-500 text-xs ml-2 -mt-3 mb-1">Please select a role.</p>
        )}

        <button
          type="submit"
          className="bg-[#395290] rounded-full h-12 w-full mb-3 text-sm px-5 py-2 font-bold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

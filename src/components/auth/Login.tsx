"use client";

import { useState, useEffect } from "react";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form className="bg-white shadow-xl md:w-1/2 lg:w-1/3 2xl:w-1/4 p-8 rounded-3xl">
        <p className="text-2xl font-extrabold mt-2 mb-6 text-black text-center">
          Welcome back!
        </p>
      
        <input
          type="text"
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          value={phone}
          className="bg-[#e8ebf6] rounded-full h-12 w-full mb-3 text-sm px-5 py-2 focus:border-[#a1b2d8] text-black"
        />
        <input
          type="password"
          id="email"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
          className="bg-[#e8ebf6] rounded-full h-12 w-full mb-3 text-sm px-5 py-2 focus:border-[#a1b2d8] text-black"
        />
        <button
          type="submit"
          className="bg-[#395290] rounded-full h-12 w-full mb-3 text-sm px-5 py-2 font-bold "
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Signup;

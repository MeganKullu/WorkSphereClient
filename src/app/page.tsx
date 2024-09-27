import Link from "next/link";

const page = () => {
  return (
    <div className="w-full h-full bg-[#0c0f19] flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <p className="text-white text-4xl font-bold text-center my-8 justify-center">
          Welcome to WorkSphere
        </p>
        <div className="flex gap-6 justify-center">
          <div  className="px-5 py-3 text-white bg-[#a1b2d8] rounded-xl font-bold">
            <Link
              href="/signup"
             
            >
              Signup
            </Link>
          </div>
          <Link
            href="/login"
            className="px-5 py-3  text-white bg-[#a1b2d8] rounded-xl font-bold"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default page;

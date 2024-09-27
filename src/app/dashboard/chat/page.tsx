import Image from "next/image";
import ChatImage from "@/public/communication.jpg";

export default function page({ params }: { params: string }) {
  return (
    <div className="w-full h-full flex gap-2 xl:gap-4 ">
      {/* this is gonna be a component too */}
      <div className="w-full rounded-r-[30px] h-full bg-[#e8ebf6] flex justify-center items-center">
        <div>
          <Image
            src={ChatImage}
            width={500}
            height={500}
            alt="Worksphere"
          />
          <p className="mt-10 text-black font-bold text-center">Welcome to Worksphere, click on chats to begin messaging.</p>
        </div>
      </div>
    </div>
  );
}

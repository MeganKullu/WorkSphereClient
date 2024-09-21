export default function page() {
  return (
    <div className="w-full h-full flex gap-2 xl:gap-4 ">
      {/* this is gonna be a component too */}
      <div className="w-2/3 rounded-r-[30px] h-full bg-[#e8ebf6]"></div>

      <div className="w-1/3 flex flex-col gap-2 xl:gap-4">
        <div className="w-full h-1/2 bg-white rounded-[30px]"></div>
        <div className="w-full h-1/2 bg-[#cdd5ea] rounded-[30px]"></div>
      </div>
    </div>
  );
}

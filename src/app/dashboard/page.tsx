const page = () => {
  return (
    <div className="flex w-full h-full gap-2">
      {/* this is gonna be a component too */}
      <div className="w-3/4 bg-[#e8ebf6] rounded-[30px] h-full"></div>
      <div className="w-1/4 flex flex-col gap-2">
        {/* this gonna be a component */}
        <div className="w-full h-1/2 bg-white rounded-[30px]"></div>
        {/* this gonna be a component */}
        <div className="w-full h-1/2 bg-[#cdd5ea] rounded-[30px]"></div>
      </div>
    </div>
  );
};
export default page;

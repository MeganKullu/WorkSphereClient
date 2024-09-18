// here is where the naviagation will go
const dashboardLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-full bg-[#0c0f19] p-2">
      <div className="h-full w-24">
        {/* navigation links will go here with the background*/}
        <p className="text-white">We will have the logo go here too</p>
        <p className="text-white"> Hello how are you doing</p>
      </div>
      <div className="h-full w-full">
        {children}
      </div>
    </div>
  );
};
export default dashboardLayout;

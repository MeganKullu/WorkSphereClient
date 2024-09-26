import Login from "@/components/auth/Login";

const page = () => {
  const onsubmit = async (data: FormData) => {
    // we send the data to the back end
    //we will also set the auth token and validate it on the dashboard page
    "use server";
    const { phone, password } = data;
    const response = await fetch("http://localhost:3002/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });
    
  
    const loginData = await response.json();
    return { id: loginData.userId , role: loginData.userRole, name: loginData.user }; ;
    
  };

  return <Login onSubmit={onsubmit} />;
};
export default page;

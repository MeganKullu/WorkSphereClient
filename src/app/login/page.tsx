import Login from "@/components/auth/Login";

const page = () => {

  const onsubmit = async (data: FormData) => {
    // we send the data to the back end
    "use server";
    const { phone, password } = data;
    const response =   await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });
  }

  return (
    <Login onSubmit={onsubmit}/>
  )
}
export default page;
import Signup from "@/components/auth/Signup";

const onSubmit = async (data: FormData) => {
  // we send the data to the back end
  "use server";
  const { firstName, lastName, email, password, role, phone, adminCode } = data;
  const response = await fetch(`http://localhost:3002/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ firstName, lastName, email, password, role, phone, adminCode}),
  });

  const signupData = await response.json();
  
  return { id: signupData.newUser.id, role: signupData.newUser.role };
};

const page = () => {
  return <Signup onSubmit={onSubmit} />;
};
export default page;

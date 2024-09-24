import Signup from "@/components/auth/Signup";

const onSubmit = async (data: FormData) => {
  // we send the data to the back end
  "use server";
  const { firstName, lastName, email, password, role, phone } = data;
  const response = await fetch(`http://localhost:3002/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ firstName, lastName, email, password, role, phone }),
  });

  const signupData = await response.json();
  console.log("id", signupData.newUser.id);
  return signupData.newUser.id;
};

const page = () => {
  return <Signup onSubmit={onSubmit} />;
};
export default page;

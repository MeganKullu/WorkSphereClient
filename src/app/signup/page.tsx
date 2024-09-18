import Signup from "@/components/auth/Signup"

const onSubmit = async (data: FormData) => {
  // we send the data to the back end
  "use server";
  const { firstName, lastName, email, password, role, phone } = data;
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password, role, phone }),
  });

}

const page = () => {
  return (
    <Signup onSubmit={onSubmit}/>
  )
}
export default page
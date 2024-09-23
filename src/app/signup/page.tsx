import Signup from "@/components/auth/Signup"
import { redirect } from 'next/navigation';


const onSubmit = async (data: FormData) => {
  // we send the data to the back end
  "use server";
  const { firstName, lastName, email, password, role, phone } = data;
  const response = await fetch(`${process.env.NGROK_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password, role, phone }),
  });

  const signupData = await response.json();


  if ( response.status === 201 ) {
    // we push the user to the dashboard
    // add toast for successful signup
    setTimeout(() => {
      redirect('/dashboard/chat');
    }, 0)
    
  }
  console.log("id", signupData.newUser.id);
  return signupData.newUser.id;
  
}

const page = () => {
  return (
    <Signup onSubmit={onSubmit}/>
  )
}
export default page
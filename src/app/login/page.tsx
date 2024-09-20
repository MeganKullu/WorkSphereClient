import Login from "@/components/auth/Login";
import { redirect } from 'next/navigation';

const page = () => {

  const onsubmit = async (data: FormData) => {
    // we send the data to the back end
    //we will also set the auth token and validate it on the dashboard page
    "use server";
    const { phone, password } = data;
    const response =   await fetch(`${process.env.NGROK_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });

    if(response.status === 200){
      // we push the user to the dashboard
      // add toast for successful login
      redirect('/dashboard') 
    } else if (response.status === 401) {
      // add toast for unsuccessful login
      console.log('unsuccessful login')
    }
  }

  return (
    <Login onSubmit={onsubmit}/>
  )
}
export default page;
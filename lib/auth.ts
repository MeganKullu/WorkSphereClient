// lib/auth.js
export async function verifyCredentials({ phone, password }: { phone: string, password: string }) {
    const response = await fetch("http://localhost:3002/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });
  
    const loginData = await response.json();
  
    if (response.ok && loginData.userId) {
      return { id: loginData.userId };
    } else {
      return null;
    }
  }
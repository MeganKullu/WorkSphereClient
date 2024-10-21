import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import { DefaultSession } from "next-auth";


declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}

interface CustomUser extends User {
  role : string;
  id: string;
  name: string;
  email: string;
  image: string;

}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  debug: true, 
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" }, // 'signin' or 'signup'
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password || !credentials?.action) {
          return null;
        }

        const { phone, password, action } = credentials;

        let endpoint = action === 'signup' 
          ? "http://localhost:3002/api/auth/signup"
          : "http://localhost:3002/api/auth/login";

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            password,
            ...(action === 'signup' && credentials as any ? {
              firstName: (credentials as any).firstName,
              lastName: (credentials as any).lastName,
              email: (credentials as any).email,
              role: (credentials as any).role,
              adminCode: (credentials as any).adminCode,
            } : {

            }),
          }),
        });

        if (response.status === 200) {
          const userData = await response.json();
          console.log("userData", userData);
          return { 
            id: userData.userId || userData.newUser.id, 
            name: userData.userName || `${userData.newUser.firstName} ${userData.newUser.lastName}`, 
            role: userData.userRole || userData.newUser.role 
          };
        }

        return null;
        // we will need to add proper error handling later for toast notifications
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as CustomUser).id;
        token.role = (user as CustomUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
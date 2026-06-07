import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { env, getAdminAuthConfigIssue } from "./env";

async function verifyPassword(password: string) {
  if (env.ADMIN_PASSWORD_HASH) {
    return bcrypt.compare(password, env.ADMIN_PASSWORD_HASH);
  }

  if (process.env.NODE_ENV !== "production" && env.ADMIN_PASSWORD) {
    return password === env.ADMIN_PASSWORD;
  }

  return false;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login"
  },
  providers: [
    CredentialsProvider({
      name: "Admin credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (getAdminAuthConfigIssue()) {
          return null;
        }

        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password ?? "";

        if (!email || !password || !env.ADMIN_EMAIL) {
          return null;
        }

        const isEmailAllowed = email === env.ADMIN_EMAIL.toLowerCase();
        const isPasswordValid = await verifyPassword(password);

        if (!isEmailAllowed || !isPasswordValid) {
          return null;
        }

        return {
          id: "admin",
          email,
          name: "Administrator"
        };
      }
    })
  ],
  callbacks: {
    session({ session }) {
      if (session.user) {
        session.user.name = "Administrator";
      }

      return session;
    }
  },
  secret: env.NEXTAUTH_SECRET
};

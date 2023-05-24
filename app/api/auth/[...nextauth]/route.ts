import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      async authorize(credentials, _) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        console.log({ user });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session.user?.email) return session;

      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        select: {
          id: true,
          firstName: true,
          secondName: true,
          email: true,
          role: true,
          patronymic: true,
          organizationName: true,
          organizationInn: true,
          position: true,
        },
      });
      console.log({ session, user });
      return { ...session, user: { ...user } };
    },
  },
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

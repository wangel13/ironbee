import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      id: number;
      firstName: string;
      secondName: string;
      email: string;
      role: string;
      patronymic: string;
      organizationName: string;
      organizationInn: string;
      position: string;
    } & DefaultSession["user"];
  }
}

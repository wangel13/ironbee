import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavigationLinks from "./NavigationLinks";

export default async function Navigation() {
  const session = await getServerSession(authOptions);
  return <NavigationLinks session={session} />;
}

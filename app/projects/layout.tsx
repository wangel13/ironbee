import MainLayout from "@/Layouts/MainLayout";

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}

import prisma from "@/lib/prisma";
import { EditNormativesForm } from "@/components/EditNormatives";

export default async function EditorPanelPage() {
  const industries = await prisma.industry.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  return (
    <div className="p-4 my-4">
      <h1 className="text-xl font-bold mb-8">Редактор нормативных значений</h1>
      <div className="bg-white shadow rounded p-4 my-4 mb-10">
        <EditNormativesForm industries={industries} />
      </div>
    </div>
  );
}

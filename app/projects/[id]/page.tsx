import prisma from "@/lib/prisma";
import Calculator from "@/components/Calculator/Calculator";
import toInteger from "lodash/toInteger";
import BrochurePDFGenerator from "@/components/Brochure/BrochurePDFGenerator";

export default async function ProjectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await prisma.project.findUnique({
    where: {
      id: toInteger(id),
    },
    include: {
      projectsOnEquipment: true,
      patent: true,
    },
  });
  const equipments = await prisma.equipment.findMany();
  const industries = await prisma.industry.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  const areas = await prisma.area.findMany();
  const patents = await prisma.patent.findMany();
  const legalForms = await prisma.legalForm.findMany();

  if (!project) {
    throw new Error("no project error");
  }

  return (
    <div className="bg-white shadow rounded p-4 my-4 mb-10">
      <h1 className="h1 mb-8">Инвестиционный проект</h1>
      <Calculator
        project={project}
        equipments={equipments}
        industries={industries}
        areas={areas}
        patents={patents}
        legalForms={legalForms}
      />
    </div>
  );
}

import prisma from "@/lib/prisma";
import Calculator from "@/components/Calculator/Calculator";

export default async function CalculatorPage() {
  const equipments = await prisma.equipment.findMany();
  const industries = await prisma.industry.findMany();
  const areas = await prisma.area.findMany();
  const patents = await prisma.patent.findMany();
  const legalForms = await prisma.legalForm.findMany();

  return (
    <div className="bg-white shadow rounded p-4 my-4">
      <h1 className="h1 mb-8">Калькулятор инвест-проекта</h1>
      <Calculator
        equipments={equipments}
        industries={industries}
        areas={areas}
        patents={patents}
        legalForms={legalForms}
      />
    </div>
  );
}

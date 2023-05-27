import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const {
    avgWorkers,
    avgSalary,
    avgTaxes,
    avgIncomeTaxes,
    avgPropertyTaxes,
    avgLandTaxes,
    avgNDFL,
    avgTransportTaxes,
    avgOtherTaxes,
  } = await req.json();

  try {
    const updatedIndustry = await prisma.industry.update({
      where: {
        id,
      },
      data: {
        avgWorkers,
        avgSalary,
        avgTaxes,
        avgIncomeTaxes,
        avgPropertyTaxes,
        avgLandTaxes,
        avgNDFL,
        avgTransportTaxes,
        avgOtherTaxes,
      },
    });

    return NextResponse.json(updatedIndustry);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Не удалось обновить номративные значения", message: e.meta },
        { status: 400 }
      );
    }
    throw e;
  }
}

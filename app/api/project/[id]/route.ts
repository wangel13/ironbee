import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const {
    // authorId,
    minCost,
    maxCost,
    workers,
    areaBuildingSize,
    usn,
    costAreaBuildingSize,
    areaRentalSize,
    legalFormId,
    areaId,
    industryId,
  } = await req.json();
  try {
    const updatedProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        // author: { connect: { id: authorId } },
        minCost,
        maxCost,
        workers,
        areaBuildingSize,
        usn,
        costAreaBuildingSize,
        areaRentalSize,
        legalForm: { connect: { id: legalFormId } },
        area: { connect: { id: areaId } },
        industry: { connect: { id: industryId } },
      },
    });
    return NextResponse.json(updatedProject);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Не удалось обновить проект", message: e.meta },
        { status: 400 }
      );
    }
    throw e;
  }
}

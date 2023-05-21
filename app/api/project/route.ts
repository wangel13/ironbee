import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const {
    authorId,
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
    const project = await prisma.project.create({
      data: {
        author: { connect: { id: authorId } },
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
    return NextResponse.json(project);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Не удалось создать проект", message: e.meta },
        { status: 400 }
      );
    }
    throw e;
  }
}

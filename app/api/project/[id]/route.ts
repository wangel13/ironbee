import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const session = await getServerSession(authOptions);

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
    equipment,
    patents,
  } = await req.json();

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    if (session?.user?.id === project?.authorId) {
      const deleteEquipment = prisma.projectsOnEquipment.deleteMany({
        where: {
          projectId: id,
        },
      });
      const unsetPatents = prisma.project.update({
        where: {
          id,
        },
        data: {
          patent: {
            set: [],
          },
        },
      });
      const updateProject = prisma.project.update({
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
          patent: {
            connect: patents.map((id: number) => ({
              id,
            })),
          },
          projectsOnEquipment: {
            create: equipment.map(
              ({ id, count }: { id: string; count: number }) => ({
                equipment: { connect: { id } },
                assignedBy: session?.user?.id.toString(),
                count,
              })
            ),
          },
        },
      });
      const updatedProject = await prisma.$transaction([
        deleteEquipment,
        unsetPatents,
        updateProject,
      ]);
      return NextResponse.json(updatedProject);
    } else {
      throw new Error("Не удалось обновить проект");
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Не удалось обновить проект", message: e.meta },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "", message: "Не удалось обновить проект, возможно он не ваш" },
      { status: 403 }
    );
  }
}
